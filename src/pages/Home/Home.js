import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'

import { getList, getListLast } from 'services/list'
import FontIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  infoTxt: {
    fontSize: 20,
    marginBottom: 10,
  },
})

function Home({ navigation }) {
  const [list, setList] = useState([])
  const [info, setInfo] = useState([])

  useEffect(() => {
    let mounted = true
    getList().then((items) => {
      if (mounted) {
        setList(items)
      }
    })
    return (mounted) => (mounted = false)
  }, [])

  useEffect(() => {
    let mounted = true
    getListLast().then((items) => {
      if (mounted) {
        console.log(items)
        setInfo(items)
      }
    })
    return (mounted) => (mounted = false)
  }, [])

  const getData = async () => {
    try {
      getListLast().then((items) => {
        setInfo(items)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const getDataChange = () => {
    if (info.length > 0) return info[0].change
  }

  useEffect(() => {
    const intervalCall = setInterval(() => {
      getData()
    }, 15000)
    return () => {
      // clean up
      clearInterval(intervalCall)
    }
  }, [])

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>
        Bitcoin price{' '}
        {info && (
          <FontIcon
            name={
              getDataChange() > 0
                ? 'arrow-top-right-bold-outline'
                : 'arrow-bottom-right-bold-outline'
            }
            color={getDataChange() > 0 ? colors.gray : colors.red}
            size={26}
            solid
          />
        )}
      </Text>

      {info && (
        <View>
          {info.map((data, idx) => {
            return (
              <View key={idx}>
                <Text style={styles.infoTxt}>Currency: {data.code}</Text>
                <Text style={styles.infoTxt}>Rate: {data.rate} </Text>
                <Text style={styles.infoTxt}>Change: {data.change}</Text>
              </View>
            )
          })}
        </View>
      )}
      <Button
        title="Go to Details"
        color="white"
        backgroundColor={colors.lightPurple}
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      />
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
