import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Pressable,
  ScrollView
} from "react-native";

import { BACKEND_URL } from "@env";

import Accordion from "./Accordion";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const Job = (props) => {
  const [toggled, setToggled] = useState(false);
  const height = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(height, {
      toValue: toggled ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [toggled]);

  const updateJobBackend = async jobToUpdate => {
    const updateSkillReq = await fetch(`${BACKEND_URL}/skills/updateSkills`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `userToken=${props.userInfo.Token}&jobSkills=${JSON.stringify(props.professions.find(prof => prof.job_title === jobToUpdate))}`
    });
    const jobResults = await updateSkillReq.json()
    // initialise or reset job results after updating a skill
    props.initialiseJobOffersInfo(jobResults.offers);
    props.createNotification();
  };

  return (
    <Animated.View
      style={{
        overflow: "hidden",
        display: props.hidden ? "none" : "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom:-5,
        marginLeft:-11,
        marginRight:-11,
        height: height.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 650],
        }),
      }}
    >
      {!toggled ? (
        <TouchableOpacity
          style={[styles.appButtonContainer]}
          onPress={() => {
            setToggled(!toggled);
            props.callback(true, props.k);
          }}
        >
          <Text style={styles.appButtonText}>{props.title}</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              setToggled(!toggled);
              props.callback(false, props.k);
            }}
            style={{
              zIndex: 1,
              borderRadius: 20,
              backgroundColor: "#001150",
              marginTop: 20,
              marginBottom: 20,
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                marginBottom: 20,
                marginTop: 10,
                fontSize: 20,
                textAlign: "center"
              }}
            >
              {props.title}
            </Text>
            <Text 
              style={{
                color: "white",
                marginBottom: 5
              }}>Ce que je sais faire</Text>
            <ScrollView>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#001150",
              }}
            >
              {props.skills.map((skill, i) => {
                return (<Accordion 
                  key={i}
                  job={props.title} 
                  skill={skill.skill_title} 
                  experience={skill.experience}
                  level={skill.level} 
                />);
              })}
            </View>
            </ScrollView>

            <Pressable onPress={() => {
              updateJobBackend(props.title);
              setToggled(!toggled);
              props.callback(false, props.k);
            }}>
              <AntDesign
                name="checkcircle"
                size={60}
                color="white"
                style={{ 
                  justifyContent: "center", 
                  marginTop: 15, 
                  //marginBottom: 10 
                }}
              />
            </Pressable>
          </TouchableOpacity>
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    backgroundColor: "#001150",
    borderRadius: 40,
    width: "100%",
    padding: 7,
  },
  appButtonText: {
    fontSize: 13,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    professions: state.professions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initialiseJobOffersInfo: jobOffers => dispatch({
      type: "initialiseJobOffersInfo",
      jobOffers: jobOffers
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Job);
