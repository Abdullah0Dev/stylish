import {View, Text} from 'react-native';
import React from 'react';
import {RouteProp} from '@react-navigation/native';

type Props = {};
type RootStackParamList = {
  Search: {query: string} | undefined;
};
type ScreenRouteProps = RouteProp<RootStackParamList, 'Search'>;

interface SearchProps {
  route: ScreenRouteProps;
}

const SearchTab: React.FC<SearchProps> = ({route}) => {
  const {query} = route.params || {}; // destructure the query from route
  return (
    <View>
      <Text>SearchTab</Text>
      <Text>Search For {query} </Text>
    </View>
  );
};

export default SearchTab;
