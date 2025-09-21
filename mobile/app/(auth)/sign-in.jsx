
import { View, Text, Alert } from 'react-native';
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { authStyles } from '../../assets/styles/auth.styles';

const SignInScreen = () => {
    const router = useRouter();
    const { signIn, setActive, isLoaded } = useSignIn();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // jsx is case sentitive so, False is different from false
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSignIn = async () => {
        if(!email || !password){
            Alert.alert("Error", "Please fill in all fields.")
            return
        }

        if(isLoaded) return;

        setLoading(True)

        try {
            const signInAttempt = await signIn.create({
                identifier:email,
                password
            })

            if(signInAttempt.status === "Complete") {
                await setActive({session:signInAttempt.createSessionId})
            } else {
                Alert.alert("Error", "Sign in failed. Please try again.");
                console.error(JSON.stringify(signInAttemptm, null, 2));
            }
        } catch (error) {
            Alert.alert("Error", error.errors?.[0]?.message || "Sign in failed");
            console.error(JSON.stringify(signInAttemptm, null, 2));
        } finally {
            setLoading(false)

        }
    }
    return (
        <View style={authStyles.container}>
            <Text>This is a test of SignInScreen</Text>
            <Text>SignInScreen</Text>
            <Text>Trying set the screen layout.</Text>
            <Text>Working on a bug import library</Text>
        </View>
    );
};
export default SignInScreen;