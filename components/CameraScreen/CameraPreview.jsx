import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '../general/Button';
import { ResizeMode, Video } from 'expo-av';
import { uploadFile } from '../../services/storage';
import { useUserContext } from '../../context/User';

const CameraPreview = ({ mode, data, onDismiss }) => {
  const [state, setState] = useState({ status: 'init' })
  const { user, setUrls } = useUserContext()

  const handleUpload = async () => {
    try {
        setState({ status: 'pending' })
        console.log({ user })
        const savedFile = await uploadFile(data, user.uid)
        console.log({ savedFile })
        setUrls((prev) => [ savedFile, ...prev ])
        setState({ status: 'success' })
        onDismiss()
    } catch(err) {
        console.error('Failed to upload the file ', err.message)
        setState({ status: 'failed', message: err.message })
    }
  }

  return (
    <View style={styles.container}>
        {mode === 'picture' ? (
            <Image width="100%" height="100%" source={{ uri: data.uri }} />
        ) : (
            <Video
                source={{ uri: data.uri }}
                style={{ width: '100%', height: "100%", position: 'absolute', top: 0, left: 0 }}
                shouldPlay
                isLooping
                height="100%"
                resizeMode={ResizeMode.COVER}
            />
        )}
        <View style={styles.buttonContainer}>
            <Button onPress={handleUpload} style={styles.button}>
                {state.status === 'pending' ? (
                    <ActivityIndicator size={24} color="black" />
                ) : (
                    <AntDesign size={24} name="save" color="black" />
                )}
                <Text>Save</Text>
             </Button>
            <Button onPress={onDismiss} style={{ ...styles.button, ...styles.dismissButton }}>
                <AntDesign name="close" size={24} color="white" />
                <Text style={{ color: 'white' }}>Dismiss</Text>
            </Button>
        </View>
    </View>
  )
}

export default CameraPreview

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    dismissButton: {
        backgroundColor: 'red'
    }
})