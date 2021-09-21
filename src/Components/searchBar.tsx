import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

type Props = {
    onChangeText: (text:string)=> void;
    doSearch:()=> void;
    value:string;
    loading: boolean;
}

const SearchInput: React.FC<Props> = ({onChangeText,value,doSearch,loading}:Props) => {

    return (
        <View>
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
        borderTopColor: 'transparent'
    }
});
