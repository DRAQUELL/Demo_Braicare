import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import { withNavigation } from 'react-navigation';

const HomeScreen = ({route,navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(auth,email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }



  

  return (
    <KeyboardAvoidingView
    style= {styles.container}
    behavior="padding">
       



      <View style={styles.buttonContainer}>
        

        <TouchableOpacity
           onPress={()=>navigation.navigate('tumor_detection')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Tumor Detection</Text>
        </TouchableOpacity>


        <TouchableOpacity
           onPress={()=>navigation.navigate('Aboutus')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
           onPress={()=>navigation.navigate('Contactus')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
           onPress={()=>navigation.navigate('chatbot')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Chat Bot</Text>
        </TouchableOpacity>
        
      </View>

    </KeyboardAvoidingView>
  )
}

export default HomeScreen




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
    margin: 20,
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