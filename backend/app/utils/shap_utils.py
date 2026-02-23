import shap
import numpy as np
import joblib

# Load raw RandomForest model (NOT calibrated one)
model = joblib.load("app/models/shap_model.pkl")

explainer = shap.TreeExplainer(model)

def get_shap_values(data):

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

    shap_values = explainer.shap_values(features)

    # For binary classification, use class 1 explanation
    return shap_values[1].tolist()
