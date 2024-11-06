import { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather"; //<Feather name="edit-3" size={24} color="black" /> //edit
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // <MaterialIcons name="delete-outline" size={24} color="black" /> //delete

import database, { tasksCollection } from "../db";
import { withObservables } from "@nozbe/watermelondb/react";
function EditableTasksSegment({ todos, updateTodoToDb, deleteFromDb }) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [todoText, SetTodoText] = useState<string>(todos.todo);
  const todoTextChange = (value: string) => {
    SetTodoText(value);
  };
  return (
    <View>
      <View style={styles.taskContainer}>
        <Text style={styles.todoText}>{todos.todo}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="edit-3" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
                deleteFromDb(todos.id);
              }}>
            <MaterialIcons name="delete-outline" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.button}>
          </View>
          <View style={styles.button}>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.backdrop} />
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Task in Detail below</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit Task Details"
              onChangeText={todoTextChange}
              value={todoText}
            />
            {/* Close button */}
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  onPress={() => {
                    setModalVisible(false);
                    SetTodoText(todos.todo);
                  }}
                  title="Close"
                  color="gray"
                />
              </View>
              <View style={styles.button}>
                <Button
                  onPress={() => {
                    updateTodoToDb(todos.id, todoText);
                    setModalVisible(false);
                  }}
                  disabled={todoText.length === 0}
                  title="Submit"
                  color="black"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const enhance = withObservables([], ({ todos }: any) => ({
  todos: todos.observe(),
}));

export default enhance(EditableTasksSegment);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    zIndex: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  button: {
    width: 100,
  },
  taskContainer: {
    margin: 20,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  todoText: {
    fontSize: 18,
    marginBottom: 12,
    width: "68%",
    marginRight: 10,
  },
});
