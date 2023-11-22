import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { useDisclose, Center } from 'native-base'
import { Button } from 'react-native-elements'
import { BACKEND_URL } from '@env'
import { useNavigation } from '@react-navigation/native'

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import OfferCard from './OfferCard'
import { connect } from 'react-redux'

function MyLikes(props) {
  const isFocused = useIsFocused()
  //variable d'état pour récupérer la liste des offres
  const [offersList, setOffersList] = useState(null)
  const { height, width } = useWindowDimensions()
  const navigation = useNavigation()

  //fetch pour récupérer les infos en BDD

  useEffect(() => {
    const findOffers = async () => {
      // console.log(isFocused);
      if (isFocused) {
        const data = await fetch(
          `${BACKEND_URL}/offers/displayLikeOffer?token=${props.userInfo.Token}`
        )
        const body = await data.json()
        setOffersList(body.offers)
      }
    }
    findOffers()
  }, [isFocused, props.likes])

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
      <ScrollView
        style={{
          flex: 1,
          width: width,
        }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {offersList &&
          offersList.map((offer, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  navigation.navigate('ScreenOffer', {
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
  header: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: colorwhite,
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
    likes: state.likes,
  }
}
export default connect(mapStateToProps, null)(MyLikes)
