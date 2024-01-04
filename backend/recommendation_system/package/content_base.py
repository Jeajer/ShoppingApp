import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
from pandas import isnull, notnull
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


class CB:
    """
    Khởi tại dataframe "Products" với hàm "get_dataframe_firebase"
    """

    def __init__(self):
        self.movies = get_dataframe_firebase()
        #self.movies = self.movies.set_index("PId")
        print(self.movies)
        self.movies["Brand"] = self.movies["Brand"].fillna("").astype("str")
        self.tfidf_matrix = tfidf_matrix(self.movies)
        self.cosine_sim = cosine_sim(self.tfidf_matrix)

    def build_model(self):
        """
        Tách các giá trị của brand ở từng sản phẩm đang được ngăn cách bởi ','
        """
        if self.movies is not None:
            self.movies["Brand"] = self.movies["Brand"].str.split(",")
            # self.movies["Brand"] = self.movies["Brand"].fillna("").astype("str")
            # Các phần xử lý khác
            print(self.movies)
        else:
            # Xử lý trường hợp self.movies là None
            print("Error: Failed to get the DataFrame from Firebase.")

    def refresh(self):
        """
        Chuẩn hóa dữ liệu và tính toán lại ma trận
        """
        self.build_model()

    def fit(self):
        self.refresh()

    def recommend_top(self, ID, top_x):
        """
        Xây dựng hàm trả về danh sách top film tương đồng theo tên film truyền vào:
        + Tham số truyền vào gồm "title" là tên film và "topX" là top film tương đồng cần lấy
        + Tạo ra list "sim_score" là danh sách điểm tương đồng với film truyền vào
        + Sắp xếp điểm tương đồng từ cao đến thấp
        + Trả về top danh sách tương đồng cao nhất theo giá trị "topX" truyền vào
        """
        indices = pd.Series(self.movies.index, index=self.movies["PId"])
        idx = indices[ID]
        sim_scores = list(enumerate(self.cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1 : top_x + 1]
        # movie_indices = [i[0] for i in sim_scores]
        result_list = []

        for score in sim_scores:
            index = score[0]  # Chỉ số
            similarity = score[1]  # Điểm tương đồng
            PId = self.movies.loc[self.movies.index[index], "PId"]  # PId tương ứng
            img = self.movies.loc[self.movies.index[index], "Img"]
            title = self.movies.loc[self.movies.index[index], "Name"]
            price = self.movies.loc[self.movies.index[index], "Price"]
            des = self.movies.loc[self.movies.index[index], "Description"]
            color = self.movies.loc[self.movies.index[index], "Color"]

            result_list.append(
                {
                    "index": index,
                    "similarity": similarity,
                    "id": PId,
                    "imageUrl": img,
                    "title": title,
                    "price": str(price),
                    "description": des,
                    "color": color,
                }
            )

        return result_list


def tfidf_matrix(movies):
    """
    Dùng hàm "TfidfVectorizer" để chuẩn hóa "genres" với:
    + analyzer='word': chọn đơn vị trích xuất là word
    + ngram_range=(1, 1): mỗi lần trích xuất 1 word
    + min_df=0: tỉ lệ word không đọc được là 0
    Lúc này ma trận trả về với số dòng tương ứng với số lượng film và số cột tương ứng với số từ được tách ra từ "Brand"
    """
    tf = TfidfVectorizer(analyzer="word", ngram_range=(1, 1), min_df=1)
    new_tfidf_matrix = tf.fit_transform(movies["Brand"])
    return new_tfidf_matrix


def cosine_sim(matrix):
    """
    Dùng hàm "linear_kernel" để tạo thành ma trận hình vuông với số hàng và số cột là số lượng product
    để tính toán điểm tương đồng giữa từng product với nhau
    """
    new_cosine_sim = linear_kernel(matrix, matrix)
    return new_cosine_sim


def get_dataframe_firebase():
    

    db = firestore.client()

    collection_ref = db.collection("Products")
    docs = collection_ref.get()

    # Chuyển đổi dữ liệu từ các tài liệu Firestore thành một danh sách từ điển
    data = []
    for doc in docs:
        doc_data = doc.to_dict()
        # Kiểm tra xem tài liệu Firestore có chứa đủ thông tin cho 3 cột hay không
        if "id" in doc_data and "brand" in doc_data and "gender" in doc_data:
            row = {
                "PId": doc_data["id"],
                "Brand": doc_data["brand"],
                "Category": doc_data["category"],
                "Color": doc_data["color"],
                "Description": doc_data["description"],
                "Gender": doc_data["gender"],
                "Img": doc_data["img"],
                "Name": doc_data["name"],
                "Price": doc_data["price"],
            }
            data.append(row)

    # Tạo DataFrame từ danh sách từ điển
    df = pd.DataFrame(data)
    return df

    # In ra DataFrame
    # print(df)
