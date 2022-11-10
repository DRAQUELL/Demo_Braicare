// import { StatusBar } from 'expo-status-bar';
// import * as React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './screens/LoginScreen';
// import HomeScreen from './screens/HomeScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import AboutUsScreen from './screens/AboutUsScreen';
// import ContactUsScreen from './screens/ContactUsScreen';
// import TumorDetectionScreen from './screens/TumorDetectionScreen';
// import ChatBot from './chatBot/index'
// import TestScreen from './screens/TestScreen';

// import axios from 'axios';
// import Config from 'react-native-config';
// import { authentiacation } from './firebase';

// const Stack = createNativeStackNavigator();
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='Login'>
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="Aboutus" component={AboutUsScreen} />
//         <Stack.Screen name="Contactus" component={ContactUsScreen} />
//         <Stack.Screen name="tumor_detection" component={TumorDetectionScreen} />
//         <Stack.Screen name="chatbot" component={ChatBot} />
        
//         <Stack.Screen name="Test" component={TestScreen} />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from "react";

import * as tf from "@tensorflow/tfjs";
import { fetch, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as jpeg from "jpeg-js";

export default function App() {
  const [isTfReady, setTfReady] = useState(false); // gets and sets the Tensorflow.js module loading status
  const [model, setModel] = useState(null); // gets and sets the locally saved Tensorflow.js model
  const [image, setImage] = useState(null); // gets and sets the image selected from the user
  const [predictions, setPredictions] = useState(null); // gets and sets the predicted value from the model
  const [error, setError] = useState(false); // gets and sets any errors

  useEffect(() => {
    (async () => {
      await tf.ready(); // wait for Tensorflow.js to get ready
      setTfReady(true); // set the state 
      console.log('true');
      // bundle the model files and load the model:
      // const model = require("./assets/model.json");
      // const weights = require("./assets/group1-shard1of1.bin");
      // const loadedModel = await tf.loadGraphModel(
      //   bundleResourceIO(model, weights)
      // );

      // setModel(loadedModel); // load the model to the state
      // console.log(loadedModel);
      getPermissionAsync(); // get the permission for camera roll access for iOS users
    })();
  }, []);

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Permission for camera access required.");
      }
    }
  }

  async function handlerSelectImage() {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // on Android user can rotate and crop the selected image; iOS users can only crop 
        quality: 1, // go for highest quality possible
        aspect: [4, 3], // maintain aspect ratio of the crop area on Android; on iOS crop area is always a square
      });
  
      console.response
      if (!response.canceled) {
        const source = { uri: response.assets[0].uri };
        console.log(source);
        setImage(source); // put image path to the state
        const imageTensor = await imageToTensor(source); // prepare the image
        console.log(imageTensor+ 'OK');
        // const predictions = await model.predict(imageTensor); // send the image to the model
        // setPredictions(predictions); // put model prediction to the state
      }
    } catch (error) {
      setError(error);
    }
  }

  async function imageToTensor(source) {
  
    // load the raw data of the selected image into an array
    const response = await fetch(source.uri, {}, { isBinary: true });
    console.log(source + "OK SECOND")

    const rawImageData = await response.arrayBuffer();
    const { width, height, data } = jpeg.decode(rawImageData, {
      useTArray: true, // Uint8Array = true
    });
    
    // remove the alpha channel:
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];
      offset += 4;
    }
    

    // transform image data into a tensor
    const img = tf.tensor3d(buffer, [width, height, 3]); 
  
    // calculate square center crop area
    const shorterSide = Math.min(width, height);
    const startingHeight = (height - shorterSide) / 2;
    const startingWidth = (width - shorterSide) / 2;
    const endingHeight = startingHeight + shorterSide;
    const endingWidth = startingWidth + shorterSide;
  
    // slice and resize the image
    const sliced_img = img.slice(
      [startingWidth, startingHeight, 0],
      [endingWidth, endingHeight, 3]
    );
    const resized_img = tf.image.resizeBilinear(sliced_img, [224, 224]);
    
    // add a fourth batch dimension to the tensor
    const expanded_img = resized_img.expandDims(0);
    
    // normalise the rgb values to -1-+1
    return expanded_img.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity 
        onPress=
        {
           !predictions // Activates handler only if the model has been loaded and there are no predictions done yet
          ? handlerSelectImage
          : () => {}
        }
      ><Text>HELLO</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

