import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
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
  const [contacts, setContacts] = useState<any>([]);
  const [accessDenied, setAccessDenied] = useState<boolean>(false);

  //fetch contacts from expo contacts and store in db , it will fetch from expo contacts only one time
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
  }, []);
  const [searchQuery, setSearchQuery] = useState("");

  //run search querry on every text change and update into state variable
  useEffect(() => {
    (async () => {
      const contactsFromDB = await contactsCollection.query().fetch();
      if (searchQuery.length > 0) {
        const filteredContacts = contactsFromDB.filter((tod) => {
          return (
            tod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tod.number.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });
        setContacts(filteredContacts);
      } else {
        setContacts(contactsFromDB);
      }
    })();
  }, [searchQuery]);

  return (
    <>
      {accessDenied ? (
        <Modal visible={accessDenied}>
          <View style={styles.accessDenied}>
            <Text style={styles.text}>
              Go to Settings {">"} contact-task {">"} Contacts and toggle to
              allow access.
            </Text>
          </View>
        </Modal>
      ) : (
        <View>
          <TextInput
            style={styles.search}
            placeholder="Search Contact"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <FlatList
            data={contacts}
            renderItem={({ item, index }) => (
              <ContactCards contact={item} index={index} />
            )}
          />
        </View>
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
    margin: 20,
  },
  text: {
    marginVertical: 20,
    fontSize: 18,
  },
  search: {
    backgroundColor: "white",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 200,
    margin: 15,
    height: 50,
    paddingHorizontal: 30,
  },
});
