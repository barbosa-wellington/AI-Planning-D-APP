import { Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
     const { isSignedIn } = useAuth();
    
    if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;
    return (

        // return tabs as the respetives screen on the application.
        <Tabs>
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
            // Fix icon user profile
                name="user_profile"
                options={{
                    title:"profile",
                    tabBarIcon: ({color, size}) => <Ionicons name="cloudflare" size={size}
                    color={color} />
                }}
            />
            {/* <Tabs.Screen
            // Fix icon user profile
                name="ai_assistant"
                options={{
                    title:"ai",
                    tabBarIcon: ({color, size}) => <Ionicons name="heart" size={size}
                    color={color} />
                }}
            /> */}
        </Tabs>
        
    );
};
export default TabsLayout;