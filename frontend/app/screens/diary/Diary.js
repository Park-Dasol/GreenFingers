// react
import React from "react";
import "react-native-gesture-handler";
import { ScrollView } from "react-native";

// styled-component
import styled from "styled-components";

// native-base
import {
  Container,
  Tab,
  Tabs,
  ScrollableTab,
  Thumbnail,
  TabHeading,
  Icon,
} from "native-base";

// library
import { CalendarView } from "../../components/diary/Calendar";

// components
import Feed from "../../components/diary/Feed";

// 나중에 Tab을 분리해서 컴포넌트화 할 예정
// import PlantTab from "../../components/diary/Tab";

const PlusButton = styled.TouchableOpacity`
  width: 50;
  height: 50;
  border-radius: 30;
  background-color: ${({ theme }) => theme.colors.darkGreen};
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20;
  right: 20;
`;

export function DiaryScreen({ navigation }) {
  return (
    <Container>
      <Tabs
        renderTabBar={() => (
          <ScrollableTab
            tabsContainerStyle={{ justifyContent: "flex-start" }}
            style={{
              height: 80,
              backgroundColor: "#F9F9F9",
              borderWidth: 0,
            }}
          />
        )}
        tabBarUnderlineStyle={{ height: 2, backgroundColor: "#8AD169" }}
      >
        <Tab
          heading={
            <TabHeading
              style={{
                backgroundColor: "#F9F9F9",
              }}
            >
              <Thumbnail
                source={{
                  uri:
                    "http://cereshome.co.kr/web/product/small/20200420/659ff6db3048df1a413a053655c22ebb.jpg",
                }}
              />
            </TabHeading>
          }
        >
          <ScrollView style={{ backgroundColor: "#F9F9F9" }}>
            <CalendarView />
            <Feed />
          </ScrollView>
        </Tab>
        <Tab
          heading={
            <TabHeading
              style={{
                backgroundColor: "#F9F9F9",
              }}
            >
              <Thumbnail
                source={{
                  uri:
                    "http://cereshome.co.kr/web/product/small/20200420/659ff6db3048df1a413a053655c22ebb.jpg",
                }}
              />
            </TabHeading>
          }
        >
          <CalendarView />
        </Tab>
        <Tab
          heading={
            <TabHeading
              style={{
                backgroundColor: "#F9F9F9",
              }}
            >
              <Thumbnail
                source={{
                  uri:
                    "http://cereshome.co.kr/web/product/small/20200420/659ff6db3048df1a413a053655c22ebb.jpg",
                }}
              />
            </TabHeading>
          }
        >
          <CalendarView />
        </Tab>
        {/* <PlantTab /> */}
      </Tabs>
      <PlusButton
        title=""
        onPress={() => {
          navigation.navigate("DiaryWrite");
        }}
      >
        <Icon name="md-add" style={{ color: "white" }} />
      </PlusButton>
    </Container>
  );
}
