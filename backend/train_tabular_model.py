import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import classification_report

# Load dataset
df = pd.read_csv("data/autism.csv")

# Clean column names
df.columns = df.columns.str.strip()

# Encode categorical columns
label_cols = ["Sex", "Ethnicity", "Jaundice", 
              "Family_mem_with_ASD", 
              "Who completed the test", 
              "Class/ASD Traits"]

for col in label_cols:
    df[col] = LabelEncoder().fit_transform(df[col])

# Feature selection
features = [
    "A1","A2","A3","A4","A5",
    "A6","A7","A8","A9","A10",
    "Age_Mons",
    "Qchat-10-Score",
    "Jaundice",
    "Family_mem_with_ASD"
]

X = df[features]
y = df["Class/ASD Traits"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
rf = RandomForestClassifier(n_estimators=300)
rf.fit(X_train, y_train)

# Calibrate probabilities
calibrated = CalibratedClassifierCV(rf)
calibrated.fit(X_train, y_train)

# Evaluate
print(classification_report(y_test, calibrated.predict(X_test)))

# Save calibrated model for predictions
joblib.dump(calibrated, "app/models/tabular_model.pkl")

# Save original RF model for SHAP
joblib.dump(rf, "app/models/shap_model.pkl")

print("Models saved successfully.")
