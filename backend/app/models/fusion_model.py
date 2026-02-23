def fuse_predictions(tabular_risk, video_risk):

    # Dynamic weighting
    if video_risk > 0.75:
        video_weight = 0.6
    else:
        video_weight = 0.4

    tabular_weight = 1 - video_weight

    final_risk = (tabular_weight * tabular_risk) + (video_weight * video_risk)

    return float(final_risk)
