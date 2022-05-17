import {proxyUrl,APPID,redirectUrl} from './address.js'


//微信授权登录
export function weChatLogin(){
	let redirect= redirectUrl
    let appid = APPID
    let REDIRECT_URI = encodeURIComponent(redirect)
    //scope 两种：snsapi_userinfo：非静默授权 snsapi_base：静默授权
    let SCOPE = 'snsapi_userinfo'
 window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=STATE#wechat_redirect`
}

// 图片地址
export function getFilePath(img){
    if (img.indexOf("http://") != -1  || img.indexOf("https://") != -1 ) {
        return img;
    }
	const url = proxyUrl
    let imgPath = url+img
	return imgPath
}