import React from 'react'
import { Text, View } from 'react-native'

import { useRoute } from '@react-navigation/native'

const ChatRoomScreen = () => {

    const route = useRoute()

    // console.log(route.params)

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
        <Text>Chat Room</Text>
        </View>
    )
}

export default ChatRoomScreen