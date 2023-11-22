import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  Text,
  Button,
  Image,
  Pressable
} from "react-native";
import React from "react";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 



import { useNavigation } from "@react-navigation/native";

export default function ContractsDetails() {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: width,
        marginTop: 30,
      }}
    >
      <Pressable onPress={() => navigation.goBack()} style={{
        flexDirection: "row",
        backgroundColor: "lightgray",
        width: "100%",
        padding: 10,
        borderRadius: 20,
        margin: 10

      }}>
        <AntDesign name="back" size={24} color="black" />
        <Text style={{marginLeft: 10}}>Back</Text>
      </Pressable>
      <View
        style={{
          height: 100,
          width: width,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome5 name="file-contract" size={60} color="black" />
        <Text style={{ color: "black" }}>Contrat de Travail</Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          width: width,
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <Text style={{ margin: 5 }}>
            {"\n"}
            {"\n"}
            <Text style={styles.title}>Entre les soussignés</Text> {"\n"}
            {"\n"}La société{" "}
            <Text style={styles.text}>
              Nom Entreprise + APE immatriculée SIRET
            </Text>
            dont le siège social se situe à{" "}
            <Text style={styles.text}>Ville</Text> (à compléter), représentée
            par Mme/M.
            <Text style={styles.text}>Nom représentant Légal</Text>, agissant en
            qualité d’employeur.
            {"\n"}Et, Mme/M. <Text style={styles.text}>Nom Salarié </Text> Né(e)
            le
            <Text style={styles.text}> Date de Naissance</Text>, à{" "}
            <Text style={styles.text}>Ville de Naissance</Text> de Nationalité
            Française. Immatriculé(e) à la Sécurité sociale sous le n°
            1234566789. Demeurant à{" "}
            <Text style={styles.text}>Ville habitation</Text>
            D’autre part, Il a été convenu ce qui suit:
            {"\n"}
            {"\n"}​<Text style={styles.title}>Article 1</Text> {"\n"}
            La société <Text style={styles.text}>Nom Société</Text>
            engage Mme/M.
            <Text style={styles.text}>Nom Prénom</Text>, à compter du{" "}
            <Text style={styles.text}>Date début contrat</Text>, sous réserve de
            la visite médicale d’embauche visée à l’article 6 du présent
            contrat, en vue de faire face à un accroissement temporaire de
            l'activité habituelle de l'entreprise découlant :{"\n"}
            <Text style={styles.text}>
              Du retard pris lié à l'épidémie du Covid19
            </Text>
            .{"\n"}Pour l'exercice de son activité, Mme/M.
            {"\n"}sera placé sous l'autorité de Mme/M.
            <Text style={styles.text}>Nom Prénom</Text>, ou de toute autre
            personne qui pourrait être substituée à ce dernier. Il est conclu
            pour une durée de
            <Text style={styles.text}> 1 Mois (30 Jours)</Text>. Le présent
            contrat est régi par les dispositions de la convention collective en
            vigueur dans l’entreprise soit Xy298 et du règlement intérieur en
            vigueur dans l’entreprise dont Mme/M.{" "}
            <Text style={styles.text}> Nom Prénom </Text>déclare avoir pris
            connaissance. {"\n"}
            {"\n"}
            <Text style={styles.title}>Article 2</Text>
            {"\n"}
            {"\n"}
            <Text style={styles.title}>Fonctions et qualifications</Text>
            {"\n"}
            {"\n"}
            Mme/M. <Text style={styles.text}>Nom Prénom</Text> est recruté en
            qualité de <Text style={styles.text}> Développeur Full Stack</Text>{" "}
            , au coefficient <Text style={styles.text}>180</Text>, à temps
            complet, sous réserve de la visite médicale d’embauche visée à
            l’article 6 du présent contrat.{"\n"} Mme/M.
            <Text style={styles.text}>Nom Prénom</Text>
            exercera les fonctions suivantes{" "}
            <Text style={styles.text}>Description annonce</Text>. Ces fonctions
            sont susceptibles d’évolution. La déclaration préalable à l’embauche
            a été effectuée à l’Urssaf de{" "}
            <Text style={styles.text}>Marseille</Text>
            le <Text style={styles.text}>Date du jour</Text>.{"\n"}
            {"\n"}
            <Text style={styles.title}>Article 3</Text>
            {"\n"}
            {"\n"}
            <Text style={styles.title}>Rémunération</Text> {"\n"}
            {"\n"}
            Mme/M. <Text style={styles.text}>Nom Prénom</Text> sera soumis (e) à
            la durée légale du travail applicable dans l’entreprise. Il percevra
            à ce titre une rémunération brute mensuelle de{" "}
            <Text style={styles.text}>3200</Text> €, correspondant à son salaire
            de base et à un taux horaire de 25,00 €. {"\n"}
            {"\n"}
            <Text style={styles.title}>Article 4</Text> {"\n"}
            {"\n"}
            <Text style={styles.title}>Période d'essai</Text> {"\n"}
            {"\n"}
            Le présent contrat est conclu pour une durée déterminée à compter du
            <Text style={styles.text}>Date</Text>, à 9h00 heures. L’engagement
            de Mme/M. <Text style={styles.text}> Nom Prénom </Text>ne deviendra
            définitif qu’à l’issue d’une période d’essai d’une durée de 4 jours,
            au cours de laquelle chacune des parties pourra rompre le contrat à
            tout moment sans indemnité, sous réserve de respecter les délais de
            prévenance légalement prévus. Nota : Sauf dispositions
            conventionnelles contraires, la période d’essai des contrats CDD est
            calculée à raison d'un jour (ouvré) d'essai par semaine de travail.
            Pour les CDD d’une durée de 6 mois au plus, la période d’essai ne
            peut excéder 2 semaines. Pour les CDD d’une durée supérieure à 6
            mois, la limite est fixée à 1 mois.{"\n"}
            {"\n"}
            <Text style={styles.title}>Article 5</Text> {"\n"}
            {"\n"}
            <Text style={styles.title}>Lieu de Travail</Text> {"\n"}
            {"\n"}Le lieu de travail est situé à{" "}
            <Text style={styles.text}> Nom Prénom </Text>. Toutefois, en
            fonction des nécessités du service, la société se réserve le droit
            de demander à Mme/M. ______________________d’effectuer des
            déplacements ponctuels n’entraînant pas de changement de résidence.
            {"\n"}
            {"\n"}
            <Text style={styles.title}>Article 6</Text> {"\n"}
            {"\n"}
            <Text style={styles.title}>Visite Médicale d'embauche</Text>
            {"\n"}
            {"\n"}
            Mme/M. sera soumis(e) à une visite médicale d’embauche, avant
            l’expiration de sa période d’essai par les services de santé au
            travail en vigueur dans l’entreprise.{"\n"}
            {"\n"}
            <Text style={styles.title}>Article 7</Text> {"\n"}
            {"\n"}
            <Text style={styles.title}>Horaire de travail</Text> {"\n"}
            {"\n"}
            Mme/M. ______________________ exercera son activité selon les
            horaires de travail suivants : Lundi De ________ heures à __________
            puis de _______ heures à __________ heures. Mardi De ________ heures
            à __________ puis de _______ heures à __________ heures. Mercredi De
            ________ heures à __________ puis de _______ heures à __________
            heures. Jeudi De ________ heures à __________ puis de _______ heures
            à __________ heures. Vendredi De ________ heures à __________ puis
            de _______ heures à __________ heures. Ces horaires sont
            susceptibles de modification ultérieure de la part de la direction,
            dans le respect d’un délai de prévenance de _____________ jours. Il
            pourra être demandé à Mme/M. ______________________ d’effectuer des
            heures supplémentaires qui seront rémunérées selon les conditions
            légales (ou conventionnelles ou selon un accord collectif).{"\n"}
            {"\n"}
            <Text style={styles.title}>Article 8</Text> {"\n"}
            {"\n"}
            <Text style={styles.title}>Congé payé</Text> {"\n"}
            {"\n"}Mme/M. ______________________ bénéficiera de droits à congés
            payés prévus par les articles L 3141-1 et suivants du Code du
            travail. Le nombre de jours de congés payés acquis étant au maximum
            de 30 jours ouvrables (ou de 25 jours ouvrés). La période de
            référence est fixée du 1er juin au 31 mai de l’année suivante
            (indiquer éventuellement une période différente, si elle est en
            vigueur dans l’entreprise). Les dates de prise de ces congés seront
            déterminées en accord avec la société, en fonction des nécessités du
            service. Si au terme du contrat, le salarié se trouve dans
            l’impossibilité d’utiliser la globalité des congés payés acquis, il
            bénéficiera alors du paiement d'une indemnité compensatrice de
            congés payés lors de son départ de l’entreprise.{"\n"}
            {"\n"}
            <Text style={styles.title}>Article 9</Text> {"\n"}
            {"\n"}
            <Text style={styles.title}>Maladie ou A.T.</Text> {"\n"}
            {"\n"} En cas d’arrêt de travail pour maladie ou suite à un accident
            du travail, Mme/M. ______________________ s’engage à communiquer à
            la société son arrêt de travail dans un délai de ________________
            jours. {"\n"}
            {"\n"}
            <Text style={styles.title}>Article 10</Text> {"\n"}
            {"\n"}
            <Text style={styles.title}>Frais professionnels</Text> {"\n"}
            {"\n"}Les frais professionnels que Mme/M. ______________________
            engageraient dans l'exercice de ses fonctions lui seront remboursés
            sur présentation des justificatifs. {"\n"}
            {"\n"}
            <Text style={styles.title}>Article 11</Text> {"\n"}
            {"\n"}
            <Text style={styles.title}>Indemnité de fin de contrat</Text> {"\n"}
            {"\n"}
            Au terme de son contrat, Mme/M. ______________________ percevra une
            indemnité de fin de contrat aux conditions légales en vigueur, soit
            un taux de 10%, sur l’ensemble des rémunérations brutes versées
            durant le contrat. (Indiquer éventuellement un taux de 6% si
            l’entreprise applique ce taux, sous réserve des obligations légales
            qui en découlent). {"\n"}
            {"\n"}
            <Text style={styles.title}>Article 12</Text> {"\n"}
            {"\n"}
            <Text style={styles.title}>Renouvellement</Text> {"\n"}
            {"\n"}Le présent contrat pourra faire l'objet d'un renouvellement
            formalisé par l'accord des parties, sous réserve de l’accord exprès
            du salarié. {"\n"}
            {"\n"}
            <Text style={styles.title}>Article 13</Text> {"\n"}
            {"\n"}
            <Text style={styles.title}>
              Affiliation caisse de retraite complémentaire
            </Text>{" "}
            {"\n"}
            {"\n"}
            Mme/M. ______________________ sera affilié auprès de(s) caisse(s) de
            retraite suivante (s) ________________ (à compléter en indiquant nom
            précis de la(les) caisse(s) retraite complémentaire). {"\n"}
            {"\n"}
            <Text style={styles.title}>Article 14</Text> {"\n"}
            {"\n"}
            <Text style={styles.title}>Prévoyance</Text> {"\n"}
            {"\n"}Mme/M. ______________________ sera affilié auprès de la
            prévoyance prévue par _______________ (à compléter par convention
            collective, accord collectif, etc.) dont le nom est
            _____________________ (à compléter en indiquant nom précis de la
            prévoyance). {"\n"}
            {"\n"}Fait en deux exemplaires à ________________, le
            ________________ {"\n"}
            {"\n"}Signature de l’employeur
            {"\n"}
            {"\n"}
            <View>
              <Image
                resizeMode="contain"
                source={require("../assets/logoPear.png")}
                style={{ width: 140, height: 100 }}
              />
            </View>
          </Text>
          <View
            style={{
              width: 300,
              height: 40,
              backgroundColor: "#000B33",
              borderRadius: 20,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              buttonStyle={{
                backgroundColor: `#000B33`,
                width: 300,
                height: 40,
                borderRadius: 20,
              }}
              containerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              title="SIGNATURE ELECTRONIQUE"
              color="white"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000B33",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000B33",
    fontSize: 15,
  },
});
