import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import Card from './components/Card';

const Search = ({navigation}) => {
  const [SearchText, setSearchText] = useState('');
  const [Data, setData] = useState([]);
  const searchNews = async text => {
    setSearchText(text);
    if (text.length > 3) {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=7e43b4cd68d04d97b30374e360857ba8&q=${text}`,
      );

      const data = await response.json();
      setData(data.articles);
    }
  };
  return (
    <View className="flex-1 bg-gray-900">
      <View className="bg-cyan-500 flex-row items-center space-x-4 px-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color={'black'} size={18} />
        </TouchableOpacity>
        <TextInput
          placeholder="Enter your query.."
          value={SearchText}
          placeholderTextColor={'black'}
          onChangeText={text => {
            searchNews(text);
          }}
          className="text-sm text-black"
        />
      </View>

      <View className="mb-16">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Data}
          renderItem={({item, index}) => {
            return <Card item={item} navigation={navigation} index={index} />;
          }}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
