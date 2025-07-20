from flask import Blueprint, render_template, jsonify, request
from extensions import fetch_extensions_from_local_source
from extensions import fetch_extensions_from_remote_source
from extensions import get_extension_by_name
import requests 
import time

views = Blueprint("views", __name__)

@views.route("/")
def home():
       return render_template("index.html")

@views.route("/settings")
def settings():
       return render_template("settings.html")


#---------- API ROUTES -----------#
@views.route("/api/fetch_all")
def fetch_all_data():
    is_local = request.args.get("is_local", 'True').capitalize() == 'True'
    ping_onload = request.args.get("ping_onload", 'True').capitalize() == 'True'
    print(ping_onload)
    if is_local:
        repo_list = fetch_extensions_from_local_source()
        from_remote_source = False

    else:
        try:
            repo_list = fetch_extensions_from_remote_source() 
            from_remote_source = True
        except:
            repo_list = fetch_extensions_from_local_source()
            from_remote_source = False

    search = request.args.get("search")
    if search:
        repo_list = get_extension_by_name(search, repo_list)
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 10))
    start = (page - 1) * per_page 
    end = start + per_page 

    paginated_data = repo_list[start:end]
    for i in range(len(paginated_data)):
        paginated_data[i]["ping_response"] = ping_extension_func(paginated_data[i]["sources"][0]["baseUrl"], ping_onload)

    return jsonify({"data": paginated_data, "remote": from_remote_source})


@views.route("/api/ping_extension")
def ping_extension():
    url = request.args.get("url")
    if not url:
        return jsonify({"status_code": 404, "response_time": 0.0})
    return jsonify(ping_extension_func(url, True))        


def ping_extension_func(url: str, can_ping: bool) -> dict[str, int | float]:
    try:
        t0 = time.time()
        if can_ping:
            query = requests.get(url, timeout=5)
        else:    
            return {"status_code": 000, "response_time": 0.0, "ping_onload": can_ping}
        t1 = time.time()

        return {"status_code": query.status_code, "response_time": t1 - t0, "ping_onload": can_ping}
    except:
        return {"status_code": 502, "response_time": 0.0, "ping_onload": can_ping}

