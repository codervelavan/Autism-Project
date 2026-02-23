def generate_therapy_plan(data, final_risk, engagement_score):

    recommendations = []

    # Speech & communication concern
    if data["Qchat_10_Score"] >= 6:
        recommendations.append("Speech and Language Therapy")

    # Social interaction issues
    if engagement_score < 0.5:
        recommendations.append("Social Interaction Training")

    # Behavioral rigidity indicators
    repetitive_score = sum([
        data["A3"], data["A4"], data["A5"]
    ])

    if repetitive_score >= 2:
        recommendations.append("Behavioral Therapy (ABA-based)")

    # Family history support
    if data["Family_mem_with_ASD"] == 1:
        recommendations.append("Family Counseling & Early Intervention Support")

    if final_risk > 0.7:
        intensity = "High-Intensity Structured Intervention Plan"
    elif final_risk > 0.4:
        intensity = "Moderate Structured Intervention Plan"
    else:
        intensity = "Routine Developmental Monitoring"

    return {
        "intervention_intensity": intensity,
        "recommended_therapies": recommendations
    }
