import librosa
import numpy as np
import joblib
from sklearn.svm import SVC
from flask import Flask, request, jsonify

#to judge tone
# Dummy model (for illustration)
model = joblib.load("tone_svm_model.pkl")  # Assume pre-trained SVM

app = Flask(__name__)

def extract_features(audio_path):
    y, sr = librosa.load(audio_path)
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    return np.mean(mfccs.T, axis=0)

@app.route("/analyze-tone", methods=["POST"])
def analyze():
    file = request.files["audio"]
    path = f"temp_audio.wav"
    file.save(path)
    features = extract_features(path).reshape(1, -1)
    tone = model.predict(features)[0]
    return jsonify({"tone": tone})

if __name__ == "__main__":
    app.run(port=7000)