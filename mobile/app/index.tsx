import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import {Image} from "expo-image"
import reactLongo from "@/assets/images/react-logo.png";
import { Link } from "expo-router";



export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>

      <TouchableOpacity>
          <Text>click me</Text>
      </TouchableOpacity>
        
      <Link href={"/about"}>Visit about screen
      </Link>
      </View>
  );
}

// Creating different styles of text
const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
  text:{ color: 'purple', fontSize: 40}
})
