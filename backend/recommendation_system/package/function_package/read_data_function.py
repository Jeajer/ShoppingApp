import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pandas as pd


def get_dataframe_firebase():
    cred = credentials.Certificate(
        "D:/UIT/Study/Semester6/DA1/Project/Final/ShoppingApp-1/backend/recommendation_system/package/firebase.json"
    )

    app = firebase_admin.initialize_app(cred)

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
                "ID": doc_data["id"],
                "Brand": doc_data["brand"],
                "Gender": doc_data["gender"],
            }
            data.append(row)

    # Tạo DataFrame từ danh sách từ điển
    df = pd.DataFrame(data)
    return df

    # In ra DataFrame
    # print(df)
