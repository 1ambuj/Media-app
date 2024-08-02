import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ResizeMode, Video } from 'expo-av';
import ScreenLoader from '../general/ScreenLoader';
import Button from '../general/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteMediaFile } from '../../services/storage';
import { useUserContext } from '../../context/User';

const MediaScreen = ({ navigation, route }) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const [state, setState] = useState({ status: 'init' })
  const { setUrls } = useUserContext()

  const url = route.params?.url
  const path = route.params?.path
  if (!url) {
    return
  }

  const isVideo = url.includes('.mp4');

  const handleDelete = async() => {
    try {
        setState({ status: 'pending' })
        await deleteMediaFile(path)
        setUrls((prev) => prev.filter((entry) => entry.path !== path))
        navigation.navigate('Home')
        setState({ status: 'success' })
    } catch(err) {
        console.error('Failed to delete the file ', err.message)
        setState({ status: 'failed', message: err.message })
    }
  }

  return (
    <View style={styles.container}>
      {isVideo ? (
        <View style={{ flex: 1, width: '100%' }}>
            <Video
                source={{ uri: url }}
                style={{ width: '100%', height: '100%', flex: 1, position: 'absolute', top: 0, left: 0 }}
                shouldPlay
                useNativeControls={!isVideoLoading}
                height="100%"
                resizeMode={ResizeMode.COVER}
                onLoadStart={() => setIsVideoLoading(true)}
                onLoad={() => setIsVideoLoading(false)}
            />
        </View>
      ) : (
        <Image width="100%" style={{ flex: 1 }} source={{ uri: url }} />
      )}
      {(isVideo && isVideoLoading) ? <ScreenLoader style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} /> : null}
      {((isVideo && !isVideoLoading) || !isVideo) ? (
        <Button onPress={handleDelete} style={styles.button}>
            {state.status === 'pending' ? (
                <ActivityIndicator size={24} color="white" />
            ) : (
                <MaterialIcons name="delete" size={24} color="white" />
            )}
            <Text style={styles.buttonText}>Delete</Text>
        </Button>
        ) : null}
    </View>
  )
}

export default MediaScreen

const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        justifyContent: "center",
        height: "100%",
        width:"100%"
    },
    button: {
        backgroundColor: 'red',
        width: '100%',
        marginHorizontal: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        alignItems: 'center',
        borderRadius: 0
    },
    buttonText: {
        color: 'white'
    }
})