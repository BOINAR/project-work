import React, { useEffect } from 'react'
import { View, Image, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { Dimensions } from 'react-native'

import { connect } from 'react-redux'
import { BACKEND_URL } from '@env'

import Icon from 'react-native-vector-icons/FontAwesome'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

function Welcome1(props) {
  useEffect(() => {
    // si le user accede cette page sans avoir deconnecte depuis le dernier
    // session on va pouvoir recuperer son token et rediriger le user sur son dashboard
    AsyncStorage.getItem('token', function (error, value) {
      console.log('value', value)
      if (value) {
        var handleSubmitSignin = async () => {
          // verifier que le backend accepte les infos de sign up
          const data = await fetch(
            `${BACKEND_URL}/signUp/existingToken?token=${JSON.parse(value)}`
          )
          var datajson = await data.json()
          console.log('datajson', datajson)
          console.log("existing token succes --> user info", datajson.user)
          // on initialise les reducers de Redux
          props.initialiseUserInfo({
            Nom: datajson.user.nom,
            Prénom: datajson.user.prenom,
            Token: datajson.user.token,
            Avatar: datajson.user.avatar,
            Mail: datajson.user.email,
            Téléphone: datajson.user.phone || '',
            'Date de Naissance': datajson.user.bornWhen || '',
            'Lieu de Naissance': datajson.user.bornAt || '',
            Adresse: datajson.user.userAddress.streetName || "",
            Ville: datajson.user.userAddress.town || "",
            'Code Postal': datajson.user.userAddress.zipCode || "",
          })
          props.initialiseProfessionInfo(datajson.user.jobs)
          props.initialiseApplicationsInfo(datajson.user.applications)
          props.initialiseLikes(datajson.user.likesOfferIds)

          // on cree une deuxieme fetch en GET pour chercher les offers liées a notre utilisateur
          const offersRaw = await fetch(
            `${BACKEND_URL}/offers/listOffers?token=${datajson.user.token}`
          )
          const offers = await offersRaw.json()
          console.log('offers.offers après deuxieme fetch', offers.offers)
          props.initialiseJobOffersInfo(offers.offers)

          // on navigue vers la page de Dashboard
          props.navigation.navigate('BottomNavigator', { screen: 'Dashboard' })
        }
        handleSubmitSignin()
      }
    })
  }, [])

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
        <Button
          onPress={() => {
            props.navigation.navigate('Welcome2')
          }}
          buttonStyle={{
            backgroundColor: '#000B33',
            width: deviceWidth * 0.8,

            marginTop: 220,
            borderRadius: 15,
            padding: 10,
          }}
          containerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="S'inscrire en 1 minute avec votre CV"
        />
        <Button
          buttonStyle={{
            backgroundColor: '#000B33',
            width: deviceWidth * 0.8,
            marginTop: 15,
            borderRadius: 15,
            padding: 10,
          }}
          containerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title='Se connecter'
          onPress={() => props.navigation.navigate('LogIn')}
        />
      </View>
      <Text style={{ alignItems: 'center', marginTop: 50, margin: 40 }}>
        {'- Se connecter avec - '}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../assets/googleLogo.png')}
          style={{ width: 50, height: 50, margin: 10 }}
        />
        <Image
          source={require('../assets/facebookLogo.png')}
          style={{ width: 50, height: 50, margin: 10 }}
        />
      </View>
      <Text style={{ alignItems: 'center', marginBottom: -50, marginTop: 50 }}>
        {'Nouveau ? Créer un compte '}
      </Text>
      <Image
        resizeMode='contain'
        source={require('../assets/homme.png')}
        style={{
          height: deviceHeight * 0.5,
          marginTop: 20,
        }}
      />
    </View>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialiseUserInfo: (userInfo) => {
      dispatch({
        type: 'initialiseUserInfo',
        userInfo: userInfo,
      })
    },
    initialiseProfessionInfo: (professionInfo) => {
      dispatch({
        type: 'initialiseProfessionInfo',
        professionInfo: professionInfo,
      })
    },
    initialiseApplicationsInfo: (applicationInfo) => {
      dispatch({
        type: 'initialiseApplicationInfo',
        applicationInfo: applicationInfo,
      })
    },
    initialiseJobOffersInfo: (jobOffers) => {
      dispatch({
        type: 'initialiseJobOffersInfo',
        jobOffers: jobOffers,
      })
    },
    initialiseLikes: (offerIds) => {
      dispatch({
        type: 'setAllLikes',
        offerIds: offerIds,
      })
    },
  }
}

export default connect(null, mapDispatchToProps)(Welcome1)
