import { Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { Image } from "react-native";


const TabsLayout = () => {
     const { isSignedIn } = useAuth();
    
    // if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;
    if (!isSignedIn)
        {
            return null;
        } 
        // return <Redirect href={"/"}/>
    return (

        // <Stack />
        // return tabs as the respetives screen on the application.
        // Adding tab layout for screen selection
        <Tabs screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            // 👇 REPLACE YOUR OLD screenOptions WITH THIS:
            tabBarActiveTintColor: '#147ac8ff', // Orange-500
            tabBarInactiveTintColor: '#9ca3af', // Gray-400
            tabBarStyle: {
                backgroundColor: '#ffffff',
                borderTopWidth: 0,
                elevation: 20, // Android shadow
                shadowColor: '#000', // iOS shadow
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                borderRadius: 30,
                marginHorizontal: 16,
                marginBottom: 16,
                paddingBottom: 8,
                position: 'absolute',
            },
            tabBarItemStyle: {
                paddingVertical: 8,
            },
        }}>
            <Tabs.Screen
                name="home_screen"
                options={{
                    title:"home",
                    tabBarIcon: ({color, size}) => <Ionicons name="home" size={size} color={color} 
                    />,
                }}
            />
            <Tabs.Screen
                name="dietplan_search"
                options={{
                    title:"food",
                    tabBarIcon: ({color, size}) => <Ionicons name="search" size={size}
                    color={color} />
                }}
            />
            
            <Tabs.Screen
                name="user_profile"
                options={{
                    title:"profile",
                    tabBarIcon: ({color, size}) => <Ionicons name="person-circle-outline" size={size}
                    color={color} />
                }}
            />
            <Tabs.Screen
                name="ai_assistant"
                options={{
                    title:"ai",
                    tabBarIcon:({ focused, color, size }) => (
                        <Image
                                source={require("../../assets/images/ai-icon.png")} 
                                style={{
                                width: size,
                                height: size,
                                opacity: focused ? 1 : 0.6, // slightly dim when not selected
                                // tintColor: color,
          
        }}
        resizeMode="contain"
      />

                    )
                    
                    // "../../assets/images/ai-icon-v1.png"
                }}
            />
        </Tabs>
        
    );
};
export default TabsLayout;