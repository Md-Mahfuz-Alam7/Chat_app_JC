import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/authContext";
import { colors, radius, spacingX, spacingY } from "../constants/theme";
import { verticalScale } from "../utils/stylling";
import Avatar from "./Avatar";
import Typo from "./typo";
import moment from "moment";
import { Image } from "expo-image";

const MessageItem = ({
    item,
    isDirect
}) => {

    const { user: currentUser } = useAuth();
    const isMe = currentUser?.id == item?.sender?.id;

    const formattedDate = moment(item.createdAt).isSame(moment(), 'day') ? 
    moment(item.createdAt).format('h:mm A') :
    moment(item.createdAt).format('MMM D, h:mm A');

    // console.log('message item: ' , item)


    return (
        <View
            style={[
                styles.messageContainer,
                isMe ? styles.myMessage : styles.theirMessage
            ]}
        >
            {
                !isMe && !isDirect && (
                    <Avatar
                        size={30}
                        uri={item?.sender?.avatar}
                        style={styles.messageAvatar}
                    />
                )}

            <View
                style={[
                    styles.messageBubble,
                    isMe ? styles.myBubble : styles.theirBuble
                ]}
            >
                {
                    !isMe && !isDirect && (
                        <Typo color={colors.neutral900} fontWeight={'600'} size={13}>
                            {item.sender.name}
                        </Typo>
                    )
                }

                {
                    item.attachment && ( // Fixed typo
                        <Image
                            source={item.attachment} // Fixed typo
                            contentFit="cover"
                            style={styles.attachment} // Fixed typo
                            transition={100}
                        />
                    )
                }

                {item.content && <Typo size={15}>{item.content}</Typo>}

                <Typo 
                    style={{alignSelf: 'flex-end'}}
                    size={11}
                    fontWeight={'500'}
                    color={colors.neutral600}
                >
                    {formattedDate}
                </Typo>
            </View>
        </View>
    )
}

export default MessageItem;

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: "row",
        gap: spacingX._7,
        maxWidth: "80%",
    },
    myMessage: {
        alignSelf: "flex-end",
    },
    theirMessage: {
        alignSelf: "flex-start",
    },
    messageAvatar: {
        alignSelf: "flex-end",
    },
    attachment: { // Fixed typo
        height: verticalScale(180),
        width: verticalScale(180),
        borderRadius: radius._10,
    },
    messageBubble: {
        padding: spacingX._10,
        borderRadius: radius._15,
        gap: spacingY._5,
    },
    myBubble: {
        backgroundColor: colors.myBubble,
    },
    theirBuble: {
        backgroundColor: colors.otherBubble,
    },
});