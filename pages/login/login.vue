<template>
    <view>
       <view style="position:relative;height:100%;width:100%">
			   <u-image src="../../static/login.png" width="100%"></u-image>
		  <!-- <view class="login_title">
		       <view>一体化体检预约平台</view>
		   </view> -->
		   <view class="login_form">
		       <view class="input_wrap">
		           <u-input prefixIcon="phone" clearable v-model="form.mobilePhone" placeholder="请输入手机号码" />
		       </view>
		       <view class="input_wrap">
		           <u-input prefixIcon="lock" clearable v-model="form.code" placeholder="请输入验证码" >
		               <template slot="suffix">
		   				<!-- :seconds="seconds" -->
		                   <u-code ref="uCode" @change="codeChange" ></u-code>
		               <u-button @tap="getCode" :text="tips" color="#45AE98" size="mini" ></u-button>
		   			</template>
		           </u-input>
		       </view>
		       <u-button class="login_btn"  @click="login">登 录</u-button>
		   <view class="login-wechat" @click="weChatLogin">
			   <view class="title">第三方登录</view>
		       <svg t="1649817377521" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3693" width="50" height="50"><path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z" fill="#45AE98" p-id="3694"></path><path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z" fill="#45AE98" p-id="3695"></path></svg>
		   </view>
		   </view>
		  <!-- <view class="login-wechat" @click="weChatLogin">
		       <svg t="1647569827080" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2458" width="30" height="30"><path d="M1010.8 628c0-141.2-141.3-256.2-299.9-256.2-168 0-300.3 115.1-300.3 256.2 0 141.4 132.3 256.2 300.3 256.2 35.2 0 70.7-8.9 106-17.7l96.8 53-26.6-88.2c70.9-53.2 123.7-123.7 123.7-203.3zM618 588.8c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40c0 22-17.9 40-40 40z m194.3-0.3c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" fill="#00C800" p-id="2459"></path><path d="M366.3 106.9c-194.1 0-353.1 132.3-353.1 300.3 0 97 52.9 176.6 141.3 238.4l-35.3 106.2 123.4-61.9c44.2 8.7 79.6 17.7 123.7 17.7 11.1 0 22.1-0.5 33-1.4-6.9-23.6-10.9-48.3-10.9-74 0-154.3 132.5-279.5 300.2-279.5 11.5 0 22.8 0.8 34 2.1C692 212.6 539.9 106.9 366.3 106.9zM247.7 349.2c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z m246.6 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" fill="#00C800" p-id="2460"></path></svg>
		   </view> -->
	   </view>

    </view>
</template>

<script>
import { wxlogin ,sendCode} from '../../api/login.js'
import {weChatLogin} from '../../utils/weChatInfo'
import { getUrlCode } from '@/utils'
import {localStorage} from '../../utils/storage.js'
export default {
    data(){
        return{
            form:{
                mobilePhone:'',
                code:''
            },
            tips:'',
			seconds:60,
			
			
        }
    },
	onLoad(options){
		let code = getUrlCode('code')
		if(code) {
			this.getOpenidAndUserinfo(code)
		}
		/**
		 * @Description: 判断是否存在token
		 * @param {*} localStorage
		 * @return {*}
		 * @author: yzz
		 */		
		
		if(uni.getStorageSync('userInfo').token){
			uni.reLaunch({
				url:'/pages/home/home'
			})
		}
	},
    methods:{
		//动态显示验证码内的文字
		codeChange(text) {
			this.tips = text;
		},
		
		// 登录
        login(){
			//手机号校验
			if(!this.phoneValid()){
				return 
			}
			//验证码校验
			this.form.code = this.form.code.trim()
			if(this.form.code === ''){
				uni.showToast({
					title:'验证码不能为空',
					icon:'error'
				})	
				 return 
			}else if(!(/^\d{1,}$/.test(this.form.code))){
				uni.showToast({
					title:'验证码格式错误',
					icon:'error'
				})	
				 return 
			}
			//提交登录
            this.$store.dispatch('Login',this.form).then(res=>{
				if(this.$store.state.user.token){
					uni.getStorageSync('userInfo').phone = this.form.mobilePhone
					 uni.redirectTo({url:'/pages/home/home'})
				}
            })
        },
		
		//手机号校验
		phoneValid(){
			this.form.mobilePhone =this.form.mobilePhone.trim()
			let phoneFlag = false
			if(this.form.mobilePhone === ''){
				uni.showToast({
					title:'请输入正确的手机号码',
					icon:'none'
				})	 
				 phoneFlag = false
			}else if(!(/^1[3456789]\d{9}$/).test(this.form.mobilePhone)){
				uni.showToast({
					title:'手机格式错误',
					icon:'error'
				})	 
				 phoneFlag = false 
			}else{
				 phoneFlag = true 
			}
			return phoneFlag
		},
		
        // 获取验证码
        getCode(){
			// 手机校验未通过
			if(!this.phoneValid()){
				return 
			}
			//为true则发送短信验证码给用户
			if(this.$refs.uCode.canGetCode){
				uni.showLoading({title: '正在获取验证码',mask:true,})
				//发送获取验证码请求
				sendCode(this.form.mobilePhone).then(res => {
					// 已发送短信
					uni.hideLoading()
					uni.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
					
				}).catch(error => {
					uni.$u.toast('请再次发送验证码');
				})
				}else{
					uni.$u.toast('倒计时结束后再发送');
				}
		},
        weChatLogin(){
            //唤起微信授权登录
			let code = getUrlCode('code')
			if(!code){
				weChatLogin()
			}
        },
		// 微信授权登录获取token和userId
		getOpenidAndUserinfo(code){
			wxlogin(code).then(res=>{
				if(res.code === 200){
					const { data } = res;
					this.$store.dispatch('wxLogin',data)
				}
			}).catch(err=>{
				uni.showToast({
					icon:'error',
					duration:1000,
					title:'授权登录失败'
				})
				setTimeout(()=>{
					location.href="/pages/login/login"
				},1000)
			})
		}
	
    }
}
</script>

<style lang="scss">
.login_title{
    font-size:24px;
    color:#45AE98;
    font-weight: bold;
    text-align: center;
}

.login_form{
    width:75%;
    height:170px;
	position:absolute;
	left:50%;
	top:430rpx;
	transform: translateX(-50%);
    .input_wrap{
        background: rgb(248,248,248);
        margin-bottom: 30rpx;
        // padding:0 20rpx;
        border-radius: 4rpx;
        overflow: hidden;
    }
    .login_btn{
        color:white;
        font-size: 14px;
        background-color:#45AE98;
    }
}

.login-wechat{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
    width: 250rpx;
    margin: 60rpx auto 0;
    color: #CCCCCC;
	.title {
        position: relative;
		width: 100%;
        font-size: 28rpx;
        font-weight: 100;
        text-align: center;
        margin-bottom: 14rpx;
        &:after,
        &:before {
            position: absolute;
            content: '';
            width: 40rpx;
            height: 1px;
            background-color: #CCCCCC;
        }
        &:after {
            right: 0;
            top: 18rpx;
        }
        &:before {
            left: 0;
            top: 18rpx;
        }
    }
}
</style>