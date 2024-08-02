import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from "../general/Button"
import { login } from '../../services/auth'
import { useNavigation } from '@react-navigation/native'
import { useUserContext } from '../../context/User'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState({ status: 'init' })

  const { user } = useUserContext()

  const navigation = useNavigation()

  useEffect(() => {
    if (user) {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
    }
  }, [user])

  const handleSignIn = async () => {
    try {
        setState({ status: 'loading' })
        if (!email) throw new Error('Email id is required')
        if (!password) throw new Error('Password is is required')
        await login(email, password)
        setState({ status: 'success' })
    } catch(err) {
        setState({ status: 'failed', message: err.message })
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
               style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder='Enter email id'
                inputMode="email"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder='Enter password'
            />
        </View>
        {state.status === 'failed' ? <Text style={styles.errorText}>{state.message || ''}</Text> : null}
        <CustomButton onPress={handleSignIn} style={styles.button}>
            {state.status === 'loading' ? <ActivityIndicator size={24} color="#fff" /> : null}
            <Text style={styles.buttonText}>Login</Text>
        </CustomButton>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    },
    inputContainer: {
        gap: 16,
        width: '100%'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'grey',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10
    },
    button: {
        backgroundColor: 'blue',
        width: '100%',
        marginTop: 40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16
    },
    buttonText: {
        color: 'white'
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 12,
        alignSelf: 'flex-start'
    }
})