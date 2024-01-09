import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import Card from './components/Card';

const HomeScreen = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [Select, setSelect] = useState(0);
  const [Laoding, setLaoding] = useState(false);
  const [Category, setCategory] = React.useState([
    {
      id: 1,
      name: 'Top Headlines',
      category: 'general',
    },
    {
      id: 5,
      name: 'Sports',
      category: 'sports',
    },
    {
      id: 2,
      name: 'Business',
      category: 'business',
    },
    {
      id: 3,
      name: 'Entertainment',
      category: 'entertainment',
    },
    {
      id: 4,
      name: 'Health',
      category: 'health',
    },
    {
      id: 6,
      name: 'Science',
      category: 'science',
    },
    {
      id: 7,
      name: 'Technology',
      category: 'technology',
    },
  ]);

  const getData = async () => {
    setLaoding(true);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=7e43b4cd68d04d97b30374e360857ba8&category=${Category[Select].category}`,
    );

    const data = await response.json();
    setData(data.articles);
    setLaoding(false);
  };

  const getData2 = async category => {
    setLaoding(true);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=7e43b4cd68d04d97b30374e360857ba8&category=${category}`,
    );

    const data = await response.json();
    setData(data.articles);
    setLaoding(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {Laoding ? (
        <View className="flex-1 justify-center items-center bg-gray-900">
          <ActivityIndicator color={'#06B6D4'} size={69} />
        </View>
      ) : (
        <View className="flex-1">
          <Header navigation={navigation} />

          <View className="px-4 py-2 bg-gray-900">
            <FlatList
              data={Category}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    className={
                      index == Select
                        ? 'px-4 py-1  mr-3 rounded-full bg-cyan-500'
                        : 'px-4 py-1  mr-3 rounded-full bg-gray-500'
                    }
 
                    onPress={() => {
                      setSelect(index);
                      getData2(Category[index].category);
                    }}>
                    
                    <Text
                      className={
                        index == Select
                          ? 'text-white font-Regular'
                          : 'text-white font-Regular'
                      }>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View className="mb-16 bg-gray-900">
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Data}
              renderItem={({item, index}) => {
                return (
                  <Card item={item} navigation={navigation} index={index} />
                );
              }}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
