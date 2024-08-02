import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions, Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import CameraPreview from './CameraPreview';
import CustomButton from '../general/Button'
import Entypo from '@expo/vector-icons/Entypo';
import { compressImage } from '../../services/image-manipulator';
import { VideoQuality } from 'expo-camera/build/legacy/Camera.types';
// import { useUserContext } from '../../context/User';

export default function CameraScreen({navigation}) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions()
  const [cameraReady, setCameraReady] = useState(false)
  const [capturedData, setCapturedData] = useState()
  const cameraRef = useRef(null)
  const [mode, setMode] = useState('picture')
  const [recordingInProgress, setRecordingInProgress] = useState(false)

  const maxDuration = 10000

  if (!permission || !micPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (!micPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to mic to record the video</Text>
        <Button onPress={requestMicPermission} title="grant permission" />
      </View>
    );
  }

  async function captureImg() {
    const data = await cameraRef.current.takePictureAsync()
    const comressedData = await compressImage(data.uri, 0.9, 750, 1000)
    setCapturedData(comressedData)
    console.log({ data })
    // setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const startRecording = async () => {
    try {
      if (!cameraRef.current) return
      const timeout = setTimeout(async () => {
        await stopRecording()
        clearTimeout(timeout)
      }, maxDuration)
      setRecordingInProgress(true)
      const data = await cameraRef.current.recordAsync()
      console.log({ cideoData: data })
      setCapturedData(data)
    } catch(err) {
      console.log('Failed to record the video', err)
    } finally {
      setRecordingInProgress(false)
    }
  }

  const stopRecording = async () => {
    const data = await cameraRef.current.stopRecording({ })
      console.log({ stopVideoData: data })
      setRecordingInProgress(false)
  }

  const focusedOptionBtnStyle = { ...styles.cameraOptionBtn, ...styles.cameraOptionButtonFocussed }
  const focusedOptionBtnTxtStyle = { ...styles.camerOptionBtnText, ...styles.camerOptionBtnTextFocused }
 
  return (
    <View style={styles.container}>

      {capturedData ? (
       <CameraPreview mode={mode} data={capturedData} onDismiss={() => setCapturedData(null)} />
      ) : (
        <CameraView videoQuality={VideoQuality['480p']} ratio="16:9" mode={mode} ref={cameraRef} style={styles.camera} facing={facing} onCameraReady={() => setCameraReady(true)} onTouchEndCapture={() => setCameraReady(false)}>
          <View style={styles.actionsContainer}>
            {!recordingInProgress && (
                <View style={styles.cameraSwitchContainer}>
                  <CustomButton onPress={() => setMode('video')} style={mode === 'video' ? focusedOptionBtnStyle : styles.cameraOptionBtn}>
                    <Text style={mode === 'video' ? focusedOptionBtnTxtStyle : styles.camerOptionBtnText}>Video</Text>
                  </CustomButton>
                  <CustomButton onPress={() => setMode('picture')} style={mode === 'picture' ? focusedOptionBtnStyle : styles.cameraOptionBtn}>
                    <Text style={mode === 'picture' ? focusedOptionBtnTxtStyle : styles.camerOptionBtnText}>Camera</Text>
                  </CustomButton>
                </View>
            )}
            <View style={styles.buttonContainer}>
              {mode === 'picture' ? (
                <>
                <CustomButton onPress={captureImg} style={styles.roundedBtn}>
                <SimpleLineIcons name="camera" size={24} color="black" />
              </CustomButton>
              </>
              ) : (
                <>
                  {
                    recordingInProgress ? (
                      <CustomButton onPress={stopRecording} style={{ ...styles.roundedBtn, ...styles.videoStopBtn }} />
                    ) : (
                      <CustomButton onPress={startRecording} style={styles.roundedBtn}>
                        <Entypo name="video-camera" size={24} color="green" />
                      </CustomButton>
                    )
                  }
                </>
              )}
            </View>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  roundedBtn: {
    borderRadius: 28,
  },
  cameraSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
  },
  cameraOptionBtn: {
    paddingHorizontal: 15,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    margin: 0,
  },
  cameraOptionButtonFocussed: {
    borderBottomWidth: 2
  },
  camerOptionBtnText: {
    color: 'white'
  },
  camerOptionBtnTextFocused: {
    fontWeight: '500'
  },
  videoStopBtn: {
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'white',
    width: 56,
    height: 56
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor:'white',
    borderRadius:50,
    padding:20,
  },
});
