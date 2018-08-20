import { StyleSheet } from 'react-native'

const styles = {
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: 'white',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 50,
    alignItems: 'center'
  },
  propertyText: {
    flex: 1
  },
  valueText: {
    width: 150
  },
  logOutIcon: {
    width: 40
  },
  bracketsText: {
    fontSize: 8
  },
  containerHeaderText: {
    fontWeight: 'bold',
    padding: 3,
    color: 'black'
  },
  headerCenterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  headerCenterText: {
    fontSize: 12,
    textAlign: 'center'

  }
}
export default styles
