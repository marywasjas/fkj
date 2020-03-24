import request from '@/utils/request'

export function distinguishOwner(params) {
  return request({
    url: '/owner/distinguishOwner',
    method: 'post',
    params
  })
}

export function commitOwnerAuthInfo(params) {
  return request({
    url: '/owner/ownerAuthInfo',
    method: 'post',
    params
  })
}

export function ownerHouseAdd(params) {
  return request({
    url: '/house/add',
    method: 'post',
    params
  })
}

/*
export function ownerHouseList(params) {
  return request({
    url: '/owner/ownerHouseList',
    method: 'post',
    params
  })
}

export function ownerPartyList(params) {
  return request({
    url: '/owner/ownerPartyList',
    method: 'post',
    params
  })
}

export function ownerCarList(params) {
  return request({
    url: '/owner/ownerPartyList',
    method: 'post',
    params
  })
}
*/

export function ownerPartyRemove(params) {
  return request({
    url: '/relation/remove',
    method: 'post',
    params
  })
}

export function ownerHousePartyRemove(params) {
  return request({
    url: '/house/removeBinding',
    method: 'post',
    params
  })
}

export function ownerHousePartyAdd(params) {
  return request({
    url: '/house/binding',
    method: 'post',
    params
  })
}

export function ownerHouseRemove(params) {
  return request({
    url: '/house/remove',
    method: 'post',
    params
  })
}

export function ownerPartyAdd(params) {
  return request({
    url: '/relation/add',
    method: 'post',
    params
  })
}

export function ownerPartyUpdate(params) {
  return request({
    url: '/relation/update',
    method: 'post',
    params
  })
}

export function ownerCarAdd(params) {
  return request({
    url: '/car/add',
    method: 'post',
    params
  })
}

export function ownerCarRemove(params) {
  return request({
    url: '/car/remove',
    method: 'post',
    params
  })
}

export function ownerParkingAdd(params) {
  return request({
    url: '/park/add',
    method: 'post',
    params
  })
}

export function ownerParkingRemove(params) {
  return request({
    url: '/park/remove',
    method: 'post',
    params
  })
}

export function ownerParkingCarAdd(params) {
  return request({
    url: '/park/addParkingCar',
    method: 'post',
    params
  })
}

export function ownerParkingCarRemove(params) {
  return request({
    url: '/park/removeParkingCar',
    method: 'post',
    params
  })
}

export function ownerParkingPartyAdd(params) {
  return request({
    url: '/park/addParkingParty',
    method: 'post',
    params
  })
}

export function ownerParkingPartyRemove(params) {
  return request({
    url: '/park/removeParkingParty',
    method: 'post',
    params
  })
}

export function getHouse(params) {
  return request({
    url: '/owner/getHouse',
    method: 'post',
    params
  })
}

export function getPark(params) {
  return request({
    url: '/owner/getPark',
    method: 'post',
    params
  })
}

export function getParty(params) {
  return request({
    url: '/owner/getParty',
    method: 'post',
    params
  })
}

export function getCar(params) {
  return request({
    url: '/owner/getCar',
    method: 'post',
    params
  })
}

export function getHouseParty(params) {
  return request({
    url: '/owner/getHouseParty',
    method: 'post',
    params
  })
}

export function getParkParty(params) {
  return request({
    url: '/owner/getParkParty',
    method: 'post',
    params
  })
}

