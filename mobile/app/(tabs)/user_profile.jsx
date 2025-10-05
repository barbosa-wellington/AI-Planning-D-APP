import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

// Adding authentication verification for log-out
import { useAuth } from "@clerk/clerk-expo";


const user_profile = () => {
  // calling the function for logoff
    const { signOut } = useAuth();


    return (
        <View style={{flex:1, backgroundColor: "fff"}}>
      {/* Page Content */}
      <Text>User profile This is a test page.</Text>
      <Text> Test of logout</Text>
      


                {/* Define the bottom for logoff */}
                      <TouchableOpacity
                      style={styles.logoutButton}
                      onPress={()=> signOut()}
                      
                      >
                        <Text style={styles.logoutText}> Log Out</Text>
                      </TouchableOpacity>
      

    </View>
  );
};


const styles = StyleSheet.create({
  logoutButton: {
  position: "absolute",
  top: 40,
  right: 20,
  backgroundColor: "#10B981", // Dietly green
  paddingVertical: 6,
  paddingHorizontal: 14,
  borderRadius: 8,
  // test of aligment of button and text
  // alignSelf: "flex-end",
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 5,
},
  logoutText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default user_profile;