import { Button, FlatList, Modal, StyleSheet, Text, View } from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import database, { contactsCollection } from "../db";
// import ContactCard from "../components/ContactCard";
import ContactCards from "./ContactCard";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedContact } from "../store/contactSlice";
import { RootState } from "../store/store";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [accessDenied, setAccessDenied] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const contactCollection = database.get("contacts");
      let contactsFromDB = await contactCollection.query().fetch();

      if (contactsFromDB.length === 0) {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [
              Contacts.Fields.Emails,
              Contacts.Fields.PhoneNumbers,
              Contacts.Fields.Image,
            ],
          });

          if (data.length > 0) {
            await database.write(async () => {
              data.forEach(async (contact, index) => {
                if (contact.name && contact.phoneNumbers?.[0]?.number) {
                  await contactsCollection.create((contacts) => {
                    contacts.name = contact.name;
                    contacts.number = contact.phoneNumbers?.[0]?.number;
                  });
                }
                if (index === data.length - 1) {
                  console.log("completed");
                }
              });
            });
          }
        } else {
          setAccessDenied(true);
        }
      }
      contactsFromDB = await contactCollection.query().fetch();
      setContacts(contactsFromDB);
    })();
  }, [contacts]);
  return (
    <>
      {accessDenied ? (
        <Modal visible={accessDenied}>
          <View  style={styles.accessDenied}>
            <Text style={styles.text}>
            Go to Settings {">"} contact-task {">"} Contacts and toggle to allow access.
            </Text>
          </View>
        </Modal>
      ) : (
        <FlatList
          data={contacts}
          renderItem={({ item, index }) => (
            <ContactCards contact={item} index={index} />
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  accessDenied: {
    flex: 1, // Makes the view take up the full screen
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red", // Optional background color
    margin: 20
  },
  text:{
    marginVertical: 20,
    fontSize:18
  }
});
