import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from "react-native";
import {ChatRoom, User} from "../../types";
import styles from "./styles";
import {useNavigation} from '@react-navigation/native'

import {API, Auth, graphqlOperation} from "aws-amplify";
import {
    createChatRoom,
    createChatRoomUser
} from '../../src/graphql/mutations'

export type ContactItemProps = {
    user: User
}

const ContactListItem = (props: ContactItemProps) => {
    const {user} = props

    const navigation = useNavigation()

    const onClick = async () => {
        try {

            // 1. Create a new Chat Room
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom, {
                        input: {}
                    }
                )
            )

            if (!newChatRoomData.data) {
                console.log("Failed to create a chat Room")
                return
            }

            const newChatRoom = newChatRoomData.data.createChatRoom

            // 2. Add 'user' to the Chat Room
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input: {
                            userID: user.id,
                            chatRoomID: newChatRoom.id
                        }
                    }
                )
            )

            // 3. Add authenticated user to the Chat Room
            const userInfo = await Auth.currentAuthenticatedUser()

            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input: {
                            userID: userInfo.attributes.sub,
                            chatRoomID: newChatRoom.id
                        }
                    }
                )
            )
            navigation.navigate('ChatRoom', {
                id: newChatRoom.id,
                name: "Hardcoded Name"
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.lefContainer}>
                    <Image source={{uri: user.imageUri}} style={styles.avatar}/>

                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text numberOfLines={2} ellipsizeMode={"head"}
                              style={styles.status}>{user.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ContactListItem