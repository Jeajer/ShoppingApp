import content_base
import pandas as pd
from django.http import JsonResponse
import json
import os
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
settings.configure()

# Từ đây, bạn có thể truy cập vào các thiết lập của Django
charset = settings.DEFAULT_CHARSET
# ...


cb_recipes = content_base.CB()

listRecipe = cb_recipes.recommend_top("CD5432-127", 10)
print(listRecipe)
jsonList = []
for item in listRecipe:
    jsonList.append({"ID": item[0], "similar": round(item[1], 2)})
print(JsonResponse(jsonList, safe=False))
print(json.dumps(jsonList))
