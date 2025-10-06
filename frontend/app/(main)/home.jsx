import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/typo";
import { colors, radius, spacingX, spacingY } from "../../constants/theme";
import { useAuth } from "../../context/authContext";
import Button from "../../components/Button";
import { testSocket } from "../../socket/socketEvents";
import { verticalScale } from "../../utils/stylling";
import * as Icons from "phosphor-react-native";
import { useRouter } from "expo-router";
import ConversationItem from "../../components/ConversationItem";
import Loading from "../../components/Loading";

const Home = () => {

    const { user: currentUser, signOut } = useAuth();
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState(0);
    const [loading, setLoading] = useState(false);

    // console.log("user:",user);

    // const testSocketCallBackHandler = (data) =>{
    //     console.log("got response from testSocket event :", data)
    // }

    // useEffect(()=>{
    //     testSocket(testSocketCallBackHandler);
    //     testSocket();

    //     return ()=>{
    //         testSocket(testSocketCallBackHandler, true);
    //     }
    // }, []);

    const handleLogOut = async () => {
        await signOut();
    }

    const conversationList = [
        {
            name: "John Doe",
            type: "direct",
            // lastMessage: {
            //     senderName: "John Doe",
            //     content: "hello, how are you?",
                // createdAt: "2025-06-22T18:45:00Z"
            // }
        },
        {
            name: "Project Team",
            type: "group",
            lastMessage: {
                senderName: "Sara",
                content: "Hey, the meeting on tonight 9:00PM",
                createdAt: "2025-06-21T14:10:00Z"
            }
        },
        {
            name: "Bob",
            type: "direct",
            lastMessage: {
                senderName: "Mom",
                content: "Can you send the files?",
                createdAt: "2025-06-20T09:30:00Z"
            }
        },
        {
            name: "Family Group",
            type: "group",
            lastMessage: {
                senderName: "Mom",
                content: "Happy birthday!",
                createdAt: "2025-06-22T07:50:00Z"
            }
        },
        {
            name: "Charlie",
            type: "direct",
            lastMessage: {
                senderName: "Charlie",
                content: "Thanks",
                createdAt: "2025-06-20T11:15:00Z"
            }
        },
    ];

    let directConvesations = conversationList
        .filter((conversation) => conversation.type === "direct")
        .sort((a, b) => {
            const aDate = a.lastMessage?.createdAt || a.createdAt || '1970-01-01';
            const bDate = b.lastMessage?.createdAt || b.createdAt || '1970-01-01';
            return new Date(bDate).getTime() - new Date(aDate).getTime();
        });

    let groupConvesations = conversationList
        .filter((conversation) => conversation.type === "group")
        .sort((a, b) => {
            const aDate = a.lastMessage?.createdAt || a.createdAt || '1970-01-01';
            const bDate = b.lastMessage?.createdAt || b.createdAt || '1970-01-01';
            return new Date(bDate).getTime() - new Date(aDate).getTime();
        });


    return (
        <ScreenWrapper showPattern={true} bgOpacity={0.4}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Typo
                            color={colors.neutral200}
                            size={19}
                            textProps={{ numberOfLines: 1 }}
                        >Welcome back,<Typo size={20} color={colors.white} fontWeight={'800'}>{currentUser?.name}</Typo>{"  "}
                            🤙
                        </Typo>
                    </View>

                    <TouchableOpacity style={styles.settingIcon} onPress={() => router.push("/(main)/profileModal")}>
                        <Icons.GearSix color={colors.white} weight="fill" size={verticalScale(20)} />
                    </TouchableOpacity>

                </View>

                <View style={styles.content}>
                    <ScrollView
                        showVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: spacingY._20 }}
                    >
                        <View style={styles.navBar}>
                            <View style={styles.tabs}>
                                <TouchableOpacity
                                    style={[styles.tabStyle, selectedTab == 0 && styles.activeTabStyle]}
                                    onPress={() => {
                                        setSelectedTab(0)
                                    }}
                                >
                                    <Typo>Direct Messages</Typo>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.tabStyle, selectedTab == 1 && styles.activeTabStyle]}
                                    onPress={() => {
                                        setSelectedTab(1)
                                    }}
                                >
                                    <Typo>Groups</Typo>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={styles.conversationList}>
                            {
                                selectedTab == 0 && directConvesations.map((item, index) => {
                                    return (
                                        <ConversationItem
                                            item={item}
                                            key={index}
                                            router={router}
                                            showDivider={directConvesations.length != index + 1}
                                        />
                                    )
                                })
                            }
                            {
                                selectedTab == 1 && groupConvesations.map((item, index) => {
                                    return (
                                        <ConversationItem
                                            item={item}
                                            key={index}
                                            router={router}
                                            showDivider={directConvesations.length != index + 1}
                                        />
                                    )
                                })
                            }
                        </View>

                        {
                            !loading && selectedTab == 0 && directConvesations.length == 0 && (
                                <Typo style={{ textAlign: 'center' }}>
                                    You don't have any messages
                                </Typo>
                            )
                        }
                        {
                            !loading && selectedTab == 1 && groupConvesations.length == 0 && (
                                <Typo style={{ textAlign: 'center' }}>
                                    You haven't joined any groups yet
                                </Typo>
                            )
                        }

                        {
                            loading && <Loading />
                        }
                    </ScrollView>
                </View>
            </View>

            <Button
                style={styles.floatingButton}
                onPress={() => {
                    router.push({
                        pathname: "/(main)/newConversationModal",
                        params: { isGroup: selectedTab }
                    })
                }}
            >
                <Icons.Plus
                    color={colors.black}
                    weight="bold"
                    size={verticalScale(24)}
                />
            </Button>
        </ScreenWrapper>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacingX._20,
        gap: spacingY._15,
        paddingTop: spacingY._15,
        paddingBottom: spacingY._20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: radius._50,
        borderTopRightRadius: radius._50,
        borderCurve: 'continuous',
        overflow: 'hidden',
        paddingHorizontal: spacingX._20,
    },
    navBar: {
        flexDirection: 'row',
        gap: spacingX._15,
        alignItems: 'center',
        paddingHorizontal: spacingX._10,
    },
    tabs: {
        flexDirection: 'row',
        gap: spacingX._10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabStyle: {
        paddingVertical: spacingY._10,
        paddingHorizontal: spacingY._20,
        borderRadius: radius.full,
        backgroundColor: colors.neutral100,
    },
    activeTabStyle: {
        backgroundColor: colors.primaryLight,
    },
    conversationList: {
        paddingVertical: spacingY._20,
    },
    settingIcon: {
        padding: spacingY._10,
        backgroundColor: colors.neutral700,
        borderRadius: radius.full,
    },
    floatingButton: {
        height: verticalScale(50),
        width: verticalScale(50),
        borderRadius: 100,
        position: 'absolute',
        bottom: verticalScale(30),
        right: verticalScale(30),
    },
});