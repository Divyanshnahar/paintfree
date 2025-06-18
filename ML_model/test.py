from tensorflow.keras.models import load_model

model = load_model("shape_detector_model.h5")
model.summary()