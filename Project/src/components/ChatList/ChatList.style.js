import { StyleSheet } from 'react-native'

const styles = {
  container: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10
  },
  container2: {
    flex: 1,
    width: null,
    height: null
  },
  textContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'baseline',
    left: 80,
    top: 20
  },
  textContainer2: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'baseline',
    left: 80,
    top: 40

  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'GeosansLight',
    width: 150
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  texts: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'GeosansLight',
    marginTop: 15
  }

}

export default styles
