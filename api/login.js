import { http } from '../utils/request.js'

// 登录
export function login(mobilePhone,code){
    return http({
        url:'/dev-api/mobile/login',
        header: {
            isToken: false
        },
        method: 'POST',
        data: { code, mobilePhone }
    })
}

//发送验证码
export function sendCode(mobilePhone){
    return http({
        url:'/dev-api/mobile/login/verificationCode',
        header: {
            isToken: false
        },
        method: 'GET',
		data:{
			mobilePhone
		}
    })
}

//添加或者修改用户信息
export function saveOrEditUserInfo(data){
    return http({
        url:'/dev-api/userInfo',
        method: 'POST',
		data
    })
}

//获取个人信息
export function getUserInfo(userId){
    return http({
        url: `/dev-api/userInfo/${userId}`,
        method: 'get',
    })
}

// 微信授权登录
export function wxlogin(code){
    return http({
        url:'/dev-api/mobile/login/wx',
        header: {
            isToken: false
        },
        method: 'get',
        data: { code }
    })
}

// 用户绑定微信用户标识
export function bindingWx(data){
    return http({
        url:'/dev-api/userInfo/bindingWx',
        method: 'post',
        data
    })
}

// 根据手机号或证件号查询用户信息
export function getUserInfoByPhoneOrCertificateNo(phoneOrCertificateNo){
    return http({
        url:'/dev-api/userInfo/info/'+phoneOrCertificateNo,
        method: 'get'
    })
}

