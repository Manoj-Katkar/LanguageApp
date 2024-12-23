import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../../i18n';
import CommonButton from '../../components/CommonButton';
import SelectLangModal from '../../components/SelectLangModal';

const Login = () => {
  const [selectLanguage, setSelectLanguage] = useState('English');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    checkLng();
  }, []);

  const checkLng = async () => {
    const lang = await AsyncStorage.getItem('LANG');
    if (lang) {
      i18n.changeLanguage(lang);
      const lng =
        lang === 'en'
          ? 'English'
          : lang === 'hi'
          ? 'हिंदी'
          : lang === 'pa'
          ? 'ਪੰਜਾਬੀ'
          : 'தமிழ்';
      setSelectLanguage(lng);
    }
  };

  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return t('emailRequired');
    if (!emailRegex.test(email)) return t('invalidEmail');
    return '';
  };

  const validatePassword = (password: any) => {
    if (!password) return t('passwordRequired');
    if (password.length < 6) return t('passwordMinLength');
    return '';
  };

  const handleLogin = () => {
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (!emailValidationError && !passwordValidationError) {
      // Proceed with login
      Alert.alert(t('loginSuccess'));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.langView}
        onPress={() => {
          setShowModal(true);
        }}>
        <Text style={styles.lang}>{selectLanguage}</Text>
        <Image
          source={require('../../images/dropdown.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.wish}>{t('welcome')}</Text>
      <Text style={styles.title}>{t('signInHeadline')}</Text>

      <TextInput
        placeholder={t('email')}
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        placeholderTextColor="black"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        placeholder={t('password')}
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
        placeholderTextColor="black"
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <Text style={styles.forgotPass}>{t('forgotPassword')}</Text>
      <CommonButton title={t('login')} onPress={handleLogin} />

      <Text
        onPress={() => navigation.navigate('SignUp')}
        style={styles.linkText}>
        {t('createNewUser')}
      </Text>

      <SelectLangModal
        visible={showModal}
        selectedLang={selectLanguage}
        onClose={() => {
          setShowModal(false);
        }}
        onSelect={async (lang: any) => {
          const lng =
            lang === 'English'
              ? 'en'
              : lang === 'हिंदी'
              ? 'hi'
              : lang === 'ਪੰਜਾਬੀ'
              ? 'pa'
              : 'ta';
          await AsyncStorage.setItem('LANG', lng);
          i18n.changeLanguage(lng);
          setSelectLanguage(lang);
          setShowModal(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    marginLeft: 10,
    tintColor: '#9e9e9e',
  },
  wish: {
    color: 'black',
    fontSize: 40,
    fontWeight: '600',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  linkText: {
    color: 'black',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  forgotPass: {
    alignSelf: 'flex-end',
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    marginBottom: 20,
  },
  langView: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#9e9e9e',
    position: 'absolute',
    top: 30,
    right: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  lang: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Login;
