import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Alert,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Container, Icon, Button, Content} from 'native-base';
import {RoomModal} from '../../components/main/RoomModal';
import {HomeEditModal} from '../../components/main/HomeEditModal';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {useDispatch, useSelector} from 'react-redux';
import {findRoom} from '../../api/room';
import {Weather} from '../../components/main/Weather';
import {
  getCurrentPosition,
  Geolocation,
} from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';

import room from '../../reducers/roomReducer';

//modal
import MessageModal from '../../components/auth/Messagemodal';

// api
import {getMessage} from '../../api/auth';

// import Modal from "react-native-modal";

// import PropTypes from "prop-types";
const win = Dimensions.get('window');

function CustomDrawerContent(props) {
  const [myMessages, setMyMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailMessage, setDetailMessage] = useState('');

  useEffect(async () => {
    const messageResponse = await getMessage();
    setMyMessages(messageResponse.data.response);
  }, []);

  // const MessageDetail = item => {
  //   console.log(item);
  //   Alert.alert(item.title, item.content, [{text: '확인'}]);
  // };

  // const renderItem = ({item}) => {
  //   return (
  //     <DrawerItem label={item.title} onPress={() => messageDetailModal(item)} />
  //   );
  // };

  // const flatMessage = data => {
  //   return (
  //     <View>
  //       <FlatList
  //         data={data}
  //         renderItem={renderItem}
  //         keyExtractor={item => String(item.id)}
  //       />
  //       <Modal
  //         animationType="fade"
  //         transparent={true}
  //         visible={modalVisible}
  //         onRequestClose={() => {
  //           setModalVisible(!modalVisible);
  //         }}>
  //         <MessageModal
  //           setModalVisible={setModalVisible}
  //           message={detailMessage}></MessageModal>
  //       </Modal>
  //     </View>
  //   );
  // };

  const messageDetailModal = item => {
    setDetailMessage(item);
    setModalVisible(!modalVisible);
  };

  const allMessages = data => {
    return data.map((item, i) => {
      return (
        <DrawerItem
          key={i}
          label={item.title}
          style={{backgroundColor: '#fafafa'}}
          onPress={() => messageDetailModal(item)}
        />
      );
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* <Text>알람목록</Text> */}
      <DrawerItemList {...props} />
      {allMessages(myMessages)}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <MessageModal
          setModalVisible={setModalVisible}
          message={detailMessage}></MessageModal>
      </Modal>
    </DrawerContentScrollView>
  );
}

function Home({navigation}) {
  // redux에서 state값 불러오기
  const {roomnum} = useSelector(state => ({
    roomnum: state.roomReducer.roomnum,
  }));
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isModalVisible2, setisModalVisible2] = useState(false);
  const [ChooseData, setChooseData] = useState();
  const [roomData, setRoomData] = useState([]);

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const changeModalVisible2 = bool => {
    setisModalVisible2(bool);
  };
  const setData = data => {
    setChooseData(data);
  };
  console.log(ChooseData);
  const [loading, setLoading] = useState(false);
  // 방 정보 조회
  const getRoomData = () => {
    findRoom()
      .then(res => {
        setRoomData(res.data.response);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  const [info, setInfo] = useState({
    name: 'loading !!',
    temp: 'loading',
    humidity: 'loading',
    desc: 'loading',
    icon: 'loading',
  });

  useEffect(async () => {
    await getRoomData();
    console.log(roomData[0].plantList[0]);
  }, [roomnum]);
  // const onEndReached = () => {
  //   if (loading) {
  //     return;
  //   } else {
  //     getRoomData();
  //   }
  // };
  // asking for location permission

  const renderItem = ({item}) => {
    return (
      <View style={styles.rooms}>
        <View style={styles.roominfo}>
          <Text
            style={styles.roomname}
            onPress={() => {
              console.log('click room name');
              navigation.navigate('Room', {
                rid: item.rid,
                rname: item.roomName,
                plantList: item.plantList,
                pid: item.pid,
              });
            }}>
            {item.roomName}
          </Text>
          <Text
            style={styles.gotoroom}
            onPress={() => {
              console.log('click room name');
              navigation.navigate('Room', {
                rid: item.rid,
                rname: item.roomName,
                plantList: item.plantList,
                pid: item.pid,
              });
            }}>
            {item.plantList.length}개의 식물 보러가기
          </Text>
        </View>
        {item.plantList.length > 1 ? (
          <View>
            <View style={styles.abovecard}>
              <TouchableOpacity
                style={styles.plantcard}
                onPress={() => {
                  console.log('click left');
                  navigation.navigate('Room', {
                    rid: item.rid,
                    rname: item.roomName,
                    plantList: item.plantList,
                    pid: item.pid,
                  });
                }}>
                <Image
                  source={{uri: item.plantList[0].image}}
                  style={styles.plantimg}
                />
                <View style={styles.plantinfo}>
                  <Text style={styles.plantname}>
                    {item.plantList[0].nickname}
                  </Text>
                  <View style={styles.rightinfo}>
                    <View style={styles.water}>
                      <Text style={styles.watertext}>물 준 날짜</Text>
                      <Text style={styles.waterdate}>
                        {item.plantList[0].lastDate}
                      </Text>
                    </View>
                    <Image
                      source={require('../../assets/images/plant1.png')}
                      style={styles.planticon}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.plantcard}
                onPress={() => {
                  console.log('click right');
                  navigation.navigate('Room', {
                    rid: item.rid,
                    rname: item.roomName,
                    plantList: item.plantList,
                    pid: item.pid,
                  });
                }}>
                <Image
                  source={{uri: item.plantList[0].image}}
                  style={styles.plantimg}
                />
                <View style={styles.plantinfo}>
                  <Text style={styles.plantname}>
                    {item.plantList[1].nickname}
                  </Text>
                  <View style={styles.rightinfo}>
                    <View style={styles.water}>
                      <Text style={styles.watertext}>물 준 날짜</Text>
                      <Text style={styles.waterdate}>
                        {item.plantList[1].lastDate}
                      </Text>
                    </View>
                    <Image
                      source={require('../../assets/images/plant1.png')}
                      style={styles.planticon}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            {item.plantList.length == 1 ? (
              <View style={styles.abovecard}>
                <TouchableOpacity
                  style={styles.plantcard}
                  onPress={() => {
                    console.log('click left');
                    navigation.navigate('Room', {
                      rid: item.rid,
                      rname: item.roomName,
                      plantList: item.plantList,
                      pid: item.pid,
                    });
                  }}>
                  <Image
                    source={{uri: item.plantList[0].image}}
                    style={styles.plantimg}
                  />
                  <View style={styles.plantinfo}>
                    <Text style={styles.plantname}>
                      {item.plantList[0].nickname}
                    </Text>
                    <View style={styles.rightinfo}>
                      <View style={styles.water}>
                        <Text style={styles.watertext}>물 준 날짜</Text>
                        <Text style={styles.waterdate}>
                          {item.plantList[0].lastDate}
                        </Text>
                      </View>
                      <Image
                        source={require('../../assets/images/plant1.png')}
                        style={styles.planticon}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.abovecard}>
                <TouchableOpacity
                  style={styles.plantcard2}
                  onPress={() => {
                    console.log('click left');
                    navigation.navigate('Room', {
                      rid: item.rid,
                      rname: item.roomName,
                      plantList: item.plantList,
                      pid: item.pid,
                    });
                  }}>
                  <Text style={styles.gotoaddplant}>please add plant</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <View style={{flex: 0.1}}>
        <Image
          style={{
            height: win.height,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          source={require('../../assets/images/mainroom.jpg')}
        />
      </View>
      {/* 오른쪽 상단 아이콘 */}
      <View style={styles.mainicons}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon
            type="Ionicons"
            name="notifications-outline"
            style={styles.bell}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeModalVisible2(true)}>
          <Icon
            type="Ionicons"
            name="options-outline"
            style={styles.option}></Icon>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible2}
          nRequestClose={() => changeModalVisible2(false)}
          style={styles.plantmodal}>
          <HomeEditModal
            changeModalVisible={changeModalVisible2}
            setData={setData}
          />
        </Modal>
      </View>
      {/* 홈이름 */}
      <View style={styles.mainname}>
        <Text style={styles.nametext}>Dasol House</Text>
        <Icon
          type="Ionicons"
          name="pencil-outline"
          style={styles.pencil}
          onPress={() => {
            console.log('click pencil');
          }}></Icon>
      </View>
      {/* 날씨 */}
      <Weather />
      {/* 방추가아이콘 */}
      <View style={styles.add}>
        <TouchableOpacity onPress={() => changeModalVisible(true)}>
          <Icon
            type="Ionicons"
            name="add-circle-outline"
            style={styles.addicon}></Icon>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          nRequestClose={() => changeModalVisible(false)}
          style={styles.plantmodal}>
          <RoomModal
            changeModalVisible={changeModalVisible}
            setData={setData}
          />
        </Modal>
      </View>
      {/* 방리스트 */}
      <SafeAreaView>
        <FlatList
          data={roomData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled
        />
      </SafeAreaView>
    </View>
  );
}

const Drawer = createDrawerNavigator();
export function HomeScreen() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Feed"
        component={Home}
        options={{
          // drawerLabel: '알림목록',
          title: '알림목록',
          drawerIcon: () => null,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    // ImageBackground:''
    flex: 0,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  option: {
    paddingLeft: 10,
    color: 'white',
  },
  bell: {
    color: 'white',
  },
  mainicons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    // backgroundColor: "yellow",
    marginTop: 30,
    marginBottom: 0,
  },
  mainname: {
    // backgroundColor: "yellow",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 35,
    marginBottom: 30,
    fontFamily: 'Cochin',
  },
  nametext: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  pencil: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.8)',
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginLeft: 10,
    padding: 2,
  },
  now: {
    // backgroundColor: "yellow",
    alignItems: 'center',
    marginBottom: 10,
  },
  middlebox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    height: 40,
  },
  roominfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    paddingHorizontal: 15,
    color: 'white',
    fontWeight: '300',
  },
  add: {
    alignItems: 'center',
    marginTop: 10,
  },
  addicon: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 'bold',
    fontSize: 50,
  },
  roomname: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    paddingLeft: 30,
    paddingTop: 20,
    // paddingBottom: 10,
    flex: 0.4,
    // marginTop: 40,
  },
  gotoroom: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    paddingTop: 25,
    flex: 0.4,
    // backgroundColor: 'yellow',
  },
  abovecard: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    // padding: 20,
  },
  plantcard: {
    flex: 5,
    margin: 3,
    height: win.height * 0.2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // alignItems: "center",
  },
  plantcard2: {
    flex: 5,
    margin: 3,
    height: win.height * 0.2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plantname: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  plantimg: {
    height: 100,
    width: null,
    // marginTop: 10,
    borderRadius: 10,
    // marginHorizontal: 10,
    // alignItems: "center",
  },
  plantinfo: {
    flexDirection: 'row',
    // backgroundColor: "red",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  planticon: {
    height: 30,
    width: 30,
  },
  rightinfo: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: "yellow",
  },
  watertext: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  waterdate: {
    fontSize: 9,
  },
  gotoaddplant: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});
