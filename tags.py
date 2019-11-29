import keras
import tensorflow as tf
import numpy as np

from keras.applications import resnet50
from keras.preprocessing import image
from keras.applications.imagenet_utils import decode_predictions

model = resnet50.ResNet50(weights='imagenet')

img = image.load_img('venice.jpg', target_size=(224, 224))
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)
x = resnet50.preprocess_input(x)

preds = model.predict(x)
print('Predicted:', decode_predictions(preds, top=2)[0])