import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

// Adding authentication verification for log-out
import { useAuth } from "@clerk/clerk-expo";


const user_profile = () => {
  // calling the function for logoff
    const { signOut } = useAuth();


    return (
        <View>
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
    marginTop: 30,
    marginHorizontal: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#EF4444", // red
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default user_profile;