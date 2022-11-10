import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { withNavigation } from 'react-navigation';

import { authentication } from '../firebase';
import {createUserWithEmailAndPassword} from"firebase/auth";
import {signInWithEmailAndPassword, signOut} from"firebase/auth";


const TestScreen = ({route,navigation}) => {

    const [isSignedIn,setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const RegisterUser = () =>{
   
      createUserWithEmailAndPassword(authentication,email, password)
      .then((re)=> {   
        console.log(re);
        // setIsSignedIn(true)
      })
      .catch((re)=>{
       console.log(re);
       } )
  }

  const SignInUser = () =>{
   
    signInWithEmailAndPassword(authentication,email, password)
    .then((re)=> {   
      // console.log(re);
      setIsSignedIn(true);
      alert('SignedIn');
    })
    .catch((err)=>{
     alert(err);
     } )
}


const SignOutUser = () =>{
   
  signOut(authentication)
  .then((re)=> {   
    // console.log(re);
    setIsSignedIn(false);
    alert('SignedOut');
  })
  .catch((err)=>{
   console.log(err);
   } )
}



  

  return (
    <KeyboardAvoidingView
    style= {styles.container}
    behavior="padding">
       <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        {/* {
         isSignedIn == true?
         alert('SignIn Success!!')
         :
         alert('Logged Out')
        
      } */}
      </View>



      <View style={styles.buttonContainer}>
        

        <TouchableOpacity
           onPress={RegisterUser}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
   
        <TouchableOpacity
           onPress={SignInUser}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>SignIn</Text>
        </TouchableOpacity>
        <TouchableOpacity
           onPress={SignOutUser}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>SignOut</Text>
        </TouchableOpacity>

      
      </View>

    </KeyboardAvoidingView>
  )
}

export default TestScreen




// const LoginScreen = () => {
  
//   const navigation = useNavigation()

  

//     return unsubscribe
//   }, [])

  
//   const handleLogin = () => {
//     auth
//       .signInWithEmailAndPassword(email, password)
//       .then(userCredentials => {
//         const user = userCredentials.user;
//         console.log('Logged in with:', user.email);
//       })
//       .catch(error => alert(error.message))
//   }

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior="padding"
//     >
     
      
//     </KeyboardAvoidingView>
//   )
// }

// export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})