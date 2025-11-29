// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import React from "react";

// // Adding authentication verification for log-out
// import { useAuth } from "@clerk/clerk-expo";
// import { useUser } from "@clerk/clerk-expo";


// const user_profile = () => {
//   // calling the function for logoff
//     const { signOut } = useAuth();
//     const { user } = useUser();

//     const userEmail = user.primaryEmailAddress.emailAddress;
//     const username = user.firstName;


//     return (
//         <View style={{flex:1, backgroundColor: "fff"}}>
//       {/* Page Content */}
//       <Text>User profile This is a test page.</Text>
//       <Text> Hi {username} </Text>
//         <Text>{userEmail}</Text>
      


//                 {/* Define the bottom for logoff */}
//                       <TouchableOpacity
//                       style={styles.logoutButton}
//                       onPress={()=> signOut()}
                      
//                       >
//                         <Text style={styles.logoutText}> Log Out</Text>
//                       </TouchableOpacity>
      

//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   logoutButton: {
//   position: "absolute",
//   top: 40,
//   right: 20,
//   backgroundColor: "#10B981", // Dietly green
//   paddingVertical: 6,
//   paddingHorizontal: 14,
//   borderRadius: 8,
//   // test of aligment of button and text
//   // alignSelf: "flex-end",
//   shadowColor: "#000",
//   shadowOpacity: 0.2,
//   shadowOffset: { width: 0, height: 2 },
//   shadowRadius: 4,
//   elevation: 5,
// },
//   logoutText: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });

// export default user_profile;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function UserProfile() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => signOut()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}>
          <Ionicons name="person" size={80} color="#6B7280" />
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/user_settings/preferences')}
        >
          <Ionicons name="restaurant-outline" size={24} color="#3B82F6" />
          <Text style={styles.buttonText}>Dietary Preferences</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/user_settings/fitbit')}
        >
          <Ionicons name="watch-outline" size={24} color="#3B82F6" />
          <Text style={styles.buttonText}>Connect Fitbit</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/user_settings/details')}
        >
          <Ionicons name="settings-outline" size={24} color="#3B82F6" />
          <Text style={styles.buttonText}>Details</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 40,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 'auto',
    top: -85,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});