import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ScreenLoader = ({ style }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', ...style }}>
      <ActivityIndicator color="grey" size={30} />
    </View>
  )
}

export default ScreenLoader

const styles = StyleSheet.create({})