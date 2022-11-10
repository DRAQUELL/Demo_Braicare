import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';
import Msg from './msg';
import {data} from './data';

let chats = [{msg: 'Hello! How may I help you?', incomingMsg: true}];
let responses = [];
let i = 0;
const ChatBot = () => {
  const [msg, setMsg] = useState('');
  const [chatList, setChatList] = useState([{msg: 'Hello! How may I help you?', incomingMsg: true}]);

  const getAnswer = q => {
    // for (let i = 0; i < data.length; i++) {
      if (i< data.length) {

        chats = [...chats, {msg: data[i++].reply, incomingMsg: true}];
        setChatList([...chats].reverse());
        return;
      }
    // }

    chats = [
      ...chats,
      {msg: "Didn't recognise your response,\nPlease try again later", incomingMsg: true},
    ];
    setChatList([...chats].reverse());
    return;
  };

  const onSendMsg = () => {
    chats = [...chats, {msg: msg, sentMsg: true}];
    responses.push(msg);
    setChatList([...chats].reverse());
    setTimeout(() => {
      getAnswer(msg);
    }, 1000);
    setMsg('');
  };

  return (
    <View style={{margin:'auto'}}>
      <FlatList
        style={{height: '87%', bottom: '9%',marginTop:'20%'}}
        inverted={true}
        keyExtractor={(_, index) => index.toString()}
        data={chatList}
        renderItem={({item}) => (
          <Msg
            incomingMsg={item.incomingMsg}
            msg={item.msg}
            sentMsg={item.sentMsg}
          />
        )}
      />
      <View style={styles.typeMsgContainer}>
        <TextInput
          style={styles.typeMsgBox}
          value={msg}
          placeholder="Type Here ..."
          onChangeText={val => setMsg(val)}
        />
        <TouchableOpacity
          style={[styles.sendBtn, {backgroundColor: msg ? 'orange' : 'grey'}]}
          disabled={msg ? false : true}
          onPress={() => onSendMsg()}>
          <Text style={styles.sendTxt}>send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBot;
