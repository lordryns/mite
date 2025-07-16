from flask import Blueprint, render_template, jsonify, request
from extensions import fetch_extensions_from_local_source
from extensions import fetch_extensions_from_remote_source
from extensions import get_extension_by_name
import requests 

views = Blueprint("views", __name__)

@views.route("/")
def home():
       return render_template("index.html")

@views.route("/api/fetch_all")
def fetch_all_data():
    try:
        repo_list = fetch_extensions_from_remote_source() 
        from_remote_source = True
    except:
        repo_list = fetch_extensions_from_local_source()
        from_remote_source = False

    search = request.args.get("search")
    if search:
        repo_list = get_extension_by_name(search, repo_list)
        print(repo_list)
    page = int(request.args.get("page", 1))
    per_page = 50
    start = (page - 1) * per_page 
    end = start + per_page 

    paginated_data = repo_list[start:end]

    return jsonify({"data": paginated_data, "remote": from_remote_source})


@views.route("/api/ping_extension")
def ping_extension():
    url = request.args.get("url")
    if not url:
        return jsonify({"status_code": 404, "response_time": 0.0})
    try:
        query = requests.get(url, timeout=5)
        return jsonify({"status_code": query.status_code, "response_time": 0.0})
    except:
        return jsonify({"status_code": 502, "response_time": 0.0})
        

