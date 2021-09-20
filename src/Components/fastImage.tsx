import React from 'react';
import FastImage from 'react-native-fast-image'
import { StyleSheet, View, Text } from 'react-native';

type Props = {
    uri:string;
}

const RNAFastImage: React.FC<Props> = ({uri}:Props) => {

    return (
        <View style={styles.container}>
            <FastImage
                style={{ width: 100, height: 100 }}
                source={{
                    uri: uri,
                    headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                    cache:'immutable',
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.title}>Title</Text>
        </View>
    )
}

export default RNAFastImage;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    title:{
        textAlign:'center',
        fontSize:14
    }
});
