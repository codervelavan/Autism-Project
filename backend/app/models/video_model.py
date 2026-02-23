import numpy as np

# Simple heuristic model for demo
def predict_video_risk(features):

    face_ratio = features["face_ratio"]
    avg_movement = features["avg_movement"]

    # Lower face engagement → higher risk
    face_risk = 1 - face_ratio

    # Very low movement can indicate behavioral rigidity
    movement_risk = 1 / (1 + avg_movement)

    final_risk = (0.6 * face_risk) + (0.4 * movement_risk)

    final_risk = max(0.0, min(1.0, final_risk))

    return round(final_risk, 4)
