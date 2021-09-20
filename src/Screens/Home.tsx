import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, View, Dimensions, ActivityIndicator } from 'react-native';
import SearchBar from '../Components/searchBar';
import Image from '../Components/fastImage';
import {Requests} from '../Network/requests';
import {Photos} from '../Models/photos';
const {width,height} = Dimensions.get('window');

const Home =() => {
    const [search,setSearch] = useState<string>('');
    const [images,setImages] = useState<Photos>();
    const [loading,setLoading] = useState<boolean>(false);
    const [page,setPage] = useState<number>(1);
    const [paging,setPaging] = useState<boolean>(false);
    const [pagingEnded,setPagingEnded] = useState<boolean>(false);
    const [error,setError] = useState<string>('');

    const updateSearch =(text:string):void=>{
        setSearch(text)        
    }

    const searchImage = ():void =>{
        const req = new Requests();
        req.getImages(search,page,({error,data})=>{
            if (data?.stat == 'ok'){
                if (data.photos.photo.length == 0){
                    setError('There is no results!');
                }else{
                    setImages(data.photos.photo);
                }
            }else{
                setImages(undefined);
                setError(error);
            }            
            console.log(data);
            
        })
    }

    // useEffect(()=>{
    //     searchImage();
    // },[search])

    const _keyExtractor = (item:any,index:number) => item.id;

    return (
        <View style={styles.container}>
            <SearchBar  doSearch={searchImage} value={search} onChangeText={updateSearch}/>
            <View style={{width:width*0.95,alignSelf:'center',flex:1}}>
                <FlatList  
                        data={images}  
                        renderItem={({item,index}) =>{
                            console.log(`https://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`);
                            
                        return <Image index={index} title={item.title} uri={`http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`}/>
                        }}
                        keyExtractor={_keyExtractor}
                        style={{flex: 1}}
                        numColumns={2}
                        // onEndReached={!pagingEnded && !paging ?pagingImageList:null}
                        // onEndReachedThreshold={.01}
                        ListFooterComponent={() => (
                            <>
                              {paging ? <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: height*0.03, marginBottom: height*0.03 }}>
                                <ActivityIndicator size={25} color={'rgb(49,74,86)'} />
                              </View> : null}
                            </>
                          )}
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
