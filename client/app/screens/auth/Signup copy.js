import React from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  Button,
  StyleProvider,
  Icon,
} from 'native-base';
import {AuthButton, AuthButtonText} from '../../assets/theme/authstyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useState} from 'react';

export function SignupScreen({navigation}) {
  const [isIDFocused, setIsIDFocused] = useState(false);
  const [isPWFocused, setIsPWFocused] = useState(false);
  // const [isNNFocused, setIsNNFocused] = useState(false);
  const [isPWCFocused, setIsPWCFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onSubmit = () => {
    // console.log('data', data);
    console.log(email, password, passwordConfirm);
  };

  const validateEmail = userEmail => {
    console.log(userEmail);
    //e메일 형식
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (regEmail.test(userEmail) === false) {
      console.log('이메일 형식이 맞지 않습니다');
      setEmail(userEmail);
      return false;
    } else {
      setEmail(userEmail);
      console.log('Email is Correct');
    }
  };

  const validatePassword = userPW => {
    console.log(userPW);
    // 대문자 최소 1개, 소문자 1개 이상, 숫자 1개이상, 특수문자 1개 이상, 8자리이상
    let regPW = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    if (regPW.test(userPW) === false) {
      console.log('비밀번호 형식이 맞지 않습니다');
      setPassword(userPW);
      return false;
    } else {
      setPassword(userPW);
      console.log('PW is Correct');
    }
  };

  const validatePWC = userPWC => {
    console.log(userPWC);
    if (userPWC === password) {
      console.log('비밀번호가 일치하지 않습니다');
      setPasswordConfirm(userPWC);
      return false;
    } else {
      setPasswordConfirm(userPWC);
      console.log('PWC is Correct');
    }
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <Container style={styles.container}>
          <View style={styles.logo}>
            <View style={styles.halftop}>
              <Text style={styles.logotext}>Green</Text>
            </View>
            <View style={styles.halfbottom}>
              <Text style={styles.logotext}>Fingers</Text>
              <Text style={styles.signup}>회원가입</Text>
            </View>
          </View>
          <View style={styles.form}>
            <TextInput
              style={[
                styles.input,
                {marginTop: 30},
                isIDFocused ? styles.focused : styles.blurred,
              ]}
              onBlur={() => setIsIDFocused(false)}
              onFocus={() => setIsIDFocused(true)}
              placeholder="Email"
              onChangeText={userEmail => setEmail(userEmail)}
              autoCapitalize="none"
            />
            <TextInput
              style={[
                styles.input,
                isPWFocused ? styles.focused : styles.blurred,
              ]}
              onBlur={() => setIsPWFocused(false)}
              onFocus={() => setIsPWFocused(true)}
              placeholder="비밀번호"
              onChangeText={userEmail => setPassword(userEmail)}
              secureTextEntry={true}
            />
            <TextInput
              style={[
                styles.input,
                isPWCFocused ? styles.focused : styles.blurred,
              ]}
              onBlur={() => setIsPWCFocused(false)}
              onFocus={() => setIsPWCFocused(true)}
              placeholder="비밀번호 확인"
              onChangeText={userEmail => setPasswordConfirm(userEmail)}
              secureTextEntry={true}
            />

            <AuthButton full style={{marginTop: 20}}>
              <AuthButtonText title="Home" onPress={onSubmit}>
                회원가입
              </AuthButtonText>
            </AuthButton>
          </View>
        </Container>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
  },
  logo: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 60,
  },
  halftop: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  halfbottom: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  logotext: {
    fontSize: 35,
    fontWeight: '700',
    color: '#29582C',
  },
  signup: {
    fontSize: 12,
    marginTop: 8,
  },
  form: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  idcheckbtn: {
    backgroundColor: 'transparent',
    paddingRight: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 0, //테두리 그림자 없애는거
  },
  textpadding: {
    paddingRight: 1,
    color: 'grey',
    fontSize: 12,
    marginHorizontal: 0,
  },
  focused: {
    borderColor: '#8AD169',
    borderTopWidth: 1.1,
    borderBottomWidth: 1.1,
    borderLeftWidth: 1.1,
    borderRightWidth: 1.1,
  },
  blurred: {
    borderColor: '#ECECE2',
  },
  input: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: 'white',
    width: '100%',
    paddingLeft: 15,
  },
});

// 밸리데이션
//https://stackoverflow.com/questions/54204827/react-native-form-validation
// reg
// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
// https://stackoverflow.com/questions/62727346/how-to-validate-using-useeffect
