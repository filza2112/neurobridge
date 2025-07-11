from flask import Flask, request, jsonify
from keybert import KeyBERT

kw_model = KeyBERT("all-MiniLM-L6-v2")
app = Flask(__name__)

@app.route("/extract-keywords", methods=["POST"])
def extract():
    data = request.get_json()
    text = data.get("text", "")
    keywords = kw_model.extract_keywords(text, top_n=3)
    return jsonify({"keywords": [kw[0] for kw in keywords]})

if __name__ == "__main__":
    app.run(port=7001)

