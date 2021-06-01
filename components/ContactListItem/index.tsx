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

export type ContactItemProps = {
    user: User
}

const ContactListItem = (props: ContactItemProps) => {
    const {user} = props

    const navigation = useNavigation()

    const onClick = () => {
        // navigate to chat room with this user
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