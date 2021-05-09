import React, {useState, useEffect} from 'react';
import {Modal, Text, TouchableOpacity} from 'react-native';

//redux, firebase, google
import {useDispatch, useSelector} from 'react-redux';
import {addUid, addUser} from '../../reducers/authReducer';
import {clearUser} from '../../reducers/profileReducer';
import firebase from '../../components/auth/firebase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// GoogleSignin.configure({});

// style
import styled from 'styled-components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Icon} from 'native-base';

// modal
import LogoutModal from '../../components/profile/LogoutModal';
import CompleteModal from '../../components/diary/modal/CompleteModal';

// 프로필 전체 페이지 컨테이너
const ProfileContainer = styled.View`
  height: ${hp('90%')}px;
  padding: 30px;
`;

// 프로필 영역
const ProfileBox = styled.View`
  height: ${hp('15%')}px;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  padding-left: 30px;
  padding-right: 10px;
`;

// 프로필 사진 영역
const ProfileImgBox = styled.View`
  flex: 1;
`;
// 프로필 사진
const ProfileImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

// 유저 정보 영역(이메일, 보유 식물 수)
const ProfileInfo = styled.View`
  flex: 4;
  height: 40%;
  justify-content: center;
  padding: 10px;
  margin-left: 10px;
`;

// 메뉴 영역
const MenuBox = styled.View`
  background-color: white;
  border-radius: 10px;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 8px;
  margin-bottom: 8px;
`;
//메뉴 영역 래퍼
const MenuWrap = styled.View`
  flex: 3;
`;

// 메뉴 한개
const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: ${hp('8%')}px;
`;

const DeleteUser = styled.View`
  flex: 0.2;
  align-items: flex-end;
  justify-content: center;
  padding-right: 8px;
  margin-top: 5px;
`;

export default function Profile({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const dispatch = useDispatch();
  const clearUserInfo = () => dispatch(clearUser());

  const {image, email, provider, plants} = useSelector(state => ({
    image: state.profileReducer.profile,
    email: state.profileReducer.useremail,
    provider: state.profileReducer.provider,
    plants: state.plantReducer.userPlants,
  }));

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      if (provider === 'google.com') {
        await GoogleSignin.signOut();
      }
      await clearUserInfo();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProfileContainer>
      <ProfileBox>
        <ProfileImgBox>
          <ProfileImg
            source={{
              uri:
                image ||
                'https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg',
            }}
          />
        </ProfileImgBox>
        <ProfileInfo>
          <Text style={{fontSize: 15, width: 200}}>{email}</Text>
          <Text style={{fontSize: 15, color: 'grey'}}>
            보유 식물 {plants.length}개
          </Text>
        </ProfileInfo>
      </ProfileBox>
      <MenuWrap>
        <MenuBox>
          <MenuItem onPress={() => navigation.navigate('추천')}>
            <Icon type="MaterialCommunityIcons" name="thumb-up-outline" />
            <Text style={{marginLeft: 20}}>식물 추천 받기</Text>
          </MenuItem>
        </MenuBox>
        <MenuBox>
          <MenuItem onPress={() => navigation.navigate('ProfileImgChange')}>
            <Icon type="MaterialCommunityIcons" name="autorenew" />
            <Text style={{marginLeft: 20}}>프로필 사진 변경</Text>
          </MenuItem>
          <MenuItem onPress={() => navigation.navigate('PasswordChange')}>
            <Icon type="MaterialCommunityIcons" name="form-textbox-password" />
            <Text style={{marginLeft: 20}}>비밀번호 재설정</Text>
          </MenuItem>
          <MenuItem
            onPress={() => {
              setModalVisible(true);
            }}>
            <Icon type="MaterialCommunityIcons" name="logout" />
            <Text style={{marginLeft: 20}}>로그아웃</Text>
          </MenuItem>
        </MenuBox>
        <DeleteUser>
          <TouchableOpacity onPress={() => navigation.navigate('Withdrawal')}>
            <Text style={{color: 'grey'}}>회원탈퇴</Text>
          </TouchableOpacity>
        </DeleteUser>
      </MenuWrap>

      {/* 로그아웃 확인 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <LogoutModal
          setModalVisible={setModalVisible}
          setCompleteModalVisible={setCompleteModalVisible}
        />
      </Modal>

      {/* 로그아웃 완료 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={completeModalVisible}
        onRequestClose={() => {
          setCompleteModalVisible(!completeModalVisible);
        }}>
        <CompleteModal
          content="로그아웃 되었습니다."
          signOut={signOut}
          setModalVisible={setModalVisible}
          setCompleteModalVisible={setCompleteModalVisible}
        />
      </Modal>
    </ProfileContainer>
  );
}
