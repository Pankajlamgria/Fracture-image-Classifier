from flask import Flask,request,jsonify
import numpy as np
import tensorflow as tf
from tensorflow import keras
from PIL import Image
from flask_cors import CORS
import io
import matplotlib.pyplot as plt

model = tf.keras.models.load_model('model.h5')
classes=['Avulsion fracture', 'Comminuted fracture', 'Fracture Dislocation', 'Greenstick fracture', 'Hairline Fracture', 'Impacted fracture', 'Longitudinal fracture', 'Oblique fracture', 'Pathological fracture', 'Spiral Fracture']
app=Flask(__name__)
CORS(app)


@app.route("/predict",methods=['POST','GET'])
def predict():
    file=request.files['file']
    img=Image.open(io.BytesIO(file.read()))
    img=img.resize((256,256))
    img_array=np.array(img)
    img_array=img_array.reshape(1,256,256,3)
    prediction = model.predict(img_array)
    res=np.argmax(prediction)
    return jsonify({'prediction': f'{classes[res]} Possibility:{prediction[0,res]*100}%'})


if __name__=="__main__":
    app.run(debug=True)