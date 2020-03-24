import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import LayoutVisitor from '../views/layout/LayoutVisitor'
import LayoutOwner from '../views/layout/LayoutOwner'
import Dashboard from '../views/dashboard/index'
import layoutInner from '../views/layout/layoutInner'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Dashboard,
    name: 'Dashboard'
  },

  {
    path: '/advertisement',
    component: () => import('@/views/dashboard/advertisement'),
    name: 'advertisement'
  },

  {
    path: '/visitor',
    component: LayoutVisitor,
    name: 'Visitor',
    redirect: 'noredirect',
    meta: { title: '访客登记' },
    children: [
      {
        path: 'address',
        name: 'Address',
        component: () => import('@/views/visitor/address'),
        meta: { title: '选择拜访住址' }
      },
      {
        path: 'ownerPhone',
        name: 'OwnerPhone',
        component: () => import('@/views/visitor/ownerPhone'),
        meta: { title: '输入业主手机号' }
      },
      {
        path: 'cardInfo',
        name: 'CardInfo',
        component: () => import('@/views/visitor/cardInfo'),
        meta: { title: '扫描访客身份证信息' }
      },
      {
        path: 'phoneNumber',
        name: 'PhoneNumber',
        component: () => import('@/views/visitor/phoneNumber'),
        meta: { title: '输入访客手机号码' }
      },
      {
        path: 'photo',
        name: 'Photo',
        component: () => import('@/views/visitor/photo'),
        meta: { title: '拍摄头像' }
      },
      {
        path: 'reason',
        name: 'Reason',
        component: () => import('@/views/visitor/reason'),
        meta: { title: '选择拜访原因' }
      },
      {
        path: 'commit',
        name: 'Commit',
        component: () => import('@/views/visitor/commit'),
        meta: { title: '确认信息并提交' }
      }
    ]
  },

  {
    path: '/owner',
    component: LayoutOwner,
    name: 'Owner',
    redirect: 'noredirect',
    meta: { title: '业主' },
    children: [
      {
        path: 'cardInfo',
        name: 'owner-cardInfo',
        component: () => import('@/views/owner/cardInfo'),
        meta: { title: '扫描身份证信息' }
      },
      {
        path: 'index',
        name: 'owner-index',
        component: () => import('@/views/owner/index'),
        meta: { title: '选择操作选项' }
      },
      {
        path: 'phoneNumber',
        name: 'owner-phoneNumber',
        component: () => import('@/views/owner/phoneNumber'),
        meta: { title: '输入您的手机号码' }
      },
      {
        path: 'house',
        name: 'owner-house',
        component: () => import('@/views/owner/house/list'),
        meta: { title: '我的房屋列表' }
      },
      {
        path: '/',
        name: 'owner-houseIndex',
        component: layoutInner,
        redirect: 'noredirect',
        meta: { title: '我的房屋' },
        children: [{
          path: 'housePayType',
          name: 'owner-housePayType',
          component: () => import('@/views/owner/house/payType'),
          meta: { title: '选择缴费类型' }
        },
        {
          path: 'houseParty',
          name: 'owner-houseParty',
          component: () => import('@/views/owner/house/houseParty'),
          meta: { title: '房屋关系人' }
        },
        {
          path: 'housePay',
          name: 'owner-housePay',
          component: () => import('@/views/pay/house/commit'),
          meta: { title: '缴纳物业费' }
        },
        {
          path: 'waterPay',
          name: 'owner-waterPay',
          component: () => import('@/views/pay/water/commit'),
          meta: { title: '缴纳水费' }
        },
        {
          path: 'gasPay',
          name: 'owner-gasPay',
          component: () => import('@/views/pay/gas/commit'),
          meta: { title: '缴纳气费' }
        },
        {
          path: 'waterPayWater',
          name: 'owner-waterPayWater',
          component: () => import('@/views/pay/water/water'),
          meta: { title: '输入缴费水号' }
        },
        {
          path: 'gasPayGas',
          name: 'owner-gasPayGas',
          component: () => import('@/views/pay/gas/gas'),
          meta: { title: '输入缴费气号' }
        },
        {
          path: 'houseAdd',
          name: 'owner-houseAdd',
          component: () => import('@/views/owner/house/houseAdd'),
          meta: { title: '添加房屋' }
        }]
      },
      {
        path: 'parking',
        name: 'owner-parking',
        component: () => import('@/views/owner/parking/list'),
        meta: { title: '我的车位' }
      },
      {
        path: '/',
        name: 'owner-parkingIndex',
        component: layoutInner,
        redirect: 'noredirect',
        meta: { title: '我的车位' },
        children: [
          {
            path: 'parkingPayType',
            name: 'owner-parkingPayType',
            component: () => import('@/views/owner/parking/payType'),
            meta: { title: '选择缴费类型' }
          },
          {
            path: 'parkingAdd',
            name: 'owner-parkingAdd',
            component: () => import('@/views/owner/parking/parkingAdd'),
            meta: { title: '添加车位' }
          },
          {
            path: 'parkingParty',
            name: 'owner-parkingParty',
            component: () => import('@/views/owner/parking/parkingParty'),
            meta: { title: '车位关系人' }
          },
          {
            path: 'parkingPay',
            name: 'owner-parkingPay',
            component: () => import('@/views/pay/parking/commit'),
            meta: { title: '缴纳车位费' }
          },
          {
            path: 'parkingCarAdd',
            name: 'owner-parkingCarAdd',
            component: () => import('@/views/owner/parking/parkingCar'),
            meta: { title: '车位的车辆管理' }
          }
        ]
      },
      {
        path: 'car',
        name: 'owner-car',
        component: () => import('@/views/owner/car/list'),
        meta: { title: '我的车辆' }
      },
      {
        path: 'carAuth',
        name: 'owner-carAuth',
        component: layoutInner,
        redirect: 'noredirect',
        meta: { title: '车辆认证' },
        children: [{
          path: 'number',
          name: 'owner-carAuth-number',
          component: () => import('@/views/owner/car/auth/number'),
          meta: { title: '录入车牌号' }
        }, {
          path: 'identificationCode',
          name: 'owner-carAuth-identificationCode',
          component: () => import('@/views/owner/car/auth/identificationCode'),
          meta: { title: '录入车架号' }
        }, {
          path: 'phoneNumber',
          name: 'owner-carAuth-phoneNumber',
          component: () => import('@/views/owner/car/auth/phoneNumber'),
          meta: { title: '输入车主手机号码' }
        }, {
          path: 'cardInfo',
          name: 'owner-carAuth-cardInfo',
          component: () => import('@/views/owner/car/auth/cardInfo'),
          meta: { title: '车主身份证扫描' }
        }, {
          path: 'commit',
          name: 'owner-carAuth-commit',
          component: () => import('@/views/owner/car/auth/commit'),
          meta: { title: '提交信息' }
        }]
      },
      {
        path: 'party',
        name: 'owner-party',
        component: () => import('@/views/owner/party/list'),
        meta: { title: '我的关系人列表' }
      },
      {
        path: 'partyDetails',
        name: 'owner-party-details',
        component: () => import('@/views/owner/party/details'),
        meta: { title: '关系人详情' }
      },
      {
        path: 'partyUpdate',
        name: 'owner-partyUpdate',
        component: layoutInner,
        redirect: 'noredirect',
        meta: { title: '修改关系人信息' },
        children: [{
          path: 'phoneNumber',
          name: 'owner-partyUpdate-phoneNumber',
          component: () => import('@/views/owner/party/update/phoneNumber'),
          meta: { title: '修改电话号码' }
        }, {
          path: 'photo',
          name: 'owner-partyUpdate-photo',
          component: () => import('@/views/owner/party/update/photo'),
          meta: { title: '修改照片' }
        }, {
          path: 'relation',
          name: 'owner-partyUpdate-relation',
          component: () => import('@/views/owner/party/update/relation'),
          meta: { title: '修改关系人类型' }
        }]
      },
      {
        path: 'partyAuth',
        name: 'owner-partyAuth',
        component: layoutInner,
        redirect: 'noredirect',
        meta: { title: '关系人认证' },
        children: [
          {
            path: 'commit',
            name: 'owner-partyAuth-commit',
            component: () => import('@/views/owner/party/auth/commit'),
            meta: { title: '提交信息' }
          }, {
            path: 'relation',
            name: 'owner-partyAuth-relation',
            component: () => import('@/views/owner/party/auth/relation'),
            meta: { title: '选择关系类型' }
          }, {
            path: 'phoneNumber',
            name: 'owner-partyAuth-phoneNumber',
            component: () => import('@/views/owner/party/auth/phoneNumber'),
            meta: { title: '输入手机号码' }
          }, {
            path: 'photo',
            name: 'owner-partyAuth-photo',
            component: () => import('@/views/owner/party/auth/photo'),
            meta: { title: '拍摄关系人头像' }
          }, {
            path: 'cardInfo',
            name: 'owner-partyAuth-cardInfo',
            component: () => import('@/views/owner/party/auth/cardInfo'),
            meta: { title: '扫描关系人身份证' }
          }]
      },
      {
        path: 'auth',
        name: 'auth',
        component: layoutInner,
        redirect: 'noredirect',
        meta: { title: '身份认证' },
        children: [
          {
            path: 'photo',
            name: 'owner-photo',
            component: () => import('@/views/owner/auth/photo'),
            meta: { title: '拍摄头像' }
          },
          {
            path: 'house',
            name: 'owner-auth-house',
            component: () => import('@/views/owner/auth/house'),
            meta: { title: '待认证房屋' }
          },
          {
            path: 'houseAdd',
            name: 'owner-auth-houseAdd',
            component: () => import('@/views/owner/auth/houseAdd'),
            meta: { title: '添加待认证房屋' }
          },
          {
            path: 'parking',
            name: 'owner-auth-parking',
            component: () => import('@/views/owner/auth/parking'),
            meta: { title: '待认证车位' }
          },
          {
            path: 'parkingAdd',
            name: 'owner-auth-parkingAdd',
            component: () => import('@/views/owner/auth/parkingAdd'),
            meta: { title: '添加待认证车位' }
          },
          {
            path: 'commit',
            name: 'owner-auth-commit',
            component: () => import('@/views/owner/auth/commit'),
            meta: { title: '提交信息' }
          }
        ]
      }
    ]
  },
  {
    path: '/pay',
    component: LayoutVisitor,
    name: 'Pay',
    redirect: 'noredirect',
    meta: { title: '缴费' },
    children: [
      {
        path: 'index',
        name: 'pay-index',
        component: () => import('@/views/pay/index'),
        meta: { title: '选择缴费类型' }
      },
      {
        path: 'house',
        name: 'pay-house',
        component: layoutInner,
        redirect: 'noredirect',
        meta: { title: '物业费' },
        children: [
          {
            path: 'house',
            name: 'pay-house-house',
            component: () => import('@/views/pay/house/house'),
            meta: { title: '选择缴费房屋' }
          },
          {
            path: 'phoneNumber',
            name: 'pay-house-phoneNumber',
            component: () => import('@/views/pay/house/phoneNumber'),
            meta: { title: '缴费人手机号' }
          },
          {
            path: 'commit',
            name: 'pay-house-commit',
            component: () => import('@/views/pay/house/commit'),
            meta: { title: '选择付款方式' }
          },
          {
            path: 'success',
            name: 'pay-house-success',
            component: () => import('@/views/pay/success'),
            meta: { title: '付款结果' }
          }
        ]
      },
      {
        path: 'parking',
        name: 'pay-parking',
        component: layoutInner,
        redirect: 'noredirect',
        meta: { title: '车位费' },
        children: [
          {
            path: 'parking',
            name: 'pay-parking-parking',
            component: () => import('@/views/pay/parking/parking'),
            meta: { title: '选择缴费车位' }
          },
          {
            path: 'phoneNumber',
            name: 'pay-parking-phoneNumber',
            component: () => import('@/views/pay/parking/phoneNumber'),
            meta: { title: '缴费人手机号' }
          },
          {
            path: 'commit',
            name: 'pay-parking-commit',
            component: () => import('@/views/pay/parking/commit'),
            meta: { title: '选择付款方式' }
          },
          {
            path: 'success',
            name: 'pay-parking-success',
            component: () => import('@/views/pay/success'),
            meta: { title: '付款结果' }
          }
        ]
      },
      {
        path: 'water',
        name: 'pay-water',
        component: layoutInner,
        redirect: 'noredirect',
        meta: { title: '水费' },
        children: [
          {
            path: 'water',
            name: 'pay-water-water',
            component: () => import('@/views/pay/water/water'),
            meta: { title: '输入水号' }
          },
          {
            path: 'phoneNumber',
            name: 'pay-water-phoneNumber',
            component: () => import('@/views/pay/water/phoneNumber'),
            meta: { title: '缴费人手机号' }
          },
          {
            path: 'commit',
            name: 'pay-water-commit',
            component: () => import('@/views/pay/water/commit'),
            meta: { title: '选择付款方式' }
          },
          {
            path: 'success',
            name: 'pay-water-success',
            component: () => import('@/views/pay/success'),
            meta: { title: '付款结果' }
          }
        ]
      },
      {
        path: 'gas',
        name: 'pay-gas',
        component: layoutInner,
        redirect: 'noredirect',
        meta: { title: '气费' },
        children: [
          {
            path: 'gas',
            name: 'pay-gas-water',
            component: () => import('@/views/pay/gas/gas'),
            meta: { title: '输入气号' }
          },
          {
            path: 'phoneNumber',
            name: 'pay-gas-phoneNumber',
            component: () => import('@/views/pay/gas/phoneNumber'),
            meta: { title: '缴费人手机号' }
          },
          {
            path: 'commit',
            name: 'pay-gas-commit',
            component: () => import('@/views/pay/gas/commit'),
            meta: { title: '选择付款方式' }
          },
          {
            path: 'success',
            name: 'pay-gas-success',
            component: () => import('@/views/pay/success'),
            meta: { title: '付款结果' }
          }
        ]
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

history.pushState(null, null, document.URL)
window.addEventListener('popstate', function() {
  history.pushState(null, null, document.URL)
})
