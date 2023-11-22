import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { useDisclose, Center, Column } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  View,
  Text,
  Image,
} from 'react-native'
import OfferCard from './OfferCard'
import ScreenOffer from './ScreenOffer'
import { BACKEND_URL } from '@env'

function ListOffersScreen(props) {
  const isFocused = useIsFocused()
  //variable d'état pour récupérer la liste des offres
  const [offersList, setOffersList] = useState(null)
  const { height, width } = useWindowDimensions()
  const { isOpen, onOpen, onClose } = useDisclose()

  //fetch pour récupérer les infos en BDD
  console.log('token ds listoffer', props.userInfo.token)
  console.log('offersList ds listoffer', offersList)

  useEffect(() => {
    const findOffers = async () => {
      const data = await fetch(
        `${BACKEND_URL}/offers/listOffers?token=${props.userInfo.Token}`
      )
      const body = await data.json()
      setOffersList(body.offers)
    }
    findOffers()
  }, [isFocused, props.blackList, props.likes])

  // console.log("titre annonce : ", screenDisplay.title);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        marginTop: 30,
      }}
    >
      <View
        style={{
          height: 100,
          width: width,
          backgroundColor: '#000B33',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons
          name='text-box-search-outline'
          size={60}
          color='#B9FFFF'
        />
        <Text style={{ color: 'white' }}>Liste annonces</Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          width: width,
        }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {/* filter avant le map des annonces */}
        {offersList &&
          offersList.map((offer, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  console.log('offer._id sur touchableopacity', offer._id)
                  props.navigation.navigate('ScreenOffer', {
                    offerId: offer._id,
                  })
                }}
              >
                <OfferCard key={i} offer={offer} />
              </TouchableOpacity>
            )
          })}
      </ScrollView>
    </SafeAreaView>
  )
}

var colorwhite = 'white'
const styles = StyleSheet.create({
  principal: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flexGrow: 2,
  },
  header1: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'blue',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  title: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: '#000B33',
  },
  map: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'grey',
    margin: 5,
    height: '20%',
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    height: 40,
  },
  scrollview: {
    height: '22%',
    backgroundColor: '#000B33',
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
    borderRadius: 20,
    backgroundColor: '#000B33',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 20,
  },
})

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    professions: state.professions,
    jobOffers: state.jobOffers,
    blackList: state.blackList,
    likes: state.likes,
  }
}
export default connect(mapStateToProps, null)(ListOffersScreen)
