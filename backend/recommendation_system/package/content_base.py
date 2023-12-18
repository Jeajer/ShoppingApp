import pandas as pd
import numpy as np
import function_package.content_base_function
import function_package.read_data_function


class CB:
    """
    Khởi tại dataframe "Products" với hàm "get_dataframe_firebase"
    """

    def __init__(self):
        self.movies = function_package.read_data_function.get_dataframe_firebase()
        print(self.movies)
        self.movies["Brand"] = self.movies["Brand"].fillna("").astype("str")
        self.tfidf_matrix = function_package.content_base_function.tfidf_matrix(
            self.movies
        )
        self.cosine_sim = function_package.content_base_function.cosine_sim(
            self.tfidf_matrix
        )

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
        IDs = self.movies["ID"]
        indices = pd.Series(self.movies.index, index=self.movies["ID"])
        idx = indices[ID]
        sim_scores = list(enumerate(self.cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1 : top_x + 1]
        # movie_indices = [i[0] for i in sim_scores]
        return sim_scores


'''
    def print_recommendations(self, text, top_x):
        """
        In ra top film tương đồng với film truyền vào
        """
        print(self.genre_recommendations(text, top_x))
'''
