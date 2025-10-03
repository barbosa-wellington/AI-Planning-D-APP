import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useAuth } from "@clerk/clerk-expo";

// // Add this function in your component
// const handleChatPress = () => {
//   // Navigate to chat screen (you'll create this later)
//   router.push('/ai_assistant');
//   // Or for now, just log
//   console.log('AI Chat pressed');
// };
const HomeScreen = () => {


    return (
        <View>
      {/* Page Content */}
      <Text >HomeScreen This is a test page.</Text>
      <Text> Starting working on the development of APIs</Text>
      {/* <Text>HomeScreen This is a test page. Last test</Text> */}


      {/* Floating AI Chat Button */}
      {/* Create the icon of chat and add a redirect for a page service. */}
      {/* // Add this JSX right before your closing </View> or </SafeAreaView> */}
          {/* <TouchableOpacity 
            style={styles.floatingButton}
            onPress={handleChatPress}
            activeOpacity={0.8}
          >
            <Ionicons name="chatbubbles" size={28} color="white" />
          </TouchableOpacity> */}
    </View>
  );
};


// // Add these styles to your StyleSheet.create({})
// const styles = StyleSheet.create({
//   // ... your existing styles
  
//   floatingButton: {
//     position: 'absolute',
//     bottom: 24,
//     right: 24,
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     backgroundColor: '#3B82F6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#3B82F6',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
// });

export default HomeScreen;
