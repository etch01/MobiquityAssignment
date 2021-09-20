import React from 'react';
import FastImage from 'react-native-fast-image'
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import {truncateString} from '../Helpers/truncateString';

const {width,height} = Dimensions.get('window');

type Props = {
    uri:string;
    title?:string;
    index:number;
}

const RNAFastImage: React.FC<Props> = ({uri, index, title}:Props) => {

    return (
        <View style={styles.container}>
            <FastImage
                style={{ flex:1 }}
                source={{
                    uri: uri,
                    priority: FastImage.priority.normal,
                    cache:'immutable',
                    headers: {
                        'Content-Type': 'image/jpeg',
                      },
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.title}>{truncateString(title,20)}</Text>
        </View>
    )
}

export default RNAFastImage;

const styles = StyleSheet.create({
    container:{
        height:height/4,
        width:width /2.2,
        alignSelf:'center',
        marginLeft:5,
        marginRight:5,
        marginTop:height*0.01
    },
    title:{
        textAlign:'center',
        fontSize:12,
        marginTop: height*0.01,
        flexWrap:'wrap'
    }
});
