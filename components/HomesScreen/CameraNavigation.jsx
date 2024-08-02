import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Button from '../general/Button'

const CameraNavigation = () => {
  const navigation = useNavigation()

  const navigateToCamera = () => navigation.navigate('Camera')
  return (
    <Button onPress={navigateToCamera}>
        <SimpleLineIcons name="camera" size={24} color="black" />
    </Button>
  )
}

export default CameraNavigation

const styles = StyleSheet.create({})