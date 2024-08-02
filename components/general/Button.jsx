import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Button = ({ children, style, ...props }) => {
  return (
    <Pressable {...props} style={({ pressed }) => ({ ...styles.container, opacity: pressed ? 0.5  :1, ...style }) }>
        {children}
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10
    },
    pressed: {
        opacity: 0.5
    }
})