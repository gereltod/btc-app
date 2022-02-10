/* eslint-disable import/prefer-default-export */
import axios from 'axios'

export async function getList() {
  const response = await axios.get('https://api.oju.mn/coinprice')

  const [data] = response.data
  const forEachData = []

  Object.keys(data).map(function (key) {
    if (data[key].CurrencyCode === 'USD') {
      forEachData.push(data[key].Rate)
    }
  })
  return forEachData
}

export async function getListLast() {
  const response = await axios.get('http://api.oju.mn/coinprice/last')

  const data = response.data
  const arr = []

  Object.keys(data).map(function (key) {
    const d = {
      code: data[key].CurrencyCode,
      rate: data[key].Rate,
      change: data[key].Change,
    }
    arr.push(d)
  }, {})
  return arr
}
