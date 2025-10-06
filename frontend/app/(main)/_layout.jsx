import { Stack } from "expo-router";

export default function MainLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" />
            <Stack.Screen 
                name="profileModal" 
                options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen 
                name="newConversationModal" 
                options={{ presentation: "modal", headerShown: false }}
            />
        </Stack>
    );
}