import json 
import requests

def fetch_extensions(url: str, remote=False):
    if remote:
        query = requests.get(url, timeout=5)
        return query.json()

    with open(url, "r") as fp:
        return json.load(fp)


def fetch_extensions_from_local_source():
    return fetch_extensions("index.min.json")

def fetch_extensions_from_remote_source():
    return fetch_extensions("https://raw.githubusercontent.com/keiyoushi/extensions/repo/index.min.json", remote=True)

def get_extension_by_name(query: str, repo_list: list[dict]):
    manga_found = []
    for repo in repo_list:
        if query.lower() in repo["name"].lower():
            manga_found.append(repo)
   
    
    return manga_found
