import request from '@/utils/request'

export function getHousePayInfo(params) {
  return request({
    url: '/pay/getBuildFee',
    method: 'post',
    params
  })
}

export function getParkingPayInfo(params) {
  return request({
    url: '/pay/getParkFee',
    method: 'post',
    params
  })
}

export function getPayCode(params) {
  return request({
    url: '/pay/placeOrder',
    method: 'post',
    params
  })
}

export function getPayStatus(params) {
  return request({
    url: '/pay/getPayStatus',
    method: 'post',
    params
  })
}

export function placeOrder(params) {
  return request({
    url: '/pay/placeOrder',
    method: 'post',
    params
  })
}

export function waterGasBill(params) {
  return request({
    url: '/pay/waterGasBill',
    method: 'post',
    params
  })
}

export function submitOrder(params) {
  return request({
    url: '/pay/submitOrder',
    method: 'post',
    params
  })
}
