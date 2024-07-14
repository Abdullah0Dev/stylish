import AsyncStorage from '@react-native-async-storage/async-storage';

// value type
type AsyncStorageValue = number | boolean | object | string | null;

// stringify the value
const stringifyValue = (value: AsyncStorageValue): string => {
  return typeof value === 'string' ? value : JSON.stringify(value);
};

// parse the value
const parseValue = (value: string | null): AsyncStorageValue => {
  if (value === null) return null;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value; // if failed to parse it..
  }
};

// SET item
const setItem = async (key: string, value: AsyncStorageValue) => {
  try {
    const stringValue = stringifyValue(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.log(`Couldn't store item:`, error);
  }
};

// GET item
const getItem = async (key: string): Promise<AsyncStorageValue> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return parseValue(value);
  } catch (error) {
    console.log(`Couldn't retrieve the value:`, error);
    return null;
  }
};

// REMOVE item
const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`Couldn't remove the value:`, error);
  }
};

export { setItem, getItem, removeItem };
