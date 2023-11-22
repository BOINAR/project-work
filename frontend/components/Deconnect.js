import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Deconnect(props) {
  useEffect(() => {
    const clearStorage = async () => {
      AsyncStorage.removeItem("token")
    }
    clearStorage();
    props.deleteUserInfo()
    props.navigation.navigate('Welcome1')
  })
  return null;
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUserInfo: () => {
      dispatch({
        type: 'deleteUserInfo',
      })
    },
  }
}

export default connect(null, mapDispatchToProps)(Deconnect)