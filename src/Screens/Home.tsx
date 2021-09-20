import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from '../Components/searchBar';

const Home =() => {
    const [search,setSearch] = useState<string>('');

    const updateSearch =(text:string):void=>{
        setSearch(text)        
    }

    return (
        <View style={styles.container}>
            <SearchBar value={search} onChangeText={updateSearch}/>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
});
