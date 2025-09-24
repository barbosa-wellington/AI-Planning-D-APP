import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const HomeScreen = () => {

    // Add this function in your component
const handleChatPress = () => {
  // Navigate to chat screen (you'll create this later)
  router.push('/chat');
  // Or for now, just log
  console.log('AI Chat pressed');
};
    return (
        <View>
            <Text>HomeScreen This is a test page.</Text>
            <Text>HomeScreen This is a test page.</Text>

        </View>
    );
};
export default HomeScreen;