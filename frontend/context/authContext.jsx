import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { login, register } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { connectSocket, disconnectSocket } from "../socket/socket";

export const AuthContext = createContext({
    token: null,
    user: null,
    signIn: async () => { },
    signUp: async () => { },
    signOut: async () => { },
    updateToken: async () => { },
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(()=>{
        loadToken();
    }, []);

    const loadToken = async () => {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
            try{
                const decode = jwtDecode(storedToken);
                if(decode.exp && decode.exp < Date.now()/1000){
                    await AsyncStorage.removeItem("token");
                    gotoWelcomePage();
                    return;
                }
                setToken(storedToken);
                await connectSocket();
                setUser(decode.user);

                gotoHomePage();
            }catch(error){
                gotoWelcomePage();
                console.log("failed to decode token",error)
            }
        }else{
            gotoWelcomePage();
        }
    };

    const gotoHomePage = () => {

        // wait to show splash screen
        setTimeout(() => {
            router.replace("(main)/home");
        }, 1500);
    };

    const gotoWelcomePage = () => {
    // wait to show splash screen
        setTimeout(() => {
            router.replace("(auth)/welcome");
        }, 1500);
    };

    const updateToken = async (token) => {
        if (token) {
            setToken(token);
            await AsyncStorage.setItem("token", token);
            // decode token (data)  
            const decoded = jwtDecode(token);
            console.log("decoded token: ", decoded);
            setUser(decoded.user);
        }
    };

    const signIn = async (email, password) => {
        const response = await login(email, password);
        await updateToken(response.token);
        await connectSocket();
        router.replace("(main)/home");
    };

    const signUp = async (email, password, name, avatar = null) => {
        const response = await register(email, password, name, avatar);
        await updateToken(response.token);
        await connectSocket();
        router.replace("(main)/home");
    }

    const signOut = async () =>{
        setToken(null);
        setUser(null);
        await AsyncStorage.removeItem("token");
        disconnectSocket();
        router.replace("/(auth)/welcome")

    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                signIn,
                signUp,
                signOut, // implement this
                updateToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

