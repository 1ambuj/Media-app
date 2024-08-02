import * as ImageManipulator from 'expo-image-manipulator';

export const compressImage = async (uri, compress = 0.7, width, height) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width, height } }],
        { compress, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipResult;
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };
