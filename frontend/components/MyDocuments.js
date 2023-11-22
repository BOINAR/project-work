import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MyContracts from "./MyContracts";
import MyPayslips from "./MyPayslips";
import MyOtherDocuments from "./MyOtherDocuments";
import MyWorkCertificates from "./MyWorkCertificates";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function MyDocuments(props) {
  const [screen, setScreen] = useState(null);

  if (screen == "MyContracts") return <MyContracts />;
  else
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",

          alignItems: "center",
        }}
      >
        <IconFontAwesome
          name="file-text-o"
          color="white"
          size={50}
          style={{ marginTop: 100, marginBottom: -30, color: "#000B33" }}
        />
        <Text style={{ marginTop: 50, marginBottom: 100, color: "#000B33" }}>
          Mes Documents
        </Text>
        <View style={{ justifyContent: "flex-start", width: "80%" }}>
          <Pressable
            onPress={() => {
              setScreen("MyContracts");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                color: "#000B33",
                marginBottom: 20,
              }}
            >
              <IconFontAwesome name="file-pdf-o" size={50} />
              <Text style={{ marginLeft: 50, textAlignVertical: "center" }}>
                Mes contrats de travail
              </Text>
            </View>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              color: "#000B33",
              marginBottom: 20,
            }}
          >
            <IconFontAwesome name="file-pdf-o" size={50} />
            <Text
              style={{
                marginLeft: 50,
                textAlignVertical: "center",
              }}
            >
              Mes bulletins de salaire
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              color: "#000B33",
              marginBottom: 20,
            }}
          >
            <IconFontAwesome name="file-pdf-o" size={50} />
            <Text
              style={{
                marginBottom: 20,
                marginLeft: 50,
                textAlignVertical: "center",
              }}
            >
              Mes certificats de travail
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", color: "#000B33", marginBottom: 20 }}
          >
            <IconFontAwesome name="file-pdf-o" size={50} />
            <Text
              style={{
                marginBottom: 20,
                marginLeft: 50,
                textAlignVertical: "center",
              }}
            >
              Autres documents
            </Text>
          </View>
        </View>
      </View>
    );
}
