import { Text, View } from "react-native";
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from "react";
import { Link } from "expo-router";

export default function TaskList() {
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text> Task List
        .</Text>
        {/* <Text>{JSON.stringify(contacts)}</Text> */}
    </View>
  );
}
