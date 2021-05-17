'use strict';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Header, Content} from 'native-base';
import {
  ViroARScene,
  ViroText,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroMaterials,
} from '@viro-community/react-viro';
// import pizzaObj from '../../13917_Pepperoni_v2_l2.obj';
// import pizzaMtl from '../../13917_Pepperoni_v2_l2.mtl';
// import pizzaDiffuse from '../../13917_Pepperoni_diffuse.jpg';
// import pizzaPlate from '../../plate_diffuse.jpg';

const physicsBody = {
  type: 'Dynamic',
  mass: 25,
  enabled: true,
  useGravity: true,
  restitution: 0.35,
  friction: 0.75,
};

export function ArIntroScreen({navigation}) {
  return <ViroARSceneNavigator initialScene={{scene: ArIntro}} />;
}
function ArIntro({navigation}) {
  return (
    // <View>
    //   <Text>AR</Text>
    // </View>

    <ViroARScene>
      <ViroAmbientLight color={'#aaaaaa'} />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, -1, -0.2]}
        position={[0, 3, 1]}
        color="yellow"
        castsShadow={true}
        intensity={2500}
      />
      {/* <ViroText
        text="Hello World"
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      /> */}
      <Viro3DObject
        position={[0, -1, -1]}
        scale={[0.08, 0.08, 0.09]}
        rotation={[180, 90, 180]}
        source={require('../../objects/indoor/plant_02.obj')}
        resources={[
          require('../../objects/indoor/plant_02.mtl'),
          require('../../objects/indoor/plant_2_COL.jpg'),
          require('../../objects/indoor/plant_2_NOR.jpg'),
          require('../../objects/indoor/plant_2_vl.jpg'),
        ]}
        type="OBJ"
        dragType="FixedDistance"
        onDrag={() => {}}
      />

      {/* <ViroBox
        position={[0, -0.5, -1]}
        scale={[0.3, 0.3, 0.1]}
        materials={['grid']}
      /> */}
    </ViroARScene>
  );
}
ViroMaterials.createMaterials({
  myPlant: {
    shininess: 2.0,
    diffuseTexture: [
      require('../../objects/d5/Default_Base_Color.png'),
      require('../../objects/d5/Default_Height.png'),
      require('../../objects/d5/Default_Metallic.png'),
      require('../../objects/d5/Default_Mixed_AO.png'),
      require('../../objects/d5/Default_Normal_OpenGL.png'),
      require('../../objects/d5/Default_Opacity.png'),
      require('../../objects/d5/Default_Roughness.png'),
    ],
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: 'red',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
