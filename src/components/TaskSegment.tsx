import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { contactsCollection } from "../db";
import { Q } from "@nozbe/watermelondb";
import { useDispatch } from "react-redux";
import { setSelectedContact } from "../store/contactSlice";
import { useRouter } from "expo-router";
import { withObservables } from "@nozbe/watermelondb/react";

function TaskSegment({to}) {
    const dispatch = useDispatch()
    const router = useRouter()
    const setContactDetail = async() =>{
        const contact = await contactsCollection.query(Q.where('number', to.number)).fetch()
        dispatch(setSelectedContact(contact[0]))
        router.push('/ContactDetail');

        // console.log("scr", contact.length)r
    }
   return (
    <TouchableOpacity onPress={setContactDetail} style={Styles.cardContainer}>
      <View style={Styles.TextContainer}>
        <Text style={Styles.primaryText}>{to.todo}</Text>
        <Text style={Styles.secondaryText}>NAME: {to.name}</Text>
        {/* <Text>{JSON.stringify(to.created_at)}aa{to.updated_at}</Text> */}
      </View>
    </TouchableOpacity>
  );
}

const enhance = withObservables([], ({to}:any) => ({
    to: to.observe()
}))

export default enhance(TaskSegment)

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
