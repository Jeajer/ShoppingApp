from .content_base import *
import pandas as pd
from django.http import JsonResponse
import json
import os
from django.conf import settings
import firebase_admin
from firebase_admin import credentials

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
# settings.configure()

# Từ đây, bạn có thể truy cập vào các thiết lập của Django
# charset = settings.DEFAULT_CHARSET
# ...
"""
cb_recipes = CB()
listRecipe = cb_recipes.recommend_top("CW2288-111", 10)
print(listRecipe)
jsonList = []
for item in listRecipe:
    jsonList.append(
        {
            "ID": item["index"],
            "similar": round(item["similarity"]),
            "id": item["id"],
            "imageUrl": item["imageUrl"],
            "title": item["title"],
            "price": item["price"],
            "description": item["description"],
            "color": item["color"],
        },
    )
print(json.dumps(jsonList))
"""
cred = credentials.Certificate(
    "D:/UIT/Study/Semester6/DA1/Project/Final/ShoppingApp-1/backend/recommendation_system/package/firebase.json"
)

app = firebase_admin.initialize_app(cred)


def requestCB(name):
    cb_recipes = CB()
    listRecipe = cb_recipes.recommend_top(name, 10)
    print(listRecipe)
    jsonList = []
    for item in listRecipe:
        jsonList.append(
            {
                "ID": item["index"],
                "similar": round(item["similarity"]),
                "id": item["id"],
                "imageUrl": item["imageUrl"],
                "title": item["title"],
                "price": item["price"],
                "description": item["description"],
                "color": item["color"],
            },
        )
    print(json.dumps(jsonList))
    return jsonList
