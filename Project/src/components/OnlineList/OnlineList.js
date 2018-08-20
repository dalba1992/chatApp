import React, { Component } from 'react'
import { View, FlatList, ImageBackground,Picker,Text } from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'
import { fetchList, fetchProfileData, fetchDistanceList } from '../../actions'
import _ from 'lodash'
import HeaderBlack from '../Header/HeaderBlack'
import ListUserItem from '../ListUserItem/ListUserItem'
import styles from './OnlineList.style'
import { BlurView } from 'react-native-blur'



class OnlineList extends Component {
  constructor () {
    super()
    this.state = {
      selectedIndex: 0,
      selectedDistanceIndex: 0,
      loading: false
    }
    // this.updateIndex = this.updateIndex.bind(this)
  }

  // Call fetchList with 0 to get access to all users

  componentWillMount () {
    let i = 0
    this.props.fetchList(i)
    this.props.fetchProfileData()
  }

  // updates the selectedIndex and calls the methods with the selectedindex
  updateIndex (selectedIndex) {
   this.state.selectedIndex =  selectedIndex;
   this.fetchUsers();
  }
  updateDistanceIndex (selectedDistanceIndex) {
  this.state.selectedDistanceIndex = selectedDistanceIndex;
    this.fetchUsers();
  }

  fetchUsers () {

    this.props.fetchList(this.state.selectedIndex, this.state.selectedDistanceIndex);

  }

  renderItem ({ item }) {
    return <ListUserItem user={item} />
  }

  render () {
    const buttons = ['All', 'Female', 'Male']
    const distancebuttons = ['10km', '50km', '100km','1000km']
    const { selectedIndex,selectedDistanceIndex } = this.state
    return (

      <ImageBackground
        source={require('../../assets/Background.jpg')}
        style={styles.container}
      >

        <HeaderBlack />
        <View>
     
          <BlurView
            style={styles.absolute}
            blurType='dark'
            blurAmount={0.001}
            height={695} />

          <View style={styles.buttonGroupViewContainer} >

            <ButtonGroup
              onPress={this.updateIndex.bind(this)}
              selectedIndex={selectedIndex}
              selectedButtonStyle={styles.selectedButtonStyle}
              buttons={buttons}
              containerStyle={styles.buttonGroupContainer}
              textStyle={styles.buttonGroupText} />

            <ButtonGroup
              onPress={this.updateDistanceIndex.bind(this)}
              selectedIndex={selectedDistanceIndex}
              selectedButtonStyle={styles.selectedButtonStyle}
              buttons={distancebuttons}
              containerStyle={styles.buttonDistanceGroupContainer}
              textStyle={styles.buttonGroupText} />

          </View>

          <View style={styles.flatListContainer} >
           
           <FlatList
              data={this.props.users}
              renderItem={this.renderItem}
            />
      
          </View>
      
        </View>
      </ImageBackground>

    )
  }
}

const mapStateToProps = state => {
  const users = _.map(state.list, (val) => {
    return { ...val }
  })
  const profile = _.map(state.profile, (val) => {
    return { ...val }
  })
  const distance = _.map(state.distance, (val) => {
    return { ...val }
  })

  return { users, profile,distance }
}

export default connect(mapStateToProps, { fetchList, fetchDistanceList, fetchProfileData })(OnlineList)
