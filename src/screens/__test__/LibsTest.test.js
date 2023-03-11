import {Button, StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';

export default function LibsTest() {
  const [image, setImage] = useState({
    name: null,
    uri: null,
    type: null,
  });
  const [imageUrl, setImageUrl] = useState(null);

  async function ambilGambar() {
    try {
      const {assets} = await launchCamera({
        mediaType: 'photo',
        quality: 0.1,
      });
      const {fileName: name, uri, type} = assets[0];
      setImage({name, uri, type});
    } catch (error) {
      console.log(error.message);
    }
  }

  function hitEndpoint() {
    const formData = new FormData();
    formData.append('image', image);

    fetch('https://tirtadisposisi.pondokprogrammer.com/api/post_gambar', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setImageUrl(response.data.image.image);
        Alert.alert('', 'Kirim gambar ke WhatsApp?', [
          {text: 'Kirim'},
          {text: 'Batal'},
        ]);
      })
      .catch(err => console.log(err.message));
  }

  return (
    <View>
      <Button title="ambil gambar" onPress={ambilGambar} />
      {image.uri && (
        <Image source={{uri: image.uri}} style={{width: 300, height: 300}} />
      )}
      <Button title="hit endpoint" onPress={hitEndpoint} />
      {imageUrl && (
        <Image source={{uri: imageUrl}} style={{width: 200, height: 200}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
