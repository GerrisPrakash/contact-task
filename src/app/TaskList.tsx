import { Text, View, StyleSheet } from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { tasksCollection } from "../db";

import { withObservables } from "@nozbe/watermelondb/react";
import TaskSegment from "../components/TaskSegment";

function TaskList({ todo }) {
  useEffect(() => {
    (async () => {
      let taskFromdb = await tasksCollection.query().fetch();
      console.log("gerriss", taskFromdb.length);
    })();
  }, []);
  return (
    <View>
      {todo.length>0 ? todo.map((to) => {
        return <TaskSegment to = {to} />;
      }):<View style={Styles.emptyScreen}>
        <Text style={Styles.emptyScreenText}>Go to Contacts details screen and add tasks to see tasks</Text>
        </View>}
    </View>
  );
}


const enhance = withObservables([], () => ({
  todo: tasksCollection.query().observe(),
}));

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
  emptyScreen:{
    height:'100%'
  },
  emptyScreenText:{
    marginVertical: 'auto',
    marginHorizontal: 10,
    fontSize: 20,
    textAlign: 'center'
  }
});
export default enhance(TaskList);
