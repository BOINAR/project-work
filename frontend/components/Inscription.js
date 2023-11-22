import React, { useState } from 'react'

import { View, Text, Dimensions, Pressable } from 'react-native'
import { Input } from 'react-native-elements'
import { BACKEND_URL } from '@env'

import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { AntDesign } from '@expo/vector-icons'

import { connect } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width
console.log('BACKEND_URL', BACKEND_URL)

function Inscription(props) {
  const [nom, setNom] = useState(props.route.params.name.split(' ')[1])
  const [prenom, setPrenom] = useState(props.route.params.name.split(' ')[0])
  const [email, setEmail] = useState(props.route.params.email)
  const [tel, setTel] = useState(props.route.params.phone)
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  var handleSubmitSignin = async () => {
    // verifier que le backend accepte les infos de sign up
    const data = await fetch(`${BACKEND_URL}/signUp/inscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `nomFromFront=${nom}&prenomFromFront=${prenom}&emailFromFront=${email}&telFromFront=${tel}&passwordFromFront=${password}&confPasswordFromFront=${confPassword}`,
    })
    var datajson = await data.json()
    if (datajson.result == true) {
      // on vient "setter" notre token dans le localStorage
      AsyncStorage.setItem('token', JSON.stringify(datajson.token))
      // on initialise les reducers de Redux
      props.initialiseUserInfo({
        Nom: datajson.saveUser.nom,
        Prénom: datajson.saveUser.prenom,
        Token: datajson.token,
        Avatar: datajson.avatar,
        Mail: datajson.saveUser.email,
        Téléphone: datajson.saveUser.phone || '',
        'Date de Naissance': datajson.saveUser.bornWhen || '',
        'Lieu de Naissance': datajson.saveUser.bornAt || '',
        Adresse: datajson.saveUser.userAddress.streetName,
        Ville: datajson.saveUser.userAddress.town,
        'Code Postal': datajson.saveUser.userAddress.zipCode,
      })
      props.initialiseProfessionInfo(datajson.saveUser.jobs)
      props.initialiseApplicationsInfo(datajson.saveUser.applications)
      console.log('hellooooo,kjlhg')
      // on cree une deuxieme fetch en GET pour chercher les offers liées a notre utilisateur
      const offersRaw = await fetch(
        `${BACKEND_URL}/offers/listOffers?token=${datajson.token}`
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
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white', marginTop: 100 }}>
        Validons vos informations personnelles
      </Text>

      <View style={{ width: 300, marginTop: 100 }}>
        <Input
          style={{ fontSize: 15, color: 'white' }}
          onChangeText={(value) => setNom(value)}
          placeholder='Nom'
          value={nom}
        />

        <Input
          style={{ fontSize: 15, color: 'white' }}
          onChangeText={(value) => setPrenom(value)}
          placeholder='Prénom'
          value={prenom}
        />

        <Input
          style={{ fontSize: 15, color: 'white' }}
          onChangeText={(value) => setEmail(value)}
          placeholder='email'
          value={email}
        />

        <Input
          style={{ fontSize: 15, color: 'white' }}
          containerStyle={{ marginBottom: 30 }}
          onChangeText={(value) => setTel(value)}
          placeholder='Téléphone'
          value={tel}
        />

        <Input
          style={{ fontSize: 15, color: 'white' }}
          onChangeText={(value) => setPassword(value)}
          placeholder='Mot de passe'
          secureTextEntry={true}
          value={password}
          rightIcon={
            password === confPassword &&
            password !== '' && (
              <AntDesign name='checkcircle' size={24} color='green' />
            )
          }
        />

        <Input
          style={{ fontSize: 15, color: 'white' }}
          onChangeText={(value) => setConfPassword(value)}
          placeholder='Confirmer votre mot de passe'
          secureTextEntry={true}
          value={confPassword}
          rightIcon={
            password === confPassword &&
            password !== '' && (
              <AntDesign name='checkcircle' size={24} color='green' />
            )
          }
        />
      </View>
      <Pressable
        onPress={() => {
          handleSubmitSignin()
        }}
      >
        <IconFontAwesome5 name='user-check' size={55} color='white' />
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
  }
}

export default connect(null, mapDispatchToProps)(Inscription)
