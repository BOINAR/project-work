import React from 'react'
import { View, Image, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

export default function CvPopOver(props) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000B33',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View>
        <Text style={{ color: 'skyblue' }}>Bonne nouvelle !</Text>
      </View>

      <View>
        <Text style={{ color: 'skyblue' }}>
          Nous avons collecté vos information{' '}
        </Text>
      </View>
      <View>
        <Text style={{ color: 'skyblue' }}>
          Verifions si elles sont correctes
        </Text>
      </View>

      <IconFontAwesome5
        onPress={() => {
          props.navigation.navigate('Register', props.route.params)
        }}
        name='user-check'
        size={55}
        color='white'
        style={{ margin: 30, marginBottom: -1 }}
      />
      <Text style={{ marginRight: 15, color: 'pink' }}>continuer</Text>
    </View>
  )
}
