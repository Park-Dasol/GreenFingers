import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {Button, Icon} from 'native-base';
import styled from 'styled-components';
import {Littlechip} from '../../assets/theme/roomstyle';
import RadioButtonRN from 'radio-buttons-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector, useDispatch} from 'react-redux';
import {createRoom} from '../../api/room';
import {changeRoom} from '../../reducers/roomReducer';
const data = [{label: '거실'}, {label: '욕실'}];
const img_data = [
  {uri: '../../assets/images/mainroom.jpg'},
  {uri: '../../assets/images/yellowplant.jpg'},
];

const TextInputBox = styled.View`
  background-color: white;
  height: 50px;
  margin: 20px 25px 20px 25px;
  padding-left: 10px;
  border: 0.4px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;
const AddButton = styled.TouchableOpacity`
  height: 40px;
  margin-bottom: 10px;
  padding: 2px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
`;

// 사진 선택 영역 컨테이너
const ImageArea = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;

// 사진 선택 영역 박스
const ImageBox = styled.TouchableOpacity`
  flex: 1;
  background-color: white;
  margin: 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const RoomModal = props => {
  // image에 image.path 저장
  const [image, setImage] = useState(
    'http://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png',
  );
  const [mime, setMime] = useState('image/jpeg');
  const [roomName, setRoomName] = useState('');
  const {uid} = useSelector(state => ({
    uid: state.authReducer.uid,
  }));
  const dispatch = useDispatch();
  const roomchange = () => dispatch(changeRoom('plus'));
  // 카메라이용하여 사진 저장
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
        setMime(image.mime);
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString());
      });
  };
  // 갤러리에서 사진 저장
  const choosePhotoFromLibrary = () => {
    console.log(uid);
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
        setMime(image.mime);
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString());
      });
  };
  // 모달 닫기
  const closeModal = (bool, data) => {
    props.changeModalVisible(bool);
    props.setData(data);
  };

  const setData = data => {
    setChooseData(data);
  };

  // 방 등록
  const plusRoom = async () => {
    console.log(image);
    const formData = new FormData();
    formData.append('roomName', roomName);
    formData.append('theme', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    await createRoom(formData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    closeModal(false, 'Plus');
    await roomchange();
  };

  bs = React.createRef();

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        {/* close 버튼 */}
        <View style={styles.modaltop}>
          <TouchableOpacity
            onPress={() => closeModal(false, 'Cancel')}
            style={styles.closebtn}>
            <Icon
              type="Ionicons"
              name="close-outline"
              style={{color: 'green', fontSize: 40}}></Icon>
          </TouchableOpacity>
        </View>
        {/* 내용 */}
        <View style={styles.content}>
          {/* 방이름입력 */}
          <View style={styles.input}>
            <Littlechip>
              <Text style={styles.chiptext}>방 이름</Text>
            </Littlechip>
            <TextInputBox style={{marginBottom: 10}}>
              <TextInput
                placeholder="방 이름"
                onChangeText={setRoomName}
                value={roomName}
              />
            </TextInputBox>
          </View>
          {/* 사진등록 */}
          <View style={styles.photo}>
            <Littlechip>
              <Text style={styles.chiptext}>사진 등록</Text>
            </Littlechip>
            <ImageArea>
              {/* 갤러리에서 사진 고르기 */}
              <ImageBox onPress={choosePhotoFromLibrary}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="image-multiple"
                  style={{fontSize: 20, color: 'rgba(0,0,0,0.7)'}}
                />
                <Text style={{fontSize: 12, marginTop: 1}}>사진 선택</Text>
              </ImageBox>
              {/* 카메라로 사진 찍기 */}
              <ImageBox onPress={takePhotoFromCamera}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="camera"
                  style={{fontSize: 20, color: 'rgba(0,0,0,0.7)'}}
                />
                <Text style={{fontSize: 11, marginTop: 1}}>사진 촬영</Text>
              </ImageBox>
            </ImageArea>
          </View>
        </View>
        <Littlechip style={{marginTop: 10}}>
          <Text style={styles.chiptext}>Preview</Text>
        </Littlechip>
        <Image
          source={{
            uri: image,
          }}
          style={{height: 60, width: 60, marginLeft: 20, marginTop: 10}}
          imageStyle={{borderRadius: 15}}></Image>
        {/* 저장 버튼 */}
        <View style={styles.button}>
          <AddButton onPress={() => plusRoom()}>
            <ButtonText>저장</ButtonText>
            <Icon
              type="Ionicons"
              name="checkmark-circle-outline"
              style={{fontSize: 20}}></Icon>
          </AddButton>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modal: {
    height: HEIGHT - 200,
    paddingTop: 10,
    width: WIDTH - 60,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
  },
  modaltop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    // backgroundColor: "rgba(52,176,80,0.1)",
    width: WIDTH - 80,
    marginLeft: 20,
    flex: 1,
  },
  content: {
    flex: 9,
  },
  chiptext: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  optionlong: {
    marginHorizontal: 5,
    flex: 0.5,
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 20,
  },
  optiontext: {
    marginLeft: 50,
    backgroundColor: 'transparent',
    fontWeight: '600',
  },
  buttons: {
    margin: 20,
    justifyContent: 'center',
    marginBottom: 80,
  },
  button: {
    marginTop: 15,
    marginBottom: 20,
  },
  changeroom: {
    flex: 2,
  },
  input: {
    flex: 2,
  },
  photo: {
    flex: 3,
  },
});
export {RoomModal};
