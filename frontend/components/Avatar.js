import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { verticalScale } from "../utils/stylling";
import { radius, colors } from "../constants/theme";
import {Image} from "expo-image";
import { getAvatarPath } from "../services/imageService";

const Avatar = ({
    uri,
    size=40,
    style,
    isGroup = false
}) => {
    return (
        <View style={[styles.avatar, {height: verticalScale(size), width: verticalScale(size), }, style]}>
            <Image 
                style={{flex:1}}
                source={getAvatarPath(uri, isGroup)}
                contentFit="cover"
                transition={100}
            />
        </View>
    );
};

export default Avatar;

const styles = StyleSheet.create({
    avatar:{
        backgroundColor: colors.neutral200,
        height: verticalScale(47),
        width: verticalScale(47),
        borderRadius: radius.full,
        borderWidth: 1,
        borderColor: colors.neutral100,
        overflow: 'hidden',
    }
});