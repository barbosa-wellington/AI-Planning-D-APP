
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { authStyles } from '../../assets/styles/auth.styles';

import { Image } from "expo-image";
import { COLORS } from '../../constants/colors';
import { Ionicons } from "@expo/vector-icons";



const SignInScreen = () => {
    const router = useRouter();
    const { signIn, setActive, isLoaded } = useSignIn();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // jsx is case sentitive so, False is different from false
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

// Define a signIn fuction that validation 
// empty fields, character lenth
    const handleSignIn = async () => {
        if(!email || !password){
            Alert.alert("Error", "Please fill in all fields.")
            return
        }

        if(!isLoaded) return;

        setLoading(true)

        try {
            const signInAttempt = await signIn.create({
                identifier:email,
                password
            })

            if(signInAttempt.status === "complete") {
                // fixing bug created not create
                await setActive({session:signInAttempt.createdSessionId})
            } else {
                Alert.alert("Error", "Sign in failed. Please try again.");
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (error) {
            Alert.alert("Error", error.errors?.[0]?.message || "Sign in failed");
            console.error(JSON.stringify(error, null, 2));
        } finally {
            setLoading(false)

        }
    }
    return (
        <View style={authStyles.container}>
            {/* This property allows that the keyboard be visible while type user credential on mobile.*/}
            <KeyboardAvoidingView
                style={authStyles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding":"height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView
                    contentContainerStyle={authStyles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={authStyles.imageContainer}>
                        {/* image component reference */}
                        {/* access the image from the folder images */}
                        <Image 
                        source={require("../../assets/images/dietly-logo-v2.png")}
                        style={authStyles.logo}
                        contentFit='contain'/>
                        
                    </View>
                {/* Define the title of the screen */}
                <Text style={authStyles.title}> Welcome Back</Text>
                {/*  FORM CONTAINER */}
                <View style={authStyles.formContainer}>
                    {/* Email Input */}
                    <View style={authStyles.inputContainer}>
                        <TextInput
                            style={authStyles.textInput}
                            placeholder='Enter email '
                            placeholderTextColor={COLORS.textLight}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize='none'/>
                    </View>
                    {/* Password INPUT */}
                    <View style={authStyles.inputContainer}>
                        <TextInput
                            style={authStyles.textInput}
                            placeholder='Enter password'
                            placeholderTextColor={COLORS.textLight}
                            value={password}
                            onChangeText={setPassword}
                            // by setting secureTextEntry true or false the password will be visiable.
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={authStyles.eyeButton}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {/* Define icon to view the password */}
                            <Ionicons
                                name={showPassword ? "eye-outline" : "eye-off-outline"}
                                size={20}
                                color={COLORS.textLight}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Adding signin botton */}
                    <TouchableOpacity
                    style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
                    onPress={handleSignIn}
                    disabled={loading}
                    activeOpacity={0.8}
                    >
                        <Text style={authStyles.buttonText}>{loading ? "Signing In..": "Sign In"}</Text>

                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    {/* This touchable function redirect the user to the sign-up page. */}
                    <TouchableOpacity
                    style={authStyles.linkContainer}
                    onPress={() => router.push("/(auth)/sign-up")}
                    >
                        <Text style={authStyles.linkText}>
                            Don&apos;t have an account? 
                        <Text style={authStyles.link}>Sign up</Text>
                        </Text>

                    </TouchableOpacity>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {/* <Text >This is a test of SignInScreen</Text> */}     
        </View>
    );
};
export default SignInScreen;

