import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { authStyles } from '../../assets/styles/auth.styles';
import { Alert, TextInput, KeyboardAvoidingView, ScrollView, Image, Platform } from 'react-native';
import { COLORS } from '../../constants/colors';

const VerifyEmail = ({email, onBack}) => {


    const {isLoaded, signUp, setActive} = useSignUp();
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    // define the fuction code
    const handleVerification = async() => {
        if(!isLoaded) return;

        setLoading(true)
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({code})

            if(signUpAttempt.status === "Complete"){
                await setActive({session:signUpAttempt.createdSessionId});
            } else {
                Alert.alert("Error", "Verification failed. Please try again.");
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (error) {
            Alert.alert("Error", "Verification failed. Please try again.");
            // console.error(JSON.stringify(signUpAttempt, null, 2));
            console.error("Verification error", error);
            
        } finally {
            setLoading(false);
        }
    }

    return (
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
    source={require("../../assets/images/i3.png")}
    style={authStyles.image}
    contenFit="contain"
    />
    </View>
    {/* Define the title of the screen */}
    <Text style={authStyles.title}> Verify Your Email</Text>
    <Text style={authStyles.title}> We&apos;ve sent a verification code to {email}</Text>
     <View style={authStyles.formContainer}>
        {/* Vefification code field */}
        <TextInput
                                    style={authStyles.textInput}
                                    placeholder='Enter verification code'
                                    placeholderTextColor={COLORS.textLight}
                                    value={code}
                                    onChangeText={setCode}
                                    // by setting secureTextEntry true or false the password will be visiable.
                                    keyboardType="number-pad"
                                    autoCapitalize="none"
                                />
     </View>   
            {/* Adding verify button */}
                                <TouchableOpacity
                                style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
                                onPress={handleVerification}
                                disabled={loading}
                                activeOpacity={0.8}
                                >
                                    <Text style={authStyles.buttonText}>{loading ? "Verifying...": "Verify Email"}</Text>            
                                </TouchableOpacity>
                                {/* Back to Sign Up */}
                                <TouchableOpacity style={authStyles.linkContainer} onPress={onBack}>
                                    <Text style={authStyles.linkText}>
                                        <Text style={authStyles.link}>Back to Sign Up</Text>
                                    </Text>
                                </TouchableOpacity>
    </ScrollView>
</KeyboardAvoidingView>
        </View>
    );
};
export default VerifyEmail;