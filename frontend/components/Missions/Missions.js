import { 
  StyleSheet, 
  Text,
  View, 
  ScrollView,
  Modal,
  Pressable,
  Vibration
} from "react-native";
import React, { useEffect, useState } from "react";
import { Badge } from "react-native-elements";
import { BACKEND_URL } from "@env";

import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";



import AccordionMission from "./AccordionMission";

import { connect } from "react-redux";

function Missions(props) {

  const [notification, setNotification] = useState(false);
  const [missionList, setMissionList] = useState(null);


  useEffect(() => {
    setMissionList([
      {
        title: "Candidatures",
        icon: (
          <MaterialCommunityIcons
            name="file-document-edit"
            size={40}
            color="#B9FFFF"
          />
        ),
        notifications: props.applications.length,
        items: props.applications.map(application => {
          let offer = props.jobOffers.find(offer => offer._id === application.offerId);
          let stage;
          if (application.employerResponse) {
            stage = 4;
            Vibration.vibrate(800);
            setNotification(true);
            props.addUpcomingMission(offer);
          }
          else if (application.employerStudying) stage = 3;
          else if (application.employerRead) stage = 2;
          else stage = 1;
          return {
            companyName: offer.company.name,
            companyLogo: offer.company.logo,
            jobTitle: offer.title,
            dateSent: new Date(offer.start_date).toLocaleDateString("fr-FR"),
            timeSent: new Date(offer.start_date).toLocaleTimeString("fr-FR"),
            stage: stage
          }
        }),
      },
      {
        title: "Offres reçues",
        icon: <Ionicons name="contract" size={40} color="#B9FFFF" />,
        notifications: 0,
        items: [],
      },
      {
        title: "Missions à venir",
        icon: <FontAwesome5 name="business-time" size={40} color="#B9FFFF" />,
        notifications: props.upcomingMissions.length,
        items: props.upcomingMissions.map(mission => {
          return {
            companyName: mission.company.name,
            companyLogo: mission.company.logo,
            jobTitle: mission.title,
            dateSent: new Date(mission.start_date).toLocaleDateString("fr-FR"),
            timeSent: new Date(mission.start_date).toLocaleTimeString("fr-FR"),
            stage: 0
          }
        }),
      },
      {
        title: "Missions archivées",
        icon: <FontAwesome name="archive" size={40} color="#B9FFFF" />,
        notifications: 0,
        items: [],
      },
    ])
  }, [props.applications])

  const proceedApplication = async () => {
    const applicationRaw = await fetch(`${BACKEND_URL}/userInfo/proceedApplication`, {
      method: "POST",
      headers: { "Content-Type" : "application/x-www-form-urlencoded" },
      body: `token=${props.userInfo.Token}`
    });
    const applicationRes = await applicationRaw.json();
    props.updateApplication(applicationRes.application);
  };

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
        <Pressable onPress={() => {
          props.change("MyDocuments");
          setNotification(!notification);
        }}>
          <View
            style={styles.exitInfoNotif}
            >
            <Feather name='x-circle' size={18} color='gray' />
          </View>
          <View style={{flexDirection: "row"}}>
            <Ionicons name="notifications-sharp" size={30} color="#4CA6A8" />
            <Text style={styles.modalText}>Felicitations !!! 🎉🥳 On vous a offert un emploi ! Maintenant pour signer le contrat ... <Text style={styles.linkText}>Ammene moi</Text></Text>
          </View>
        </Pressable>
      </View>
    </View>
  </Modal>

  return (
    <ScrollView style={styles.body}>
      {notificationModal}
      <View style={styles.container}>
        <Pressable style={{alignItems: "center"}} onPress={() => proceedApplication()}>
          <Feather name="briefcase" size={60} color="#B9FFFF" />
          <Text style={styles.textTitle}>Mes Missions</Text>
        </Pressable>
        <View style={styles.missionOptions}>
          {missionList && missionList.map((missionOption, index) => {
            return (
              <AccordionMission
                key={index}
                text={missionOption.title}
                icon={missionOption.icon}
                notifications={missionOption.notifications}
                items={missionOption.items}
                isAMission={missionOption.title === "Missions à venir"}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#000b33",
  },
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
  missionOptions: {
    marginTop: 30,
    flex: 1,
    width: "100%",
  },
  textTitle: {
    color: "#B9FFFF",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
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
    fontSize: 13,
    paddingTop: 2,
    color: "#000B33"
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline"
  },
  exitInfoNotif: {
    position: 'absolute',
    top: 5,
    right: -5
  },
});

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    jobOffers: state.jobOffers,
    upcomingMissions: state.upcomingMissions,
    applications: state.applications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateApplication: application => dispatch({
      type: "updateApplication",
      application: application
    }),
    addUpcomingMission: offer => dispatch({
      type: "addUpcomingMission",
      offer: offer
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Missions);
