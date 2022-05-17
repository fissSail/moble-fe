import store from "../store";
 import { localStorage } from "./storage.js"
 import app from '../App.vue'
 let ajaxTimes = ''
// 封装请求方法，并向外暴露该方法
export const http = (options)=>{
	// 解构请求头参数
	let header = {...options.header};
	if (uni.getStorageSync('userInfo').token && !header.isToken) {
		header['Authorization'] = uni.getStorageSync('userInfo').token // 让每个请求携带自定义token 请根据实际情况自行修改
	}
	ajaxTimes++;
	// 显示加载中 效果
	uni.showLoading({
		title: "加载中",
	    mask: true,
	});
	return new Promise((resolve,reject)=>{
		uni.request({
			url:options.url,
			method: options.method || 'POST',
			data: options.data || {},
			header,
			success: (res)=>{
				const msg  = res.data.msg || res.data.message;
				// 发生错误
				if(res.data.code != 200){
					// 无权限 获取登录失效重定向到登录页
					if(res.data.code == 401 || res.data.code == 403){
						uni.showToast({
							icon:'error',
							duration:1000,
							title:`请重新登录`
						})
						// 重定向到登录 页面
						uni.reLaunch({
							url:'/pages/login/login'
						})
						// 清除缓存
						store.dispatch('resetCache')
					}
					if(res.data.code >= 500){
						uni.showToast({
							icon:'error',
							duration:1000,
							title:msg
						})
					}
					reject(res)
					
				}else{
					resolve(res.data)
				}
			},
			fail: (err)=>{
				reject(err)
			},
			// 完成之后关闭加载效果
			complete:()=>{
				ajaxTimes--;
				if(ajaxTimes===0){
			        //  关闭正在等待的图标
			        uni.hideLoading();
			    }
			}
		})
	})
}


