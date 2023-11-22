import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import { Button } from "react-native-elements";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react/cjs/react.production.min";

import { useNavigation } from "@react-navigation/native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export default function MyContracts(props) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",

        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginTop: 70,
          marginBottom: -200,
          color: "#000B33",
        }}
      >
        Mes contrats de travail
      </Text>
      <View>
        <Button
          onPress={() => {
            navigation.navigate("ContractsDetails");
          }}
          buttonStyle={{
            backgroundColor: `#66cdaa`,
            width: deviceWidth * 0.9,
            marginTop: 220,
            borderRadius: 20,

            height: 100,
          }}
          containerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Facebook- CDD du 1 Mai au 2022 au 31 Mai - En cours"
        />
      </View>
    </View>
  );
}
