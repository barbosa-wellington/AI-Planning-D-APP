import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from 'react';
import { authStyles } from '../../assets/styles/auth.styles';

// Import for the image href
import { Image } from "expo-image";
import { COLORS } from '../../constants/colors';
import { Ionicons } from "@expo/vector-icons";

const SignUpScreen = () => {

    const router = useRouter();
    // if there is a missspelling of the class useSignUp, the click on buttom sign up 
    // will not work. useSignUp is a class call.
    const { isLoaded, signUp} = useSignUp();
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

return(

    <View style={authStyles.container}>
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "pedding": "height"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            style={authStyles.keyboardView}
            >

            <ScrollView
                contentContainerStyle={authStyles.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                {/* Image Container */}
                {/* import must be implace to use it. */}
                <View style={authStyles.imageContainer}>
                    <Image
                        source={require("../../assets/images/i2.png")}
                        style={authStyles.image}
                        contenFit="contain"
                    />
                </View>
                {/* Define the title of the screen */}
                <Text style={authStyles.title}> Create Account</Text>
                
                <View style={authStyles.formContainer}>
                    {/* Define email input */}
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
                    
                    {/* Adding signup button */}
                    <TouchableOpacity
                    style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
                    onPress={handleSignUp}
                    disabled={loading}
                    activeOpacity={0.8}
                    >
                        <Text style={authStyles.buttonText}>{loading ? "Creating Account...": "Sign Up"}</Text>

                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    {/* This touchable function redirect the user to the sign-up page. */}
                    <TouchableOpacity style={authStyles.linkContainer} onPress={() => router.back()}>
                    {/* // define the rounter page when clicking */}
                    {/* // onPress={() => router.push("/(auth)/sign-up")} */}
                    
                        <Text style={authStyles.linkText}>
                             Already have an account? 
                        <Text style={authStyles.link}>Sign in</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
            {/* {/* <Text>This is a test of SignUpScreen</Text> */}
            {/* <Text>SignInScreen</Text> */}
        </View>
);
    
};
export default SignUpScreen;