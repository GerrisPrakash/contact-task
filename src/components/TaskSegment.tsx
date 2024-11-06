import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { contactsCollection } from "../db";
import { Q } from "@nozbe/watermelondb";
import { useDispatch } from "react-redux";
import { setSelectedContact } from "../store/contactSlice";
import { useRouter } from "expo-router";

export default function TaskSegment(props) {
    const dispatch = useDispatch()
    const router = useRouter()
    const setContactDetail = async() =>{
        const contact = await contactsCollection.query(Q.where('number', props.to.number)).fetch()
        dispatch(setSelectedContact(contact[0]))
        router.push('/ContactDetail');

        // console.log("scr", contact.length)r
    }
   return (
    <TouchableOpacity onPress={setContactDetail} style={Styles.cardContainer}>
      <View style={Styles.TextContainer}>
        <Text style={Styles.primaryText}>TASK: {props.to.todo}</Text>
        <Text style={Styles.secondaryText}>NAME: {props.to.name}</Text>
        {/* <Text>{props.index}</Text> */}
      </View>
    </TouchableOpacity>
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
    padding: 10,
  },
  TextContainer: {
    marginLeft: 12,
  },
  primaryText: {
    fontSize: 18,
  },
  secondaryText: {
    fontSize: 14,
  },
  emptyScreen: {
    height: "100%",
  },
  emptyScreenText: {
    marginVertical: "auto",
    marginHorizontal: 10,
    fontSize: 20,
    textAlign: "center",
  },
});
