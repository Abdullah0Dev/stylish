<!-- 
 * how to make onboarding screen only appears once:
 1. install asyncStorage library
 2. create a utils/asyncStorage.ts or js
- paste or write down: 
3. on done onboarding store the value
5. modify the route based on the onboarding
 -->
 ```js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a generic type for the value
type AsyncStorageValue = string | number | boolean | object | null;

// Utility function to stringify values if necessary
const stringifyValue = (value: AsyncStorageValue): string => {
    return typeof value === 'string' ? value : JSON.stringify(value);
};

// Utility function to parse values if necessary
const parseValue = (value: string | null): AsyncStorageValue => {
    if (value === null) return null;
    try {
        return JSON.parse(value);
    } catch {
        return value; // Return as string if parsing fails
    }
};

// SET item
const setItem = async (key: string, value: AsyncStorageValue): Promise<void> => {
    try {
        const stringValue = stringifyValue(value);
        await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
        console.log(`Couldn't store the value:`, error);
    }
}

// GET item
const getItem = async (key: string): Promise<AsyncStorageValue> => {
    try {
        const value = await AsyncStorage.getItem(key);
        return parseValue(value);
    } catch (error) {
        console.log(`Couldn't retrieve the value:`, error);
        return null;
    }
}

// REMOVE item
const removeItem = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(`Couldn't remove the value:`, error);
    }
}

 ```