import {
  View,
  Text,
  Animated,
  Image,
  TextInput,
  TouchableOpacity,
  Easing,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {icons} from '../constants';

type FormFieldProps = {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  setError?: (error: string) => void;
  error: string;
  [key: string]: any; // add more props ...props
};
// make reusable components to make our code clean
const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  setError,
  error,
  ...props
}) => {
  // states
  const [showPassword, setShowPassword] = useState(false);
  const [shakeAnimation] = useState(new Animated.Value(0));
  // let's handle the error
  const shake = () => {
    shakeAnimation.setValue(0);
    Animated.timing(shakeAnimation, {
      toValue: 4,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start(() => {
      // clear the animation after a period of time
      setTimeout(() => {
        setError?.(''); // hide the error
      }, 3000);
    });
  };
  // if error shake
  useEffect(() => {
    if (error) {
      shake();
    }
  }, [error]);

  // get Icon source
  const getIconSource = () => {
    if (title === 'Password') return icons.lock;
    if (title === 'Email') return icons.mail;
    return icons.user; //default one!
  };

  return (
    <View className={otherStyles + ' '}>
      <Animated.View
        // handle shake here with interpolate ..
        style={{
          transform: [
            {
              translateX: shakeAnimation.interpolate({
                inputRange: [0, 1, 2, 3, 4], // when this do the output</View>
                outputRange: [0, -10, 10, -10, 0],
              }),
            },
          ],
        }}
        // let's continue styling it:)
        className={`flex flex-row items-center justify-center rounded-xl w-full h-[72px] px-4 bg-[#F3F3F3] border-2 border-[#A8A8A9] focus:border-black-200 ${
          error ? 'border border-red-600  ' : ''
        } `}>
        {/* icon => user icon, or password, or email... */}
        <Image
          source={getIconSource()}
          className="w-8 h-8 mr-1 bg-b"
          resizeMode="contain"
        />
        {/* TextInput */}
        <TextInput
          className="flex-1 text-black-100 font-semibold text-lg"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor={'#676767'}
          secureTextEntry={title === 'Password' && !showPassword} // hide it if it's the password... | set showpassword to false
          onBlur={() => error && shake()}
          {...props}
        />
        {/* eye switch when it's a password */}

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              // if show password is true so hide the password else show it
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      {/* display the error here if there... */}
      {error && (
        <Animated.View
          className={` text-red-500 font-pregular text-sm mt-3 self-center `}>
          {error}
        </Animated.View>
      )}
    </View>
  );
};

export default FormField;
