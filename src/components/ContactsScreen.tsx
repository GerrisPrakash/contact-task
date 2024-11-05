import { Button, FlatList, Text, View } from "react-native";
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
            data.forEach(async (contact) => {
              if (contact.name && contact.phoneNumbers?.[0]?.number) {
                await database.write(async () => {
                  await contactsCollection.create((contacts) => {
                    contacts.name = contact.name;
                    contacts.number = contact.phoneNumbers?.[0]?.number;
                  });
                });
              }
            });
          }
        }
      }
      contactsFromDB = await contactCollection.query().fetch();
      setContacts(contactsFromDB)
    })();
  }, [contacts]);
  console.log(contacts)
  return (
    <FlatList
      data = {contacts}
      renderItem={({item,index}) => <ContactCards contact= {item} index={index}/>}
     />
  );
}
