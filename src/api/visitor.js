import request from '@/utils/request'

export function ownerPhone(params) {
  return request({
    url: '/check/isOwnerPhone',
    method: 'post',
    params
  })
}

export function commitVisitorInfo(params) {
  return request({
    url: '/visitor/commitInfo',
    method: 'post',
    params
  })
}
