import cv2
import numpy as np

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

def extract_video_features(video_path):

    cap = cv2.VideoCapture(video_path)

    total_frames = 0
    face_detected_frames = 0
    movement_scores = []

    prev_gray = None

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        total_frames += 1

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Face detection
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        if len(faces) > 0:
            face_detected_frames += 1

        # Motion detection
        if prev_gray is not None:
            diff = cv2.absdiff(prev_gray, gray)
            movement_scores.append(np.mean(diff))

        prev_gray = gray

    cap.release()

    if total_frames == 0:
        return None

    face_ratio = face_detected_frames / total_frames
    avg_movement = np.mean(movement_scores) if movement_scores else 0

    return {
        "face_ratio": face_ratio,
        "avg_movement": avg_movement
    }
