import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../store/store";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { withObservables } from "@nozbe/watermelondb/react";
import database, { tasksCollection } from "../db";
import { Q } from "@nozbe/watermelondb";
import EditableTasksSegment from "../components/EditableTasksSegment";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
function ContactDetail({ contact, todo }) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [todoText, settodoText] = useState<string>("");

  const todoTextChange = (value: string) => {
    settodoText(value);
  };

  // create new to task table
  const createTodoToDb = async () => {
    await database.write(async () => {
      await tasksCollection.create((task) => {
        task.name = contact.name; // Use contact name from Redux
        task.number = contact.number; // Use contact number from Redux
        task.todo = todoText;
        task.status = "pending"; // Set task status as pending 
      });
    });
  };

  //update data in task table
  const updateTodoToDb = async (id: any, value: any) => {
    await database.write(async () => {
      const todo = await tasksCollection.find(id);
      await todo.update(() => {
        todo.todo = value;
      });
    });
  };

  //delete task table data permanantly
  const deleteFromDb = async (id: any) => {
    await database.write(async () => {
      const todo = await tasksCollection.find(id);
      await todo.destroyPermanently();
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Personal Information</Text>
      <View style={styles.personalDetail}>
        <FontAwesome
          style={styles.image}
          name="user-circle-o"
          size={75}
          color="black"
        />
        <Text style={styles.content}>name: {contact?.name}</Text>
        <Text style={styles.content}>phone: {contact?.number}</Text>
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
            <Text style={styles.modalText}>Add Task in Detail below</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Task Details"
              onChangeText={todoTextChange}
              value={todoText}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  onPress={() => setModalVisible(false)}
                  title="Close"
                  color="gray"
                />
              </View>
              <View style={styles.button}>
                <Button
                  onPress={() => {
                    createTodoToDb();
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
      <Text style={styles.heading}>Tasks</Text>
      <View style={styles.personalDetail}>
        {todo.length === 0 ? (
          <View>
            <MaterialCommunityIcons
              style={styles.addTodo}
              name="flask-empty-remove-outline"
              size={90}
              color="black"
            />
            <Text style={styles.noTaskText}>No Tasks for {contact.name}</Text>
          </View>
        ) : (
          <FlatList
            data={todo}
            renderItem={({ item }) => (
              <EditableTasksSegment
                todos={item}
                updateTodoToDb={updateTodoToDb}
                deleteFromDb={deleteFromDb}
              />
            )}
          />
        )}
        <View style={[styles.button, styles.addButton]}>
          <Button
            onPress={() => {
              setModalVisible(true);
              settodoText("");
            }}
            title="+ Add Task"
            color="black"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const enhance = withObservables(["contact"], ({ contact }) => ({
  todo: tasksCollection.query(Q.where("number", contact.number)).observe(),
}));

const mapStateToProps = (state: RootState) => ({
  contact: state.selectedContact.selectedContact,
});

export default connect(mapStateToProps)(enhance(ContactDetail));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 8,
    paddingBottom:100,
  },
  personalDetail: {
    backgroundColor: "white",
    margin: 12,
    marginBottom: 2,
    borderRadius: 18,
    elevation: 3,
    paddingBottom: 25,
  },
  heading: {
    margin: 12,
    marginBottom: 0,
    fontSize: 20,
  },
  content: {
    marginLeft: 35,
    fontSize: 18,
  },
  image: {
    marginVertical: 25,
    marginHorizontal: "auto",
  },
  button: {
    width: 100,
  },
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
  addButton: {
    backgroundColor: "red",
    marginHorizontal: "auto",
    marginTop: 20,
    marginBottom: 40
  },
  addTodo: {
    marginHorizontal: "auto",
    marginTop: 30,
  },
  noTaskText: {
    textAlign: "center",
    marginVertical: 20,
  },
});
