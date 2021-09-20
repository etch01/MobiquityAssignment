import React, {useState} from 'react';
import { StyleSheet, FlatList, View, Dimensions, ActivityIndicator } from 'react-native';
import SearchBar from '../Components/searchBar';
import Image from '../Components/fastImage';
const {width,height} = Dimensions.get('window');

const Home =() => {
    const [search,setSearch] = useState<string>('');

    const updateSearch =(text:string):void=>{
        setSearch(text)        
    }

    const _keyExtractor = (item:any,index:number) => item;

    return (
        <View style={styles.container}>
            <SearchBar value={search} onChangeText={updateSearch}/>
            <View style={{width:width*0.95,alignSelf:'center',flex:1}}>
                <FlatList  
                        data={[1,2]}  
                        renderItem={({item,index}) =>{
                        return <Image index={index} uri='https://www.focus2move.com/wp-content/uploads/2020/01/Tesla-Roadster-2020-1024-03.jpg'/>
                        }}
                        keyExtractor={_keyExtractor}
                        style={{flex: 1}}
                        numColumns={2}
                        // onEndReached={!pagingEnded && !paging ?pagingImageList:null}
                        // onEndReachedThreshold={.01}
                        // ListFooterComponent={() => (
                        //     <>
                        //       {paging ? <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: height*0.03, marginBottom: height*0.03 }}>
                        //         <ActivityIndicator size={25} color={'rgb(49,74,86)'} />
                        //       </View> : null}
                        //     </>
                        //   )}
                    />
            </View>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
});
