import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {icons, images} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CustomSearch, ProductItem} from '../components';
import {CategoriesData, ProductData} from '../constants/data';
import {removeItem} from '../utils/AsyncStorage';
import {ProductTypes} from '../constants/types';

type Props = {};

const HomeTab = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  type RootStackParamList = {
    Setting: undefined;
  };
  // real data
  const [products, setProducts] = useState<ProductTypes[]>([]);
  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      const data = await fetch('http://10.0.2.2:4000/api/products/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const response = await data.json();
      console.log(response);
      setProducts(response);
    };
    fetchData();
  }, [products]); // update when products items updated

  const NavigateToProfile = async () => {
    navigation.navigate('Setting');
    await removeItem('onboarded'); // will reset to onboarding
  };
  const handleSelectCategory = () => {};
  return (
    <ScrollView>
      {/* header */}
      <View className="flex flex-row items-center justify-between mx-5">
        <Image source={icons.menu} className="w-8 h-8" resizeMode="contain" />

        <Image
          source={images.logo}
          className="w-24 h-24"
          resizeMode="contain"
        />
        <TouchableOpacity onPress={NavigateToProfile}>
          <Image
            source={icons.profile}
            className="w-8 h-8"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {/* search */}
      <CustomSearch initialQuery="" />
      {/* features */}
      <View className="flex my-5 flex-row mx-5 justify-between ">
        <Text className="text-2xl font-bold ">All Features </Text>
        <View className="flex flex-row gap-x-3 ">
          {FeaturesData.map(item => (
            <View
              className="bg-white  rounded-lg  flex-row flex items-center px-2 "
              key={item.id}>
              <Text className="text-black-100"> {item.title} </Text>
              <Image
                source={item.image}
                className="w-4 h-4"
                resizeMode="contain"
              />
            </View>
          ))}
        </View>
      </View>
      {/* categories */}
      <View>
        <FlatList
          data={CategoriesData}
          renderItem={({item}) => (
            <TouchableOpacity onPress={handleSelectCategory}>
              <Image
                source={{uri: item.image}} // it's url
                className="w-24 h-24 rounded-full"
              />
              <Text className="text-black-100/80 text-center text-lg font-medium">
                {' '}
                {item.title}{' '}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-8" />}
          ListFooterComponent={<View className="w-8" />}
          ListHeaderComponent={<View className="w-8" />}
        />
      </View>
      {/* offer */}
      <View>
        <Image
          source={images.deal_off}
          resizeMode="contain"
          className="w-full mt-8 "
        />
      </View>
      {/* daily .. */}
      <View className="bg-[#4392F9] rounded-xl justify-between flex flex-row mx-5 pl-5 py-5">
        <View>
          <Text className="text-white  text-2xl font-semibold">
            Daily of the Day
          </Text>
          <View className="flex flex-row mt-3 items-center gap-x-1">
            <Image
              source={icons.calender}
              resizeMode="contain"
              className="w-6 h-6"
            />
            <Text className="text-white text-base font-medium">
              {' '}
              22h 55m 20s remaining{' '}
            </Text>
          </View>
        </View>
        <View className="rounded-lg border-white border-2 mr-3 h-12 px-3 flex flex-row gap-x-px items-center">
          <Text className="text-white font-medium text-lg">View all</Text>
          <Image
            source={icons.show_all}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </View>
      </View>
      {/* Products */}
      <View className="my-8">
        <FlatList
          data={products}
          renderItem={({item}) => (
            <ProductItem
              image={item.image[0]}
              title={item.title}
              description={item.description}
              price={item.price}
              priceBeforeDeal={item.priceBeforeDeal}
              priceOff={item.priceOff}
              stars={item.stars}
              numberOfReview={item.numberOfReview}
              itemDetails={item}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-8" />}
          ListFooterComponent={<View className="w-8" />}
          ListHeaderComponent={<View className="w-8" />}
        />
      </View>
      {/* special Offer */}
      <View className="flex my-5 justify-between bg-white flex-row items-center py-3 px-4 mx-5 rounded-lg">
        <Image
          source={icons.offer}
          className="w-24 h-24"
          resizeMode="contain"
        />
        <View className="">
          <Text className="text-2xl mb-1 text-black-100 font-bold">
            Special Offers
          </Text>
          <Text className="text-neutral-500 text-base w-52">
            We make sure you get the offer you need at best prices
          </Text>
        </View>
      </View>
      {/* Flat Shoes Offer */}
      <View className="my-5">
        <Image
          source={images.flat}
          className="self-center "
          resizeMode="contain"
        />
      </View>
      {/* Trending Products */}
      <View className="bg-red-500 rounded-xl justify-between flex flex-row mx-5 pl-5 py-5">
        <View>
          <Text className="text-white  text-2xl font-semibold">
            Daily of the Day
          </Text>
          <View className="flex flex-row mt-3 items-center gap-x-1">
            <Image
              source={icons.calender}
              resizeMode="contain"
              className="w-6 h-6"
            />
            <Text className="text-white text-base font-medium">
              {' '}
              22h 55m 20s remaining{' '}
            </Text>
          </View>
        </View>
        <View className="rounded-lg border-white border-2 mr-3 h-12 px-3 flex flex-row gap-x-px items-center">
          <Text className="text-white font-medium text-lg">View all</Text>
          <Image
            source={icons.show_all}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </View>
      </View>
      {/* Products */}
      <View className="my-8">
        <FlatList
          data={products}
          renderItem={({item}) => (
            <ProductItem
              image={item.image[0]}
              title={item.title}
              description={item.description}
              price={item.price}
              priceBeforeDeal={item.priceBeforeDeal}
              priceOff={item.priceOff}
              stars={item.stars}
              numberOfReview={item.numberOfReview}
              itemDetails={item}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-8" />}
          ListFooterComponent={<View className="w-8" />}
          ListHeaderComponent={<View className="w-8" />}
        />
      </View>
      {/* .... */}
    </ScrollView>
  );
};

export default HomeTab;

type FeaturesDataProps = {
  id: number;
  title: string;
  image: ImageSourcePropType;
};

export const FeaturesData: FeaturesDataProps[] = [
  {
    id: 1,
    title: 'Sort',
    image: icons.sort,
  },
  {
    id: 2,
    title: 'Filter',
    image: icons.filter,
  },
];
