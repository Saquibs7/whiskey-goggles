from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Load model
model = load_model('whisky_goggles_model.h5')

# Prepare data generators
val_datagen = ImageDataGenerator(rescale=1./255)

val_generator = val_datagen.flow_from_directory(
    'data/val',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical'
)

# Evaluate the model on the validation set
val_loss, val_acc = model.evaluate(val_generator, steps=val_generator.samples // val_generator.batch_size)
print(f"Validation Accuracy: {val_acc * 100:.2f}%")
