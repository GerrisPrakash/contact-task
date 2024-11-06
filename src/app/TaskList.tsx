import { Text, View, StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { tasksCollection } from "../db";

import { withObservables } from "@nozbe/watermelondb/react";
import TaskSegment from "../components/TaskSegment";

function TaskList({ tasks }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [stateTask, setStateTask] = useState(tasks);
  useEffect(() => {
    runSearchQuerry();
  }, [searchQuery]);
  useEffect(() => {
    setStateTask(tasks);
    runSearchQuerry();
  }, [tasks]);
  const runSearchQuerry = () => {
    if (searchQuery.length > 0) {
      const filteredTask = tasks.filter((tod) => {
        return (
          tod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tod.todo.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setStateTask(filteredTask);
    }
  };
  return (
    <View>
      <TextInput
        style = {Styles.search}
        placeholder="Search tasks"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {tasks.length > 0 ? (
        stateTask.map((to) => {
          return <TaskSegment to={to} />;
        })
      ) : (
        <View style={Styles.emptyScreen}>
          <Text style={Styles.emptyScreenText}>
            Go to Contacts details screen and add tasks to see tasks
          </Text>
        </View>
      )}
    </View>
  );
}

const enhance = withObservables(["tasks"], ({ tasks }) => ({
  tasks: tasksCollection.query(),
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
  search:{
    backgroundColor:'white',
    borderColor:'#d3d3d3',
    borderWidth: 1,
    borderRadius: 200,
    margin:15,
    height:50,
    paddingHorizontal:30
  }
});
export default enhance(TaskList);
