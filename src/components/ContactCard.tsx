import { Text, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export default function ContactCards(props) {
  return (
    <View style={Styles.cardContainer}>
      <FontAwesome name="user-circle-o" size={55} color="black" />
      <View style={Styles.TextContainer}>
        <Text style={Styles.primaryText}>{props.contact.name}</Text>
        <Text style={Styles.secondaryText}>{props.contact.number}</Text>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    marginHorizontal: 14,
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    padding: 10
  },
  TextContainer: {
    marginLeft:12
  },
  primaryText: {
    fontSize: 18
  },
  secondaryText: {
    fontSize: 14
  },
});
