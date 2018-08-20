import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet
} from "react-native";
import { firebaseRef } from "../../firebase/firebase";
import { Avatar, Icon, Header } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import styles from "./ChatList.style";
import { BlurView } from "react-native-blur";
import _ from "lodash";

var navigator;
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loading: true
    };

    // get all chats from the firebase database
    const { currentUser } = firebaseRef.auth();
    this.user = firebaseRef.auth().currentUser;

    this.friendsRef = this.getRef();
    // Ref to the current logged in user
  }

  // Ref to firebase Database

  getRef() {
    return firebaseRef.database().ref(`chat`);
  }

  listenForItems(friendsRef) {

    // Logged in user

    var user = firebaseRef.auth().currentUser.uid;

    var data

    friendsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      let snaps = snap.val()

   

      // if this.current

      snap.forEach((child) => {
        
        
        var key_string = child.key;

        if(key_string.indexOf(user) > -1)
        {                    
                    let childsValue = child.val()

                    // Sorting out the keys
            
                    const users = _.map(childsValue, (val) => {
                      return { ...val }
                    })
            
                    // Get the properties i want from the keys in users
            
                    users.forEach(element => {
            
                      text = element.text,
                        avatar = element.avatar,
                        name = element.name,
                        friendName = element.nameFriend,
                        key = element.key,
                        uid = element.uid,
                        friendsAvatar = element.friendsAvatar,
                        friendKey = element.friendKey
            
                    });
            
                    // if the user  render friends name and friendsavatar
                    //  else render name and avatar from the users.element
            
                    if (this.user.uid === uid) {
                      var names = friendName
                      var avatar = friendsAvatar
                      var key = friendKey
                    } else {
                      var names = name
                      var avatar = avatar
                      var key = key
                    }
            
                    // Adds all properties to items array
            
                    items.push({
                      name: names,
                      text: text,
                      profilAvatar: avatar,
                      key: key
                    });
          
        }  

      });

      // Updates the state with items array

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        loading: false
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.friendsRef);
    //console.log("chatlist testing");
  }

  /*
Renders out a profile avatar, name and the latest message from the rowData
*/

  renderRow = rowData => {
    let userData = {
      name: rowData.name,
      key: rowData.key,
      profile_picture: rowData.profilAvatar,
    };
    return (
      <TouchableOpacity onPress={() => Actions.chat({ data: userData })}>
        <View style={styles.container}>
          <Avatar
            size="medium"
            rounded
            source={{ uri: rowData.profilAvatar }}
            activeOpacity={0.7}
            avatarStyle={{ borderColor: "#302F30", borderWidth: 1 }}/>
          
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.text}>
              {rowData.name}
            </Text>
          </View>

          <View style={styles.textContainer2}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}  >{rowData.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ImageBackground
        source={require('../../assets/couldbe.jpg')}
        style={styles.container2}>
        <View style={styles.container2}>
          <BlurView
            style={styles.absolute}
            blurType="dark"
            blurAmount={10}
            height={995}
          />
          <Header
            style={{ padding: 0 }}
            backgroundColor="#1E1E1E"
            outerContainerStyles={{ height: 120 }}
            leftComponent={
              <Icon
                name="arrow-back"
                color="#FFF"
                onPress={() => Actions.pop()}
              />
            }
            centerComponent={{
              text: "Chat List ",
              style: { color: "#fff", fontFamily: "GeosansLight", fontSize: 24 }
            }}

          />
          />
        <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </View>
      </ImageBackground>
    );
  }
}



export default ChatList;