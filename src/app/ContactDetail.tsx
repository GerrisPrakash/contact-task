import { Text, View, StyleSheet, Button, Modal, TextInput } from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ContactDetail() {
  const contact = useSelector(
    (state: RootState) => state.selectedContact.selectedContact
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    console.log("gerris", contact);
  }, [contact]);

  return (
    <View style={styles.container}>
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
      <Text style={styles.heading}>Tasks</Text>
      <View style={styles.personalDetail}>
        <View style={styles.button}>
          <Button
            onPress={() => setModalVisible(true)}
            title="Add Task"
            color="black"
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close on Android back button press
      >
        <View style={styles.centeredView}>
          <View style={styles.backdrop} />
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Task in Detail below</Text>
            <TextInput style={styles.input} placeholder="Enter Task Details" />
            {/* Close button */}
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
                  onPress={() => setModalVisible(false)}
                  title="submit"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 8,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black backdrop
    zIndex: 1, // Make sure backdrop appears below modal content
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
    zIndex: 2, // Modal content above the backdrop
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
    gap: 20
  },
});
