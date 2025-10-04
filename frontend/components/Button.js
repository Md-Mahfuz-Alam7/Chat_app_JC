import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { colors, radius } from "../constants/theme";
import { verticalScale } from "../utils/stylling";
import Loading from "./Loading";

/**
 * @param {ButtonProps} props
 */
const Button = ({
    style,
    onPress,
    children,
    loading = false,
    
}) => {
    if (loading) {
        return (
            <View style={[styles.button, style, {backgroundColor: 'transparent'}]}>
                <Loading />
            </View>
        );
    }


    return (    
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );  
}

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: radius.full,
        borderCurved: 'continuous',
        height: verticalScale(56),
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
