import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, View, Image, Text, Pressable } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function Thumbnail({ url, ...props }) {
  const [image, setImage] = useState(null);

  const isVideo = url.includes('.mp4')

  // console.log('tuhmbnail', { url, isVideo  })

  useEffect(() => {
    if (isVideo) {
        generateThumbnail()
    }
  }, [])

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        url,
        {
          time: 15000,
        }
      );
      setImage(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <Pressable {...props} style={({ pressed }) => ({ ...styles.container, opacity: pressed ? 0.5 : 1 })}>
        <View style={{ width: '100%' }}>
          <Image source={{ uri: isVideo ? image : url }} style={styles.image} resizeMode="cover" />
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  image: {
    height: 150,
    width: 'auto'
  },
});
