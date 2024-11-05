import ContactsScreen from "../components/ContactsScreen";
// import ContactsScreen from "./Screens/ContactScreen";
import { store } from "../store/store";
import { Provider } from "react-redux";

export default function HomeScreen() {
  return (
    <Provider store={store}>
      <ContactsScreen />
    </Provider>
  );
}
