import React, {useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ChatListItem from "../components/ChatListItem";
import {
    API,
    graphqlOperation,
    Auth
} from "aws-amplify";

import chatRooms from "../data/ChatRooms";

import {Text, View} from '../components/Themed';
import NewMessageButton from "../components/NewMessageButton";

import { getUser } from '../src/graphql/queries'

export default function ChatsScreen() {

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser()

                const userData = await API.graphql(
                    graphqlOperation(
                        getUser,
                        {
                            id: userInfo.attributes.sub
                        }
                    )
                )

                console.log(userData)

            } catch (e) {
                console.log(e)
            }
        }
        fetchChatRooms()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                style={{width: '100%'}}
                data={chatRooms}
                renderItem={({item}) => <ChatListItem chatRoom={item}/>}
                keyExtractor={(item) => item.id}
            />
            <NewMessageButton/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
