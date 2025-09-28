import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";



const HomeScreen = () => {


    return (
        <View>
      {/* Page Content */}
      <Text >HomeScreen This is a test page.</Text>
      <Text>HomeScreen This is a test page. Last test</Text>


      {/* Floating AI Chat Button */}
      {/* Create the icon of chat and add a redirect for a page service. */}
      {/* <TouchableOpacity
        style={styles.chatButton}
        onPress={() => alert("AI Chat opened!")}
      >
        <Image
          source={require("../../assets/images/ai-icon.png")} // adjust path if needed
          style={styles.chatIcon}
        />
      </TouchableOpacity> */}
    </View>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   chatButton: {
//     position: "absolute",
//     bottom: 30,
//     right: 30,
//     backgroundColor: "#007AFF",
//     borderRadius: 50,
//     padding: 12,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   chatIcon: {
//     width: 28,
//     height: 28,
//     tintColor: "white", // remove if you want the original colors
//     resizeMode: "contain",
//   },
// });
export default HomeScreen;
