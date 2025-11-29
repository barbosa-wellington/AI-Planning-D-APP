// import { View, Text } from "react-native";
// import React from "react";


// const details = () => {


//     return (
//         <View>
//       {/* Page Content */}
//       <Text>details This is a test page.</Text>
//       <Text>details This is a test page.</Text>
      

//     </View>
//   );
// };
// export default details;

// mobile/app/(tabs)/user_profile.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { use } from 'react';

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    email: '',
    weight: '',
    height: '',
  });

  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Validation
    if (!profile.name || !profile.surname || !profile.email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    // TODO: Save to backend API
    console.log('Saving profile:', profile);
    
    Alert.alert('Success', 'Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}

        <View style={styles.header}>

          {/* Define router for back arrow */}
          <TouchableOpacity
            onPress={() => router.push("/user_profile")}
        activeOpacity={0.8}>
      <Ionicons name="arrow-back" size={30} color="#10B981" />
    </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setIsEditing(!isEditing)}
            style={styles.editButton}
          >
            <Ionicons 
              name={isEditing ? "close" : "pencil"} 
              size={20} 
              color="#3B82F6" 
            />
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
              placeholder="Enter your first name"
              editable={isEditing}
            />
          </View>

          {/* Surname Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={profile.surname}
              onChangeText={(text) => setProfile({ ...profile, surname: text })}
              placeholder="Enter your last name"
              editable={isEditing}
            />
          </View>

          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={profile.email}
              onChangeText={(text) => setProfile({ ...profile, email: text })}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={isEditing}
            />
          </View>

          {/* weight Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Weight</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={profile.weight}
              onChangeText={(text) => setProfile({ ...profile, weight: text })}
              placeholder="Enter your weight"
              autoCapitalize="none"
              editable={isEditing}
            />
          </View>

          {/* Height Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Height</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={profile.height}
              onChangeText={(text) => setProfile({ ...profile, height: text })}
              placeholder="Enter your height"
              autoCapitalize="none"
              editable={isEditing}
            />
          </View>

          {/* Save Button */}
          {isEditing && (
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  inputDisabled: {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
