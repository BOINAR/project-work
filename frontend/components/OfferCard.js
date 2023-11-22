import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  NativeBaseProvider,
  Box,
  Actionsheet,
  Button,
  useDisclose,
  HStack,
  Stack,
  AspectRatio,
  Heading,
  Center,
} from 'native-base'
import ListOffersScreen from './ListOffers'
import ScreenOffer from './ScreenOffer'
import { BACKEND_URL } from '@env'

function OfferCard(props) {
  console.log('props.likes dans offercard', props.likes)
  // on enregistre la dimension de l'écran de l'utilisateur
  const { height, width } = useWindowDimensions()
  // console.log("offerID: ", props.offer._id);
  const [like, setLike] = useState(
    props.likes.find((el) => el === props.offer._id) ? true : false
  )

  const handleClick = () => {
    props.updateLikes(props.offer._id)

    if (like == true) {
      fetch(
        `${BACKEND_URL}/offers/removeLikeOffer?token=${props.userInfo.Token}&offerId=${props.offer._id}`
      )

      setLike(false)
    } else {
      fetch(
        `${BACKEND_URL}/offers/likeOffer?token=${props.userInfo.Token}&offerId=${props.offer._id}`
      )
      setLike(true)
    }
  }

  let heartStyle
  let size
  if (like == true) {
    heartStyle = {
      marginRight: 3,
      marginLeft: 2,
      color: 'red',
    }
    size = 26
  } else {
    heartStyle = {
      marginRight: 3,
      marginLeft: 2,
      color: '#FFD4D4',
    }
    size = 23
  }
  console.log('props : ', props)
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        width: width * 0.9,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0,
        elevation: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 8,
        marginTop: 10,
      }}
    >
      <Image
        source={{
          uri: props.offer.company.logo,
        }}
        style={{ width: width * 0.15, height: width * 0.15 }}
      />

      <View
        style={{
          flexDirection: 'column',
          height: width * 0.2,
          justifyContent: 'space-between',
          width: '60%',
        }}
      >
        <Text style={{ color: 'grey' }}>{props.offer.company.name}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
          {props.offer.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: 'grey' }}>
            {Math.floor(props.offer.salary * 151.67)} € /Mois
          </Text>
          <Text style={{ color: 'grey' }}>
            {props.offer.company.address.town}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: width * 0.2,
        }}
      >
        <View
          style={{
            width: width * 0.09,
            height: width * 0.09,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <Icon
            name='heart'
            size={size}
            solid
            style={heartStyle}
            onPress={() => handleClick()}
          />
        </View>
        <Text style={{ color: 'grey' }}>{'7'} km</Text>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    likes: state.likes,
    userInfo: state.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLikes: (id) =>
      dispatch({
        type: 'updateLikes',
        id: id,
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferCard)
