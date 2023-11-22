import React, { useState } from 'react'
import { View, Text, Dimensions, Pressable } from 'react-native'
import { Input } from 'react-native-elements'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BACKEND_URL } from '@env'

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width
import { connect } from 'react-redux'

function LogIn(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  var handleSubmitSignin = async () => {
    // verifier que le backend accepte les infos de sign up
    const data = await fetch(`${BACKEND_URL}/signUp/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `emailFromFront=${email}&passwordFromFront=${password}`,
    })
    var datajson = await data.json();

    console.log("is result true", datajson.result);
    if (datajson.result == true) {
      console.log("sign In data json user", datajson.user)
      // on vient "setter" notre token dans le localStorage
      AsyncStorage.setItem('token', JSON.stringify(datajson.token))
      // on initialise les reducers de Redux
      props.initialiseUserInfo({
        Nom: datajson.user.nom,
        Prénom: datajson.user.prenom,
        Avatar: datajson.user.avatar,
        Token: datajson.user.token,
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
      console.log(offers)
      props.initialiseJobOffersInfo(offers.offers)

      // on navigue vers la page de Dashboard
      props.navigation.navigate('BottomNavigator', { screen: 'Dashboard' })
    }
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000B33',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'skyblue', marginTop: 40, fontSize: 20 }}>
        -LogIn-
      </Text>

      <View
        style={{
          marginBottom: -100,
          flexDirection: 'row',

          marginBottom: 30,
        }}
      ></View>
      <View style={{ width: 270, marginBottom: -30 }}>
        <Input
          style={{ fontSize: 15 }}
          onChangeText={(value) => setEmail(value)}
          placeholder='email'
        />

        <Input
          style={{ fontSize: 15 }}
          onChangeText={(value) => setPassword(value)}
          placeholder='Mot de passe'
        />
      </View>
      <Pressable
        onPress={() => {
          handleSubmitSignin()
        }}
      >
        <IconFontAwesome5
          name='user-check'
          size={55}
          color='white'
          style={{ margin: 30, marginBottom: -1 }}
        />
      </Pressable>
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

export default connect(null, mapDispatchToProps)(LogIn)
