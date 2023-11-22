import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { BACKEND_URL } from '@env'

import { useDisclose, Center } from 'native-base'
import { Button } from 'react-native-elements'
import { Ionicons, AntDesign } from '@expo/vector-icons'

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  useWindowDimensions,
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import userInfo from '../reducers/userInfo'
import { applyMiddleware } from 'redux'

function ScreenOffer(props) {
  console.log('id dans screen Offer', props.route.params.offerId)
  const [offerData, setOfferData] = useState(null)
  const { height, width } = useWindowDimensions()

  const handleClickBlock = async () => {
    const data = await fetch(
      `${BACKEND_URL}/offers/blockOffer?offerId=${props.route.params.offerId}&token=${props.userInfo.token}`
    )
    const body = await data.json()
    props.updateBlackList(props.route.params.offerId)
    // props.blockOffer(props.route.params.offerId)
    props.navigation.navigate('ListOffers')
  }
  useEffect(() => {
    console.log('props: ', props.route.params.offerId)
    const screenOfferData = async () => {
      // console.log(isFocused);
      const data = await fetch(
        `${BACKEND_URL}/offers/displayOffer?offerId=${props.route.params.offerId}`
      )
      const body = await data.json()
      console.log('body dans ScreenOffer', body.offer)
      setOfferData(body.offer)
    }

    screenOfferData()
  }, [])

  const apply = async () => {
    const data = await fetch(`${BACKEND_URL}/offers/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.userInfo.Token}&offerId=${props.route.params.offerId}`
    });
    const dataJSON = await data.json();
    props.initialiseApplicationInfo(dataJSON.applications);
    props.navigation.navigate("Dashboard", { missions: "Missions" })
  }

  const viewSkills =
    offerData &&
    offerData.jobs[0].skills.map((skill, i) => {
      return (
        <View style={styles.viewskills} key={i}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#000B33' }}>
            Compétences : {skill.skill_title}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16 }}>Aisance : </Text>
            <>
              <AntDesign
                name='star'
                size={21}
                color={skill.level > 0 ? '#FFF500' : '#FFFFFF'}
              />
              <AntDesign
                name='star'
                size={21}
                color={skill.level > 1 ? '#FFF500' : '#FFFFFF'}
              />
              <AntDesign
                name='star'
                size={21}
                color={skill.level > 2 ? '#FFF500' : '#FFFFFF'}
              />
            </>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16 }}>Expérience : </Text>
            <>
              <AntDesign
                name='star'
                size={21}
                color={skill.experience > 0 ? '#FFF500' : '#FFFFFF'}
              />
              <AntDesign
                name='star'
                size={21}
                color={skill.experience > 1 ? '#FFF500' : '#FFFFFF'}
              />
              <AntDesign
                name='star'
                size={21}
                color={skill.experience > 2 ? '#FFF500' : '#FFFFFF'}
              />
            </>
          </View>
        </View>
      )
    })

  return (
    offerData && (
      <SafeAreaProvider style={{ margin: 5 }}>
        <View style={styles.principal}>
          {/* header */}

          <View style={styles.header}>
            <Image
              source={{
                uri: offerData.company.logo,
              }}
              style={{ width: width * 0.2, height: width * 0.2 }}
            />
          </View>
          {/* header */}

          {/* title of jobs and infos */}
          <View style={styles.title}>
            <Text
              style={{ fontWeight: 'bold', fontSize: 15, color: '#00F0FF' }}
            >
              {offerData.jobs[0].job_title.toUpperCase()}
            </Text>
            <Text style={{ fontSize: 16, color: '#00F0FF' }}>
              {offerData.company.name}
            </Text>
            <Text style={{ fontSize: 14, color: '#00F0FF' }}>
              {Math.floor(offerData.salary * 151.67)} € Brut/Mois -
              {offerData.contract}
            </Text>
          </View>
          {/* title of jobs and infos */}

          {/* MAP*/}
          <View style={styles.map}>
            <MapView
              style={{
                flex: 1,
                height: '100%',
                width: width * 0.9,
                alignSelf: 'center',
                borderRadius: 20,
              }}
              initialRegion={{
                latitude: 43.29, // pour centrer la carte
                longitude: 5.36978,
                latitudeDelta: 0.4, // le rayon à afficher à partir du centre
                longitudeDelta: 0.3,
              }}
            >
              <Marker
                pinColor='#2D98DA'
                key={0}
                coordinate={{
                  latitude: 43.29,
                  longitude: 5.36978,
                }}
                opacity={1} // Modifier l'opacité
              />
              {/* marker city */}
              <Marker
                pinColor='red'
                key={1}
                coordinate={{
                  latitude: Number(offerData.latitude),
                  longitude: Number(offerData.longitude),
                }}
                opacity={1} // Modifier l'opacité
              />
            </MapView>
          </View>
          {/* MAP*/}

          {/* title of description*/}
          <View style={styles.description}>
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', color: '#000B33' }}
            >
              Description & compétences
            </Text>
          </View>
          {/* title of description*/}

          {/* bloc scrollView with skills & details of job */}
          <ScrollView style={styles.scrollview}>
            <Text
              style={{
                textAlign: 'center',
                margin: 15,
                fontSize: 15,
                color: '#00F0FF',
              }}
            >
              {offerData.description}
            </Text>

            {/* View skills */}

            {viewSkills}

            {/* View skills */}
          </ScrollView>

          {/* bloc scrollView with skills & details of job */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              height: 70,
            }}
          >
            <View style={styles.buttonView}>
              <Button
                title='Retour'
                buttonStyle={styles.button}
                onPress={() => props.navigation.goBack()}
              />
            </View>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
              }}
              onPress={() => handleClickBlock()}
              //
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>

            <View style={styles.buttonView}>
              <Button
                title='Postuler !'
                buttonStyle={styles.button}
                onPress={() => apply()}
              />
            </View>
          </View>
        </View>
      </SafeAreaProvider>
    )
  )
}

const mapStateToProps = (state) => {
  return {
    blackList: state.blackList,
    userInfo: state.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBlackList: (id) =>
      dispatch({
        type: 'updateBlackList',
        id: id,
      }),
    updateLikes: (id) =>
      dispatch({
        type: 'updateLikes',
        id: id,
      }),
    initialiseApplicationInfo: applications => dispatch({
      type: "initialiseApplicationInfo",
      applicationInfo: applications
    })
    // blockOffer: (id) => {
    //   dispatch({
    //     type: 'blockOffer',
    //     jobOfferId: id,
    //   })
    // },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenOffer)

var colorwhite = 'white'
const styles = StyleSheet.create({
  principal: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flexGrow: 2,
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  title: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000B33',
    borderRadius: 20,
  },
  map: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'grey',
    margin: 5,
    height: '20%',
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    height: 30,
  },
  scrollview: {
    height: '22%',
    backgroundColor: '#000B33',
    borderRadius: 20,
  },
  viewskills: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#00F0FF',
    height: 80,
    margin: 2,
  },
  button: {
    width: 150,
    heigth: 30,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#000B33',
  },
  buttonDelete: {
    width: 30,
    heigth: 30,
    margin: 5,
    borderRadius: 100,
    backgroundColor: 'red',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
})
