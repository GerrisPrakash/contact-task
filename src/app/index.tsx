import { Text, View } from "react-native";
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from "react";
import { Link } from "expo-router";

export default function HomeScreen() {
  const [contacts,setContacts] = useState<any>()
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });

        if (data.length > 0) {
          const contact = data[0];
          setContacts(data)
          console.log(contact)
        }
      }
    })();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text> contacts
        .</Text>
        {/* <Text>{JSON.stringify(contacts)}</Text> */}
      <Link href="/ContactDetail">navigate to Contact Details</Link>
      <Link href="/TaskList">navigate to tasklist</Link>
    </View>
  );
}
