import React, { useState } from 'react'
import { View, Image, Text, Pressable } from 'react-native'
import { Button } from 'react-native-elements'
import { Dimensions } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Feather } from '@expo/vector-icons'
import { BACKEND_URL } from '@env'
 
import * as DocumentPicker from 'expo-document-picker'
 
let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width
 
export default function Welcome2(props) {
 const handleChooseCV = async () => {
   let result = await DocumentPicker.getDocumentAsync({
     type: 'application/pdf',
   })
 
   if (result.type != 'cancel') {
     const formData = new FormData()
     formData.append('file', {
       uri: result.uri,
       type: 'application/pdf',
       name: 'cv.pdf',
     })
 
     const res = await fetch(`${BACKEND_URL}/signUp/sendCV`, {
       method: 'POST',
       body: formData,
     })
     const resJSON = await res.json()
     console.log(resJSON)
     props.navigation.navigate('CvPopover', resJSON)
   }
 }
 
 return (
  <View
  style={{
    flex: 1,
    flexDirection: 'column',

    alignItems: 'center',
  }}
>
  <Image
    resizeMode='contain'
    source={require('../assets/logoWork.png')}
    style={{
      width: 250,
      height: 250,
      marginBottom: -250,
    }}
  />

  <View>
    <Text style={{ alignItems: 'center', marginTop: 250 }}>
      {'Importer votre CV '}
    </Text>
  </View>

  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <IconFontAwesome
        name='camera'
        size={55}
        color='#000B33'
        style={{ margin: 30 }}
      />
      <Text
        style={{ fontSize: 12, width: deviceWidth * 0.2, marginLeft: 30 }}
      >
        Photo
      </Text>
    </View>
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Pressable onPress={handleChooseCV}>
        <IconFontAwesome5
          name='file-export'
          size={55}
          color='#000B33'
          style={{ margin: 30 }}
        />
        <Text
          style={{ fontSize: 12, width: deviceWidth * 0.2, marginLeft: 25 }}
        >
          Upload
        </Text>
      </Pressable>
    </View>
  </View>
  <Text
    style={{
      alignItems: 'center',
      marginBottom: -50,
      marginTop: 40,
      width: deviceWidth * 0.8,
    }}
  >
    {
      'Nous allons récupérer les informations  de votre CV afin de vous éviter de les saisir'
    }
    </Text>
    <Image
      resizeMode='contain'
      source={require('../assets/femme.png')}
      style={{
        height: deviceHeight * 0.5,
        marginTop: 30,
      }}
    />
  </View>
)
}
