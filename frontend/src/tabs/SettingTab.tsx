import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {icons} from '../constants';
import {CustomButton, CustomWrapper, DetailsItem} from '../components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteStackParamList} from '../../App';

type Props = {};

const SettingTab = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RouteStackParamList>>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = () => {};
  const handleSignInWithProvider = () => {};
  const handleNavigateToSignUp = () => {
    navigation.navigate('Signup');
  };
  const handleEditPic = () => {};
  return (
    <CustomWrapper>
      <View className="pt-2 px-3">
        {/* image profile */}
        <View className="flex justify-center items-center">
          <Image source={icons.profile} className="w-40 h-40 rounded-full " />
          <TouchableOpacity
            onPress={handleEditPic}
            className=" p-2 border-white border rounded-full  bg-blue-500 absolute bottom-3 right-[31%] items-center justify-center">
            <Image source={icons.pen} className=" w-6 h-6" />
          </TouchableOpacity>
        </View>
        {/* Personal Details */}
        <View>
          <Text className="text-2xl font-bold text-black-100">
            Personal Details
          </Text>
          <FlatList
            data={personalDetailsData}
            renderItem={({item}) => (
              <DetailsItem title={item.title} placeholder={item.placeholder} />
            )}
            keyExtractor={item => item.id.toString()} // have to be in string format
          />
        </View>
        <View className="h-px w-full my-5 bg-black-100/20" />
        {/* Business info */}
        <View className="mt-4">
          <Text className="text-2xl font-bold text-black-100">
            Business Address Details
          </Text>
          <FlatList
            data={businessData}
            renderItem={({item}) => (
              <DetailsItem title={item.title} placeholder={item.placeholder} />
            )}
            keyExtractor={item => item.id.toString()} // have to be in string format
          />
        </View>
        <View className="h-px w-full my-5 bg-black-100/20" />
        {/* Bank Account Details */}
        <View className="my-4">
          <Text className="text-2xl font-bold text-black-100">
            Bank Account Details
          </Text>
          <FlatList
            data={bankData}
            renderItem={({item}) => (
              <DetailsItem title={item.title} placeholder={item.placeholder} />
            )}
            keyExtractor={item => item.id.toString()} // have to be in string format
          />
        </View>
        {/* save changes */}
        <CustomButton
          title="Login"
          handlePress={handleLogin}
          isLoading={isSubmitting}
          containerStyle="mt-7 py-5"
        />
      </View>
    </CustomWrapper>
  );
};

export default SettingTab;

interface personalDetailsDataType {
  id: number;
  title: string;
  placeholder: string;
}

const personalDetailsData: personalDetailsDataType[] = [
  {
    id: 0,
    title: 'Email Address',
    placeholder: 'Email Address',
  },
  {
    id: 1,
    title: 'Password',
    placeholder: 'Password',
  },
];

const businessData: personalDetailsDataType[] = [
  {
    id: 0,
    title: 'Pincode',
    placeholder: '450116',
  },
  {
    id: 1,
    title: 'Address',
    placeholder: " 216 St Paul's Rd, ",
  },
  {
    id: 2,
    title: 'City',
    placeholder: 'London',
  },
  {
    id: 3,
    title: 'State',
    placeholder: 'N1 2LL,',
  },
  {
    id: 4,
    title: 'Country',
    placeholder: 'United Kingdom',
  },
];
const bankData: personalDetailsDataType[] = [
  {
    id: 0,
    title: 'Bank Account Number',
    placeholder: '204356XXXXXXX',
  },
  {
    id: 1,
    title: 'Account Holder’s Name',
    placeholder: 'Abhiraj Sisodiya',
  },
  {
    id: 2,
    title: 'IFSC Code',
    placeholder: 'SBIN00428',
  },
];
