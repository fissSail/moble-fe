<template>
    <view class="userInfo-wrapper">
       <view class="userInfo-content">
           <u-form labelPosition="left"
                   :model="userInfoForm"
                   :rules="rules"
                   ref="userInfoRef">
               <u-form-item label="姓  名" prop="name" borderBottom labelWidth="80px" required>
                   <u-input v-model="userInfoForm.name" border="none" placeholder="请输入姓名"></u-input>
               </u-form-item>
			   <u-form-item label="证件类型" prop="certificateName" borderBottom labelWidth="80px" @click="certTypeShow = true" required>
			       <view>
			           <u-picker :show="certTypeShow" :columns="certOptions" @cancel="certTypeShow= false" @confirm="handleCertConfirm" keyName="dictLabel"></u-picker>
			           <u-input v-model="userInfoForm.certificateName" border="none" placeholder="请选择证件类型"></u-input>
			       </view>
			   </u-form-item>
			   <u-form-item label="证 件 号" prop="certificateNo" borderBottom labelWidth="80px" required>
			       <u-input v-model="userInfoForm.certificateNo" type="idcard" border="none" placeholder="请输入证件号" @blur="handleListenCertId"></u-input>
			   </u-form-item>
			   <u-form-item label="联系电话" prop="phone" borderBottom labelWidth="80px" required>
			       <u-input v-model="userInfoForm.phone" type="number" border="none" placeholder="请输入联系电话"></u-input>
			   </u-form-item>
               <u-form-item label="性  别" prop="sex" borderBottom labelWidth="80px" required v-if="userInfoForm.certificateType != '01'">
                   <u-radio-group  v-model="userInfoForm.sex" placement="row" :disabled="userInfoForm.certificateType == '01'">
                       <u-radio activeColor="red" label="男" name="0"></u-radio>
                       <u-radio activeColor="red" label="女" name="1"></u-radio>
                   </u-radio-group>
               </u-form-item>
               <u-form-item label="出生日期" prop="birthday" borderBottom labelWidth="80px" @click="birthdayShow = true" required v-if="userInfoForm.certificateType != '01'">
                   <view>
					   <u-datetime-picker  :show="birthdayShow" v-model="birth" mode="date"  @confirm="handleConfirm"  @cancel="birthdayShow = false" :formatter="formatter"></u-datetime-picker>
                       <u-input v-model="userInfoForm.birthday" border="none" placeholder="请选择出生日期" ></u-input>
                   </view>
               </u-form-item>
			   <u-form-item label="年  龄" prop="age" borderBottom labelWidth="80px" required  v-if="userInfoForm.certificateType != '01'">
			       <u-input v-model="userInfoForm.age" border="none" placeholder="请输入年龄" ></u-input>
			   </u-form-item>
               <u-form-item label="婚姻状况" prop="marryType" borderBottom labelWidth="80px" @click="marryTypeShow = true" required  v-if="userInfoForm.certificateType != '01'">
				   <view>
				       <u-picker :show="marryTypeShow" :columns="marryOptions" @cancel="marryTypeShow= false" @confirm="handleMarryConfirm" keyName="dictLabel"></u-picker>
				       <u-input v-model="userInfoForm.marryTypeName" border="none" placeholder="请选择婚姻状况"></u-input>
				   </view>
               </u-form-item>
           </u-form>
       </view>
        <view class="footer-btn">
            <view>
                <u-button color="#D7D4D4" @click="handleReset">重 置</u-button>
                <u-button color="#7A9AD0" @click="handleSubmitPhysicalExam" style="margin-left:5px;">提 交</u-button>
            </view>
        </view>

    </view>
</template>

<script>
	import {getIdInfo} from '@/utils/index.js'
	import {getDictType} from '../../api/advance.js'
	import{saveOrEditUserInfo,getUserInfo} from '../../api/login.js'
	import {GMTToTime,currentTime} from '../../utils/time.js'
	import {hideCode} from '../../utils/index.js'
    export default {
        name: "userInfo",
        data(){
            return {
                userInfoForm:{
                    name:'',
                    sex:'',
                    birthday:'',
                    phone:'',
                    certificateNo:'',
                    marryType:'',
					marryTypeName:'',
					certificateType:'',
					certificateName:'',
					age:'',
					openId:'',
                },
                birthdayShow:false,
                certOptions:[],
                certTypeShow:false,
				marryTypeShow:false,
				marryOptions:[],
                rules:{
					name:{type: 'string',required: true,message: '请填写姓名',trigger: ['blur','change']},
					sex:{type: 'string',required: true,message: '请选择性别',trigger: ['change']},
					age:{type: 'string',required: true,message: '请输入年龄',trigger: ['blur']},
					birthday:{type: 'string',required: true,message: '请选择出生日期',trigger: ['change']},
					certificateName:{type: 'string',required: true,message: '请选择证件类型',trigger: ['change']},
					certificateNo:[{type: 'string',required: true,message: '请输入证件号',trigger: ['blur','change']},
					{validator: (rule, value, callback) => { return uni.$u.test.idCard(value); }, message: '证件号码不正确', trigger: ['change','blur'],}],
					phone: [{ required: true,  message: '请输入手机号', trigger: ['change','blur'], },
							{validator: (rule, value, callback) => { return uni.$u.test.mobile(value); }, message: '手机号码不正确', trigger: ['change','blur'],
					}]
				},
				birth:'',
				
            }
        },
        onLoad:async function(){
			// 获取证件类型
			 const certDate = await getDictType('certificate_type')
			 this.certOptions = [certDate.data]
			 const marryDate = await getDictType('marry_type')
			 this.marryOptions = [marryDate.data]
			 //获取个人信息
			 this.handleGetUserInfo() 
        },
        
        methods:{
			//根据身份证号获取性别、年龄、出生日期
			handleListenCertId(){
				if(this.userInfoForm.certificateType == '01'){
					 const certInfo = getIdInfo(this.userInfoForm.certificateNo)
					if(certInfo){
						this.userInfoForm.birthday = certInfo.birthday
						this.userInfoForm.sex = certInfo.gender ==='female'?'1':'0'
						this.userInfoForm.age = this.calAge(new Date(this.userInfoForm.birthday).getTime())
					}
				}
			},
			//计算年龄
			calAge(value){
				if(Number(new Date()) > value){
					let age = Number(new Date()) - value
					return parseInt(age/86400000/360)
				}
			},
			
			//出生日期确认
            handleConfirm(val){
                this.birthdayShow = false
				//自动算出年龄
				this.userInfoForm.age = this.calAge(val.value)
				//截取年月日
				this.userInfoForm.birthday = GMTToTime(new Date(val.value)).split(' ')[0]
            },
			//证件类型确认
			handleCertConfirm(val){
				this.userInfoForm.certificateName = val.value[0].dictLabel
				this.userInfoForm.certificateType = val.value[0].dictValue
				this.certTypeShow = false
				this.userInfoForm.certificateNo = ''
				this.userInfoForm.sex = ''
				this.userInfoForm.birthday = ''
				this.userInfoForm.age = ''
			},
			
			//婚姻状况确认
			handleMarryConfirm(value){
				this.userInfoForm.marryTypeName = value.value[0].dictLabel
				this.userInfoForm.marryType = value.value[0].dictValue
				this.marryTypeShow = false
			},
			//获取用户信息
			handleGetUserInfo(){
				getUserInfo(uni.getStorageSync('userInfo').userId).then(res => {
					//获取到的信息进行赋值
					for(let i in res.data){
						this.userInfoForm[i] = res.data[i]
					}
					this.userInfoForm.phone = uni.getStorageSync('userInfo').phone
					this.certOptions.forEach(item => {
						item.forEach(i => {
							if(i.dictValue == res.data.certificateType){
								this.userInfoForm.certificateName = i.dictLabel
								this.userInfoForm.certificateType = i.dictValue
							}
						})
					})
					this.marryOptions.forEach(item => {
						item.forEach(i => {
							if(i.dictValue == res.data.marryType){
								this.userInfoForm.marryTypeName = i.dictLabel
								this.userInfoForm.marryType = i.dictValue
							}
						})
					})
				})
			},
			//提交用户信息
			handleSubmitPhysicalExam(){
				this.$refs.userInfoRef.validate().then(res => {
					this.userInfoForm.openId = uni.getStorageSync('userInfo').openId
					const params =this.$clone(this.userInfoForm)
					delete params.certificateName
					delete params.marryTypeName
					// params.certificateNo = hideCode(params.certificateNo,0,0)
					// console.log("params.certificateNo",hideCode(params.certificateNo,0,0))
					saveOrEditUserInfo(params).then(res=> {
						if(res.code == 200){
							uni.showToast({
								icon: 'success',
								title: '保存成功',
							})
							const userInfo = uni.getStorageSync('userInfo')
							const newUserInfo ={}
							Object.assign(newUserInfo,res.data.basePersonRecordDO,res.data.loginReturnVo)
							console.log("新对象数据",newUserInfo)
							uni.setStorageSync('userInfo',newUserInfo)
							// uni.setStorageSync("userInfo",res.data)
							// localStorage.setItem("userName", res.data.name);
							// localStorage.setItem("phone", res.data.phone);
							// localStorage.setItem("userId", res.data.id);
							// localStorage.setItem("isPerfectInfo", true);
							// 用户保存成功回到上个页面
							console.log("getCurrentPages()",getCurrentPages())
							if(getCurrentPages().length !== 1){
							const pages = getCurrentPages()
							let prePage = pages[pages.length -2]
							uni.redirectTo({
								url:'/'+prePage.route
							})	
							}else{
								uni.redirectTo({
									url:'/pages/home/home'
								})	
							}
						}else{
							uni.showToast({
								icon: 'error',
								title: '保存失败',
							})
						}
					})
				}).catch(err => {
					uni.showToast({
						title:"信息输入有误",
						icon:'error'
					})
				})
				
			},
			  formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
			//重置
            handleReset(){
                for(let i in this.userInfoForm){
					this.userInfoForm[i] = ''
				}
				
            },

        }
    }
</script>

<style scoped lang="less">
.userInfo-wrapper{
    border-top:1px solid #eee;
	background-color: white;
    .userInfo-content{
        padding:0px 10px;
    }
    .btn{
        border:none;
        color:rgb(192, 196, 204);
    }
    uni-text{
        white-space: nowrap;
    }
    .footer-btn{
        position: fixed;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 50px;
        view{
            color:white;
            width:90%;
            margin:0 auto;
            display: flex;
        }
    }
}
</style>