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


"""
string = "python|c++|kotlin|java|ai|unity|"
# Tách chuỗi thành danh sách các phần tử
split_list = string.split("|")

# Tạo một Series từ danh sách đã tách
series = pd.Series(split_list)

# Điền các giá trị NaN bằng giá trị mặc định (ví dụ: "unknown")
filled_series = series.fillna("").astype("str")

# In kết quả
print(filled_series)
"""
