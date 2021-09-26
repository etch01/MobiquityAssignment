import React from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, FlatList } from 'react-native';
import {Photo} from '../Models/photos'

const {width,height} = Dimensions.get('window');

type Props = {
    visible:boolean;
    searchValues?:Array<string>;
    updateSearchBarValue: (item:string)=> void;
}

const SearchHistory: React.FC<Props> = ({visible,searchValues,updateSearchBarValue}:Props) => {

    const _keyExtractor = (item:string) => item;

    return (
        <View style={[styles.historyContainer,{width:visible?width*0.955:0}]}>
            <FlatList
                data={searchValues}
                keyExtractor={_keyExtractor}
                style={styles.scroll}
                renderItem={({item}) =>{                            
                    return (
                        <TouchableOpacity style={styles.searchItemContainer} onPress={()=>updateSearchBarValue(item)}>
                            <Text style={styles.historyItem}>{item}</Text>
                        </TouchableOpacity>
                    )}}
            />
                
        </View>
    )
}

export default SearchHistory;

const styles = StyleSheet.create({
    historyContainer:{
        position: 'absolute',
        top: 57,
        width: width*0.955,
        alignSelf:'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        zIndex:1,
        backgroundColor:'rgb(57,62,66)',
        maxHeight:height*0.16
    },
    scroll:{
        paddingLeft:10
    },
    historyItem:{
        color:'#828F99'
    },
    searchItemContainer:{
        marginTop:height*0.01,
        marginBottom:height*0.01
    }
});
