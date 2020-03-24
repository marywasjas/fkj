import request from '@/utils/request'

// params:手机号 后台返回验证码并向手机号发送验证码
export function sendValidNum(params) {
  return request({
    url: '/check/getCode',
    method: 'post',
    params
  })
}

export function testValidNum(params) {
  return request({
    url: '/check/checkCode',
    method: 'post',
    params
  })
}

export function getBuildInfo(params) {
  return request({
    url: '/data/build',
    method: 'get',
    params
  })
}
export function getParkingInfo(params) {
  return request({
    url: '/data/parking',
    method: 'get',
    params
  })
}
export function loginTestVillage(params) {
  return request({
    url: '/check/testVillage',
    method: 'post',
    params
  })
}
export function dictData(params) {
  return request({
    url: '/data/dictData',
    method: 'get',
    params
  })
}
export function getAdvert(params) {
  return request({
    url: '/data/getAdvert',
    method: 'get',
    params
  })
}
// 消息
export function getBulletin(params) {
  return request({
    url: '/data/getBulletin',
    method: 'get',
    params
  })
}
// 获取app二维码
export function getQRCodeAPP(params) {
  return request({
    url: '/data/getQRCodeAPP',
    method: 'get',
    params
  })
}
// 获取公众号二维码
export function getQRCodeGZH(params) {
  return request({
    url: '/data/getQRCodeGZH',
    method: 'get',
    params
  })
}
