import {Text, View, StyleSheet, ActivityIndicator} from "react-native";
import React from "react";
import { colors } from "../constants/theme";

/**
 * @param {ActivityIndicatorProps} props
 */

const Loading = ({
    size = 'large',
    color = colors.primaryDark,

}) => {
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
}

export default Loading;

const styles = StyleSheet.create({});