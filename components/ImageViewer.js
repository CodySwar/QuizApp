import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource }) {
  //const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={placeholderImageSource} />;
}