import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedContact } from "../store/contactSlice";
import { useRouter } from "expo-router";
export default function ContactCards(props) {
  const dispatch = useDispatch()
  useEffect(()=>{
    if(props.index === 0){
      dispatch(setSelectedContact(props.contact))
    }
  },[])
  const setContact = () =>{
    dispatch(setSelectedContact(props.contact))
    router.push('/ContactDetail');
  }
  const router = useRouter()
  return (
    // <TouchableOpacity>
    <TouchableOpacity onPress={setContact} style={Styles.cardContainer}>
      <FontAwesome name="user-circle-o" size={55} color="black" />
      <View style={Styles.TextContainer}>
        <Text style={Styles.primaryText}>{props.contact.name}</Text>
        <Text style={Styles.secondaryText}>{props.contact.number}</Text>
        {/* <Text>{props.index}</Text> */}
      </View>
    </TouchableOpacity>
    // </TouchableOpacity>
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
