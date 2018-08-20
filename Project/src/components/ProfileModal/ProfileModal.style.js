
const styles = {
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:190,
        flex:1,
        
    },
    profileDataContainer:
    {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 21,

    },
    profileDataSettings:
    {
        color: '#fff',
        fontFamily: 'GeosansLight',
        fontSize: 20,
        justifyContent: 'center', alignItems: 'center'

    },
    editProfileDataSettings:
    {
        color: '#fff',
        fontFamily: 'GeosansLight',
        fontSize: 15
    },
    rightSideContainerProfile: {
        alignContent: 'flex-start',
        flexDirection: 'row'
    },

    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 7,
        borderBottomColor: '#bbb',
        alignItems: 'center',
        marginLeft:10,
        marginRight:10,

    },
    bracketsText: {
        fontSize: 8
      },
      containerHeaderText: {
        padding: 4,
        color: 'white',
        fontSize:17,
        fontFamily: 'GeosansLight'
      },
    propertyText: {
        color: '#fff',
        fontFamily: 'GeosansLight',
        fontSize:15

    },
    valueText: {
        color: '#fff',
        fontFamily: 'GeosansLight',
        fontSize:15
    },
    exitModalIcon:
    {
        marginTop: 12,
        marginRight: 312,
        width: 30
    },
    editProfileText: {
        color: 'white',
        alignContent: 'flex-start',
        fontFamily: 'GeosansLight',

    },
    iconStyle: {
        height: 4
    },
    signOut:
    {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        left: 250,
        top: 15
    },
    changeStatusButtonContainer:
    {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderRadius: 11,
        marginBottom: 35
    },
    buttonStyleChange:
    {
        borderRadius: 50,
        backgroundColor: '#0285A3',
        marginBottom: 10
    },
    currentMoodStyle:
    {
        color: 'white',
        fontFamily: 'GeosansLight',
        fontSize: 20,
        marginBottom: 1,
        marginLeft: 2
    },
    iconsInModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 5
    },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalStyle: {
    height: 150,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 15
 },
  modalAge: {
    height: 200,
    width: 300,
    backgroundColor: 'white'
  },
  text: {
    color: 'black',
    fontSize: 22,
  },
  texts: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'GeosansLight' ,
  },
  modalButtonSave: {
    backgroundColor: '#D1AF46',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    marginTop:10,
    width: 80
  }
}

  export default styles;
  