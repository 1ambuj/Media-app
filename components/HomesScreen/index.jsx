import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { useUserContext } from '../../context/User';
import { listAllMediaFiles } from '../../services/storage';
import ScreenLoader from '../general/ScreenLoader';
import Thumbnail from '../general/Thumbnail';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation, route }) => {
  const { user, urls, setUrls } = useUserContext()
  const [state, setState] = useState({ status: 'init' })


  useEffect(() => {
    if (user.uid) {
      fetchMediaUrls(user.uid)
    }
  }, [user?.uid])

  const fetchMediaUrls = async (uid) => {
    try {
      setState({ status: 'pending' })
      const urlList = await listAllMediaFiles(uid)
      console.log({ urlList })
      setUrls(urlList)
      setState({ status: 'success' })
    } catch(err) {
      console.error('Failed to fetch the images ', err.message)
      setState({ status: 'failed', message: err.message })
    }
  }

  const handleOpenMedia = (item) => {
    navigation.navigate('Media', {
      url: item.url,
      path: item.path
    })
  }

  if (state.status === 'pending') {
    return <ScreenLoader />
  }

  return (
    <SafeAreaView>
      <FlatList
        numColumns={2}
        data={urls}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <Thumbnail url={item.url} onPress={() => handleOpenMedia(item)} />}
        style={{
          paddingVertical: 16
        }}
        contentContainerStyle= {{
          gap: 12
        }}
        columnWrapperStyle={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          gap: 12,
          paddingHorizontal: 12
        }}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
