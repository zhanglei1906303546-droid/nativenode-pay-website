import base64
import json
import urllib.request
import os

TOKEN = os.environ.get("GITHUB_TOKEN")
REPOS = [
    "zhanglei1906303546-droid/nativenode-pay-website",
    "zhanglei1906303546/nativenode-pay-website"
]

FILES = [
    "zh/resources/index.html",
    "zh/resources/high-value-payment-stability.html",
    "zh/resources/how-to-boost-us-checkout-conversions.html",
    "zh/resources/middle-east-market-access.html",
    "en/resources/index.html",
    "en/resources/high-value-payment-stability.html",
    "en/resources/how-to-boost-us-checkout-conversions.html",
    "en/resources/middle-east-market-access.html"
]

def get_sha(repo, path):
    url = f"https://api.github.com/repos/{repo}/contents/{path}"
    headers = {"Authorization": f"token {TOKEN}"}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode("utf-8"))
            return data["sha"]
    except Exception as e:
        # print(f"Error getting SHA for {repo}/{path}: {e}")
        return None

def update_file(repo, path):
    sha = get_sha(repo, path)
    
    with open(path, "rb") as f:
        content = base64.b64encode(f.read()).decode("utf-8")
    
    data = {
        "message": "feat: remove SEO content and fill high-def images",
        "content": content,
        "branch": "main"
    }
    if sha:
        data["sha"] = sha
    
    headers = {
        "Authorization": f"token {TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    }
    
    url = f"https://api.github.com/repos/{repo}/contents/{path}"
    req = urllib.request.Request(url, data=json.dumps(data).encode("utf-8"), headers=headers, method="PUT")
    try:
        with urllib.request.urlopen(req) as response:
            if response.status in (200, 201):
                print(f"Successfully updated {repo}/{path}")
            else:
                print(f"Failed to update {repo}/{path}: {response.status}")
    except Exception as e:
        print(f"Error updating {repo}/{path}: {e}")

if __name__ == "__main__":
    for repo in REPOS:
        for path in FILES:
            update_file(repo, path)
