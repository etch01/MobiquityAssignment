import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from '../Components/searchBar';
import Image from '../Components/fastImage';

const Home =() => {
    const [search,setSearch] = useState<string>('');

    const updateSearch =(text:string):void=>{
        setSearch(text)        
    }

    return (
        <View style={styles.container}>
            <SearchBar value={search} onChangeText={updateSearch}/>
            <Image uri='https://www.focus2move.com/wp-content/uploads/2020/01/Tesla-Roadster-2020-1024-03.jpg'/>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
});
