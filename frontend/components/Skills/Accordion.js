import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Pressable
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux'

const Accordion = (props) => {
  const [toggled, setToggled] = useState(false);
  const height = useRef(new Animated.Value(1)).current


  useEffect(() => {
    Animated.timing(height, {
      toValue: toggled ? 1 : 0,
      duration: 400,
      useNativeDriver: false
    }).start()
  }, [toggled])


  
  return (
    <TouchableOpacity onPress={() => setToggled((prev) => !prev)}>
      <Animated.View
        style={{
          backgroundColor: '#B9FFFF',
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          marginTop: 10,

          height: height.interpolate({
            inputRange: [0, 1],
            outputRange: [35, 220],
          }),
        }}
      >
        {!toggled ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 15 }}>
                {props.skill}
              </Text>
            </View>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {new Array(6).fill().map((el,i) => {
                return (
                  props.experience + props.level > i ? 
                  <AntDesign key={i} name="star" size={20} color="#FF9087" /> : 
                  <AntDesign key={i} name="staro" size={20} color="#FF9087" />
                );
              })}
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Text>{props.skill}</Text>
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                textAlign: "center"
              }}
            >
              C’est une compétence que j’utilise professionnellement depuis
            </Text>
            <View
              style={{
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                flex: 1,
                marginTop: 5,
                width: "100%",
              }}
            >
              <Pressable onPress={() => {
                props.updateSkillExperience(props.job, props.skill, 1)
              }}>
                <View style={{alignItems: "center"}}>
                  <Text style={{fontSize: 10, marginBottom: 4}}> Moins d’un an </Text>
                  {props.experience > 0 ? 
                  <AntDesign name="star" size={20} color="#FF9087" /> : 
                  <AntDesign name="staro" size={20} color="#FF9087" />}
                </View>
              </Pressable>
              <Pressable onPress={() => {
                props.updateSkillExperience(props.job, props.skill, 2)
              }}>
                <View style={{alignItems: "center"}}>
                  <Text style={{fontSize: 10, marginBottom: 4}}>Entre 1 et 3 ans</Text>
                  {props.experience > 1 ? 
                    <AntDesign name="star" size={20} color="#FF9087" /> : 
                    <AntDesign name="staro" size={20} color="#FF9087" />}
                </View>
              </Pressable>
              <Pressable onPress={() => {
                props.updateSkillExperience(props.job, props.skill, 3)
              }}>
                <View style={{alignItems: "center"}}>
                  <Text style={{fontSize: 10, marginBottom: 4}}>Plus de 3 ans</Text>
                  {props.experience > 2 ? 
                    <AntDesign name="star" size={20} color="#FF9087" /> : 
                    <AntDesign name="staro" size={20} color="#FF9087" />}
                </View>
              </Pressable>
            </View>

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                textAlign: "center",
                marginTop: 20
              }}
            >
              Dans ce domaine je suis plutôt
            </Text>
            <View
              style={{
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                flex: 1,
                marginTop: 5,
                marginBottom: 20,
              }}
            >
              <Pressable onPress={() => {
                props.updateSkillLevel(props.job, props.skill, 1)
              }}>
                <View style={{alignItems: "center"}}>
                  <Text style={{fontSize: 10, marginBottom: 4}}> Débutant</Text>
                  {props.level > 0 ? 
                    <AntDesign name="star" size={20} color="#FF9087" /> : 
                    <AntDesign name="staro" size={20} color="#FF9087" />}
                </View>
              </Pressable>
              <Pressable onPress={() => {
                props.updateSkillLevel(props.job, props.skill, 2)
              }}>
                <View style={{alignItems: "center"}}>
                  <Text style={{fontSize: 10, marginBottom: 4}}>A l’aise</Text>
                  {props.level > 1 ? 
                    <AntDesign name="star" size={20} color="#FF9087" /> : 
                    <AntDesign name="staro" size={20} color="#FF9087" />}
                </View>
              </Pressable>
              <Pressable onPress={() => {
                props.updateSkillLevel(props.job, props.skill, 3)
              }}>
                <View style={{alignItems: "center"}}>
                  <Text style={{fontSize: 10, marginBottom: 4}}>Expert</Text>
                  {props.level > 2 ? 
                    <AntDesign name="star" size={20} color="#FF9087" /> : 
                    <AntDesign name="staro" size={20} color="#FF9087" />}
                </View>
              </Pressable>
            </View>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateSkillExperience: (job_title, skill_title, experience) => {
      dispatch({
        type: "updateSkillExperience",
        job: job_title,
        skill: skill_title,
        experience: experience
      })
    },
    updateSkillLevel: (job_title, skill_title, level) => {
      dispatch({
        type: "updateSkillLevel",
        job: job_title,
        skill: skill_title,
        level: level
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Accordion);
