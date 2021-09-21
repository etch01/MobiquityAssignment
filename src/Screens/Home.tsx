import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, FlatList, View, Dimensions, ActivityIndicator, Alert } from 'react-native';
import {Requests} from '../Network/requests';
import {Photos} from '../Models/photos';
import SearchBar from '../Components/searchBar';
import Image from '../Components/fastImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchHistory from '../Components/searchHistory';

const {width,height} = Dimensions.get('window');

const Home =() => {
    const [search,setSearch] = useState<string>('');
    const [images,setImages] = useState<Photos>();
    const [loading,setLoading] = useState<boolean>(false);
    const [page,setPage] = useState<number>(1);
    const [paging,setPaging] = useState<boolean>(false);
    const [pagingEnded,setPagingEnded] = useState<boolean>(false);
    const [error,setError] = useState<string>('');
    const [searchHistory,setSearchHistory] = useState <Array<string>>([]);
    const [filteredSearchHistory,setFilteredSearchHistory] = useState <Array<string>>([]);
    const [searchHistoryVisibility,setSearchHistoryVisibility] = useState<boolean>(false);

    const flatlistRef: any = useRef();

    //collect search text from search input
    const updateSearch =(text:string):void=>{
        setSearch(text)        
    }

    const searchImage = ():void =>{
        const req = new Requests();
        setLoading(true);
        setSearchHistoryVisibility(false);
        req.getImages(search,page,({error,data})=>{
            if (data?.stat == 'ok'){
                if (data.photos.photo.length == 0){
                    setImages(data.photos.photo);
                    setError('No Image');
                }else{
                    setImages(data.photos.photo);
                    storeSearchResult(search);
                    //Scroll to the top of the flatlist on search
                    flatlistRef.current?.scrollToIndex({ animated: true, index: 0 })
                }
            }else{
                setImages(undefined);
                setError(error);
            }          
            //Reset paging after search  
            setPage(1);
            setPagingEnded(false);
            setPaging(false);
            setLoading(false);
        });
    }

    const pagingImages = ():void =>{
        const req = new Requests();
        setLoading(true);
        setPage(prevPage=> prevPage +1);
        req.getImages(search,page+1,({error,data})=>{
            if (data?.stat == 'ok'){
                if (data.photos.photo.length == 0){
                    setPagingEnded(true);
                    setError('No Image');
                }else{
                    //merge previous page images with the new page ones
                    const firstPageImages: Photos = images?.concat(data.photos.photo);
                    setImages(firstPageImages);
                }
            }else{
                setImages(undefined);
                setError(error);
            }          
            //Reset paging after search  
            setPaging(false);
            setLoading(false);
        });
    }

    //Remove Duplicates from history array
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

    const storeSearchResult = async (value:string) =>{
        try {
            //get old search values
            const jsonOldValues = await AsyncStorage.getItem('@search_value')
            if (jsonOldValues !== null){
                let newValues = JSON.parse(jsonOldValues)
                newValues.push(value);
                var unique = newValues.filter(onlyUnique)
                await AsyncStorage.setItem('@search_value', JSON.stringify(unique))

            }else{
                const jsonValue = JSON.stringify([search])
                await AsyncStorage.setItem('@search_value', jsonValue)
                
            }
          } catch (e) {
            console.log(e);
          }
    }

    const getHistoryFromStorage = async() =>{
        const history = await AsyncStorage.getItem('@search_value');
        if (history !== null){
            setSearchHistory(JSON.parse(history))
        }        
    }

    const filterSearchHistory = () =>{
        const filter = searchHistory.filter(substring=>substring.indexOf(search) > -1)        
        setFilteredSearchHistory(filter);
    }

    //Updates children every time history updated
    useEffect(()=>{
        getHistoryFromStorage();
    },[searchHistory])

    //shows or hides and modifies history section every time search value changes
    useEffect(()=>{
        if (search.length > 0){
            setSearchHistoryVisibility(true);
            filterSearchHistory(); 
        }else{
            setSearchHistoryVisibility(false);
        }
    },[search])

    const _keyExtractor = (item:any,index:number) => item.id;

    return (
        <View style={styles.container}>
                <SearchBar searchValues={filteredSearchHistory || searchHistory} 
                loading={loading} 
                doSearch={searchImage} 
                value={search} 
                onChangeText={updateSearch}
                updateSearchBarValue={(val)=>setSearch(val)}
                searchHistoryVisibility={searchHistoryVisibility}/>
            <View style={{width:width*0.95,alignSelf:'center',flex:1}}>
                <FlatList  
                        data={images}  
                        renderItem={({item,index}) =>{                            
                        return <Image index={index} title={item.title} uri={`https://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`}/>
                        }}
                        keyExtractor={_keyExtractor}
                        style={{flex: 1}}
                        numColumns={2}
                        ref={flatlistRef}
                        onEndReached={!pagingEnded && !paging ?pagingImages:null}
                        onEndReachedThreshold={.01}
                        ListFooterComponent={() => (
                            <>
                              {paging ? 
                              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: height*0.03, marginBottom: height*0.03 }}>
                                <ActivityIndicator size={25} color={'rgb(49,74,86)'} />
                              </View> 
                              : null}
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
