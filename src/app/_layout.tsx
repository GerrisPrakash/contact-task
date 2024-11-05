import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { store } from "../store/store";
import { Provider } from "react-redux";

export default function ContactDetail() {
  return (
    <Provider store={store}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Contacts",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="contacts" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ContactDetail"
          options={{
            title: "Contact Details",
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="account-details"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="TaskList"
          options={{
            title: "Tasks",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome5 name="tasks" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </Provider>
  );
}
