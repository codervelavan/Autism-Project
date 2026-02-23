import joblib
import numpy as np

model = joblib.load("app/models/tabular_model.pkl")

def predict_tabular_risk(data):

    features = np.array([
        data["A1"],
        data["A2"],
        data["A3"],
        data["A4"],
        data["A5"],
        data["A6"],
        data["A7"],
        data["A8"],
        data["A9"],
        data["A10"],
        data["Age_Mons"],
        data["Qchat_10_Score"],
        data["Jaundice"],
        data["Family_mem_with_ASD"]
    ]).reshape(1, -1)

    prob = model.predict_proba(features)[0][1]
    confidence = max(model.predict_proba(features)[0])

    return float(prob), float(confidence)
