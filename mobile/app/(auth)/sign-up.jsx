import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from 'react';
import { authStyles } from '../../assets/styles/auth.styles';

// Import for the image href
import { Image } from "expo-image";
import { COLORS } from '../../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import { routePatternToRegex } from 'expo-router/build/fork/getStateFromPath-forks';

const SignUpScreen = () => {

    const router = useRouter();
    const { isLoaded, signUp} = useSignUp;
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(false);

// create a function to handle the signUp bottom action.
const handleSignUp = async () => {
    if(!email || ! password) return Alert.alert("Error", "Please fill in all fields");
    // option check of a password length
    if (password.length < 6) return Alert.alert("Error", "Password must be at least 6 characters");

    // verify the Clerk authentication 
    if(!isLoaded) return;

    setLoading(true)

    try {
        await signUp.create({emailAddress:email, password})

        await signUp.prepareEmailAddressVerification({strategy:"email_code"})

        setPendingVerification(true)

    } catch (error) {
        Alert.alert("Error", error.error?.[0]?.message || "Failed to create account");
        console.error(JSON.stringify(error, null, 2));
        
    } finally {
        setLoading(false)
    }


};

if (pendingVerification) return <Text>"pending ui will go here";</Text>;

    
};
export default SignUpScreen;