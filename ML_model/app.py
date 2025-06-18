from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import tensorflow as tf
import io

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_methods=["*"],
    allow_headers=["*"]
)

model = tf.keras.models.load_model("shape_detector_model.h5")
classes = ["circle", "square", "triangle", "parallelogram", "rectangle", "kite", "rhombus", "trapezoid"]

@app.get("/")
async def root():
    return {"message": "Welcome to the Shape Detection API!"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")  # keep 3 channels
    image = image.resize((128, 128))
    array = np.array(image).astype("float32") / 255.0
    array = array.reshape(1, 128, 128, 3)  # match model input
    pred = model.predict(array)
    label = classes[np.argmax(pred)]
    return {"prediction": label}