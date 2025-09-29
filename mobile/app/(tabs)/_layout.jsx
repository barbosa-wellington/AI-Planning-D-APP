import { Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

const TabsLayout = () => {
     const { isSignedIn } = useAuth();
    
    if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;
    return (

        // <Stack />
        // return tabs as the respetives screen on the application.
        // Adding tab layout for screen selection
        <Tabs screenOptions={{
            headerShown: false,
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
                name="index"
                options={{
                    title:"Recipes",
                    tabBarIcon: ({color, size}) => <Ionicons name="restaurant" size={size} color={color} 
                    />,
                }}
            />
            <Tabs.Screen
                name="food_search"
                options={{
                    title:"food",
                    tabBarIcon: ({color, size}) => <Ionicons name="search" size={size}
                    color={color} />
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title:"favorites",
                    tabBarIcon: ({color, size}) => <Ionicons name="heart" size={size}
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
            {/* <Tabs.Screen
                name="ai_assistant"
                options={{
                    title:"ai",
                    tabBarIcon: ({color, size}) => <Ionicons name="settings_account_box" size={size}
                    color={color} />
                }}
            /> */}
        </Tabs>
        
    );
};
export default TabsLayout;