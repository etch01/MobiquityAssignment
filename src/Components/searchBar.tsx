import React from 'react';
import {  StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import SearchHistory from './searchHistory';

type Props = {
    onChangeText: ((text: string) => void) | undefined;
    doSearch:()=> void;
    value:string;
    loading: boolean;
    searchValues?:Array<string>;
    updateSearchBarValue: (value:string)=>void;
    searchHistoryVisibility:boolean;
}

const SearchInput: React.FC<Props> = ({onChangeText,value,doSearch,loading,searchValues,updateSearchBarValue,searchHistoryVisibility}:Props) => {

    return (
        <View style={{zIndex:1}}>
            <SearchBar
            showLoading={loading}
                placeholder='Search Images...'
                onChangeText={onChangeText}
                value={value}
                containerStyle={styles.searchBarContainer}
                onSubmitEditing={doSearch}
                loadingProps={{size:20,color:'#fff'}}
                returnKeyType='search'
            />
            <SearchHistory updateSearchBarValue={(value)=>updateSearchBarValue(value)} searchValues={searchValues} visible={searchHistoryVisibility}/>
        </View>
    )
}

export default SearchInput;

const styles = StyleSheet.create({
    searchBarContainer:{
        backgroundColor: '#fff',
        borderWidth: 0, 
        shadowColor: '#fff',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    }
});
