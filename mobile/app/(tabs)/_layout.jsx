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
        <Tabs screenOptions={{
            headerShown:false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textLight,
            tabBarStyle:{
                backgroundColor: COLORS.white,
                borderTopColor: COLORS.border,
                borderTopWidth: 1,
                paddingBottom: 8,
                paddingTop: 8,
                height: 80,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "600",
            }
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