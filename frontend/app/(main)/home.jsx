import React from "react";
import {Text, StyleSheet, View} from "react-native"
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/typo";
import { colors } from "../../constants/theme";
import { useAuth } from "../../context/authContext";
import Button from "../../components/Button";

const Home = () =>{

    const {user, signOut} = useAuth();
    // console.log("user:",user);
    
    const handleLogOut = async () =>{
        await signOut();
    }

    return (
        <ScreenWrapper>
            <Typo color={colors.black} size={43}>Home</Typo>
            <Button onPress={handleLogOut}>
                <Typo>Log Out</Typo>
            </Button>
        </ScreenWrapper>
    );
}

export default Home;

const styles = StyleSheet.create({})