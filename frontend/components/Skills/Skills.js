// Example of Searchable Dropdown / Picker in React Native
// https://aboutreact.com/example-of-searchable-dropdown-picker-in-react-native/

// import React in our code
import React, { useState, useEffect } from 'react'

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Button,
  TouchableOpacity,
  Pressable,
  Vibration
} from 'react-native'
import { BACKEND_URL } from '@env'

import Job from './Job'

import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'; 

import { Center } from 'native-base'
// import SearchableDropdown component
import SearchableDropdown from 'react-native-searchable-dropdown'

import { connect } from 'react-redux'


const Skills = (props) => {
  const [notification, setNotification] = useState(false);
  const [infoDisplay, setInfoDisplay] = useState(true);
  const [serverData, setServerData] = useState([]);
  const [dropDownList, setDropDownList] = useState([]);
  const [selectedItems, setSelectedItems] = useState(props.userSkills);
  const [hiddenJobs, setHiddenJobs] = useState(props.userSkills.map(job => false));
  // const [jData, setJobData] = useState([]);

  useEffect(() => {
      const fetchingSkills = async () => {
        const rawData = await fetch(`${BACKEND_URL}/skills`)
        const dataJSON = await rawData.json();
        setServerData(dataJSON.skills);
        setDropDownList(dataJSON.skills.map((el,i) => { return {id: i, name: el.job_title}}));
      }
    fetchingSkills();
  }, []);

  const addbuttonHandler = async (item) => {
  
    const newObj = serverData.find((el) => el['job_title'] === item['name'])
    const newJobSkills = {
      job_title: newObj.job_title, 
      skills: newObj.skills.map(skill => {
        return {
          skill_title: skill,
          experience: 0,
          level: 0
        }
      })
    };
    setSelectedItems([newJobSkills, ...selectedItems])
    // add new skill to redux
    props.addNewSkill(newJobSkills)

    
    // envoyer au backend un nouveau skill pour enregistrer
    await fetch(`${BACKEND_URL}/skills/newSkill`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded"},
      body: `jobTitleFromFront=${newObj.job_title}&skillsFromFront=${newObj.skills}&userToken=${props.userInfo.Token}`
    });
  }

  const hideJobs = (bool, key) => {
    let hiddenJobsCopy = [...hiddenJobs];
    if (bool) {
      setHiddenJobs(hiddenJobsCopy.map((el,i) => {
        if (key === i) return false;
        else return true;
      }))
    } else {
      setHiddenJobs(hiddenJobsCopy.map(el => false));
    }
  }

  const addNotif = () => {
    setNotification(true);
    Vibration.vibrate(800);
  }

  const notificationModal = <Modal
    animationType="slide"
    transparent={true}
    visible={notification}
    onRequestClose={() => {
      setNotification(!notification);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Pressable onPress={() => setNotification(!notification)}>
          <View
            style={styles.exitInfoNotif}
            >
            <Feather name='x-circle' size={18} color='gray' />
          </View>
          <View style={{flexDirection: "row"}}>
            <Ionicons name="notifications-sharp" size={30} color="#4CA6A8" />
            <Text style={styles.modalText}>Vous avez des offres qui corresponds a votre profil ! Allez les verifier dans ListOffers</Text>
          </View>
        </Pressable>
      </View>
    </View>
  </Modal>

  return (
    <SafeAreaView style={styles.container}>
      {notificationModal}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <MaterialCommunityIcons name='lightning-bolt' size={60} color='black' />
        <Text style={{ fontWeight: 'bold' }}>Métiers & Compétence</Text>
      </View>

      {infoDisplay && (
        <View style={styles.infoContainer}>
          <Pressable
            onPress={() => setInfoDisplay(false)}
            style={styles.exitInfo}
          >
            <Feather name='x-circle' size={24} color='gray' />
          </Pressable>
          <Image
            style={styles.infoManIcon}
            source={require('../../assets/info_man_icon.png')}
          />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infotext1}>
              En répondant aux questions du formulaire ci-dessous, vos critères
              de recherche vont s'affiner automatiquement.
            </Text>
            <Text style={styles.infotext2}>
              Si vous avez importé votre CV, certaines informations sont déjà
              replies!
            </Text>
          </View>
        </View>
      )}

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text style={styles.titleText}>Quel métier recherchez-vous ?</Text>
      </View>

      <SearchableDropdown
        multi={true}
        onTextChange={(text) => console.log(text)}
        onItemSelect={(item) => {
          addbuttonHandler(item)
        }}
        containerStyle={{
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 10,
          width: '100%',
        }}
        textInputStyle={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          backgroundColor: '#FAF7F6',
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#FAF9F8',
          borderColor: '#bbb',
          borderWidth: 1,
        }}
        itemTextStyle={{
          // Text style of a single dropdown item
          color: '#222',
        }}
        itemsContainerStyle={{
          // Items container style you can pass maxHeight
          // To restrict the items dropdown hieght
          maxHeight: '50%',
        }}
        items={dropDownList}
        // Mapping of item arrayskills.
        defaultIndex={2}
        // Default selected item index
        placeholder='Cherchez un métier ...'
        // Place holder for the search input
        resetValue={false}
        // Reset textInput Value with true and false state
        underlineColorAndroid='transparent'
        // To remove the underline from the android input
      />
      <View style={styles.jobResults}>
        {selectedItems.map((item, key) => {
          return (
            <Job 
              key={key}
              k={key} 
              title={item.job_title} 
              skills={item.skills} 
              hidden={hiddenJobs[key]}
              callback={hideJobs}
              createNotification={addNotif}
            />
          );
        })}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
  appButtonContainer: {
    elevation: 5,
    backgroundColor: '#000B33',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 5,
    marginBottom: 4,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f3fcfe',
    borderRadius: 23,
    width: '90%',
    paddingTop: 27,
    paddingBottom: 20,
  },
  infoTextContainer: {
    flex: 1,
    padding: 5,
  },
  infoManIcon: {
    width: 92,
    height: 92,
    marginLeft: 7,
  },
  exitInfo: {
    position: 'absolute',
    top: 5,
    right: 8,
  },
  exitInfoNotif: {
    position: 'absolute',
    top: 5,
    right: -5
  },
  infotext1: {
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 10,
  },
  infotext2: {
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'italic',
  },
  jobResults: {
    flex: 1,
    width: "90%",
    marginBottom: 80,
    justifyContent: 'flex-end',
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 5
  },
  modalView: {
    backgroundColor: '#B9FFFF',
    borderRadius: 20,
    padding: 10,
    width: "95%",
    alignContent: "center",
    borderWidth: 2,
    borderColor: "#FFFDC7",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    flex: 1,
    flexWrap: "wrap",
    textAlign: 'center',
    fontSize: 12,
    paddingTop: 2,
    color: "#000B33"
  },
})

const mapStateToProps = state => {
  return {
    userSkills: state.professions,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewSkill: newSkill => dispatch({
      type: "addNewSkill", newSkill: newSkill
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills)