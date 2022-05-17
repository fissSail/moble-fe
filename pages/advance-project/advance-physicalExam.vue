<template>
    <view class="phyExam-wrapper">
        <view style="border-top: 1px solid #eee;margin:0px 20rpx;">
            <u-form :model="phyExamForm">
                <u-form-item  label="体检类型" borderBottom @click="phyExamShow = true" label-width="180rpx">
                    <view>
                        <u-picker :show="phyExamShow" :columns="phyExamOptions" keyName="name" @confirm="handlePhysicalConfirm" @cancel="phyExamShow = false"></u-picker>
                        <u-input v-model="phyExamForm.examineType"  placeholder="请选择体检类型"  border="none"></u-input>
                    </view>
                </u-form-item>
                <u-form-item label="体检时间" borderBottom @click="timeShow = true" label-width="180rpx">
                    <view>
                        <u-datetime-picker  :show="timeShow" v-model="phyExamForm.time"  mode="datetime" :minDate="minDate"  @cancel="timeShow = false" @confirm="handleTimeConfirm"></u-datetime-picker>
                        <u-input v-model="phyExamForm.examineDate"  placeholder="请选择体检时间" border="none"></u-input>
                    </view>
                </u-form-item>
                <u-form-item label="体检套餐" borderBottom label-width="180rpx" @click="handleComboShow">
                    <view>
                        <u-picker :show="comboShow"  :closeOnClickOverlay="false" :columns="comboOptions" keyName="title" @cancel="comboShow = false" @confirm="handleComboConfirm"></u-picker>
                        <u-input v-model="phyExamForm.baseExaminePackageName"  placeholder="请选择体检套餐" border="none"></u-input>
                    </view>
                </u-form-item>
                <u-form-item label="体检状态" border-bottom label-width="180rpx">
                    <u-checkbox-group  v-model="phyExamForm.status">
                        <u-checkbox  label="是否加急" name="1"/>
                        <u-checkbox  label="是否复检" name="2"/>
                    </u-checkbox-group>
                </u-form-item>
                <u-form-item>
                    <view class="footer-btn">
                        <view>
                            <u-button color="#D7D4D4" @click="handleCancel">取 消</u-button>
                            <u-button color="#7A9AD0" @click="handleSubmitPhysicalExam" style="margin-left:5px;">提交预约</u-button>
                        </view>
                    </view>
                </u-form-item>
            </u-form>
        </view>
      <view >
	</view>
	<u-modal :show="isFullShow" :title="isFullFitle" :content='isFullContent' @confirm="handleIsFullConfirm"></u-modal>
    </view>
</template>

<script>
	import {GMTToTime} from '../../utils/time.js'
    import UFormItem from "../../uview-ui/components/u-form-item/u-form-item";
	import {addReserveExamine} from '../../api/advance.js'
	import {getUserInfo} from '../../api/login.js'
    import {getComboList,getAdvanceType} from '../../api/combo'
	import {clone} from '../../utils/index.js'
    export default {
        name: "advance-physicalExam",
        components: {UFormItem},
        data(){
            return {
                columns:[],
                show:false,
                phyExamOptions:[], //体检类型字典
                phyExamShow:false,
                timeShow:false,
                comboShow:false,
                phyExamForm:{
                    examineDate:'',
					time:Number(new Date()),
                    examineType:'',
					examineTypeId:'',
					baseExaminePackageId:'',
					baseExaminePackageName:'',
					isExpedited:'', //是否加急
					isRecheck:'', //是否复检
                    status:[],
					isFull:'',//是否忽略部分预约项目已满，1是0否
                },
				examineRecordId:'',
				examineCode:'',
                comboOptions:[],
				flag:false,
				minDate:Number(new Date())-86400000,
				modalShow:false,
				isFullShow:false,
				isFullFitle:'',
				isFullContent:'',
            }
        },
		
        onLoad: function(option) {
			// 重新预约
			if(option.hasOwnProperty('params')){
				console.log("----重新预约",JSON.parse(option.params))
				let params = JSON.parse(option.params)
				this.phyExamForm.examineType = params.examineType
				this.phyExamForm.examineDate = GMTToTime(new Date())
				this.phyExamForm.baseExaminePackageName = params.examinePackageName
				this.phyExamForm.baseExaminePackageId = params.examineRecordId
				this.flag = true
				//套餐详情，进行的预约
			}else if(option.hasOwnProperty('advanceParams')){
				console.log("----套餐详情",JSON.parse(option.advanceParams))
					let params = JSON.parse(option.advanceParams)
					this.phyExamForm.baseExaminePackageName = params.title
					this.phyExamForm.baseExaminePackageId = params.baseExaminePackageId
					this.phyExamForm.examineType = params.examineType
				this.flag = true	
			}else{
				this.flag = false	
			}
			this.handleAdvanceType()
			// this.handleComboList()
        },
        methods:{
            handleComboType(){},
            handleCancel(){
                uni.navigateBack()
            },
			
			handleComboShow(){
				if(this.comboOptions.length !== 0){
					this.comboShow = true
				}else{
					this.comboShow = false
					uni.showToast({
						title:"暂无可预约套餐",
						icon:'eror',
						duration:1000,
					})
				}
			},
			//提交预约体检
            handleSubmitPhysicalExam(){
				//isRecheck复检 isExpedited加急
				if(status.length !== 0 ){
					if(this.phyExamForm.status.includes('1') && this.phyExamForm.status.includes('2')){
						this.phyExamForm.isExpedited = 1
						this.phyExamForm.isRecheck = 1
					}else if(this.phyExamForm.status.includes('1')){
						//选择加急 未选择复检
						this.phyExamForm.isExpedited = 1
						this.phyExamForm.isRecheck = 0
					}else if(this.phyExamForm.status.includes('2')){
						//未选择加急 选择复检
						this.phyExamForm.isExpedited = 0
						this.phyExamForm.isRecheck = 1
					}else{
						this.phyExamForm.isExpedited = 0
						this.phyExamForm.isRecheck = 0
					}
				}else{
					this.phyExamForm.isExpedited = 0
					this.phyExamForm.isRecheck = 0
				}
				let params = clone(this.phyExamForm)
				delete params.baseExaminePackageName
				delete params.examineType
				delete params.status
				delete params.time
				 addReserveExamine(params).then(res => {
					 if(res.code ===200){
						 uni.showToast({
						  	title:'预约成功',
						 	icon:'success'
						  })
						 uni.navigateTo({
						     url:'/pages/advance-project/advance-item'
						 })
					 }
				}).catch(err => {
					 // 预约日期已满
					 if(err.data.msg == '1'){
						uni.showToast({
							title:'当前日期预约已满，请重新选择日期',
							icon:'error',
							duration:3000
						 }) 
					 }else if(err.data.msg == '2'){
					 this.isFullShow = true
					 this.isFullFitle = "预约体检"
					 this.isFullContent = "当前日期部分项目预约已满，是否继续预约？"
					 }
				})
            },
			
			
			//获取体检类型
			async handleAdvanceType(){
				const { data } = await getAdvanceType(1,10)
				//移动端不做职业健康检查的预约
				this.phyExamOptions = data.records.filter(item => item.name !== '职业健康检查')
				//重新预约
				if(this.flag){
					let {id,code} = this.phyExamOptions.find(item => item.name == this.phyExamForm.examineType)
					this.examineCode = code
					this.phyExamForm.examineTypeId = id
				}
				this.phyExamOptions = [this.phyExamOptions]
			},
			// 选择体检类型
			handlePhysicalConfirm(val){
				let {value} = val
				this.phyExamForm.examineType = value[0].name
				this.phyExamForm.examineTypeId = value[0].id
				this.examineCode =  value[0].code
				this.phyExamForm.baseExaminePackageId = ''
				this.phyExamForm.baseExaminePackageName = ''
				this.phyExamShow = false
				//加载套餐列表数据
				this.handleComboList()
			},
			
			handleTimeConfirm(val){
				let {value} = val
				value = new Date(value)
				this.phyExamForm.examineDate = GMTToTime(value)
				this.timeShow = false
			},
			
			handleComboConfirm(val){
				let {value} = val
				this.phyExamForm.baseExaminePackageId = value[0].baseExaminePackageId
				this.phyExamForm.baseExaminePackageName = value[0].title
				this.comboShow = false
			},
			//选择体检套餐
			handleComboShow(){
				this.comboShow = true
				this.handleComboList()
			},
			//获取体检套餐
			handleComboList(){
				let filterForm = {
					examineType:this.examineCode,
					id:'',
					pageNum:1,
					pageSize:500,
				}
				this.comboOptions = []
				getComboList(filterForm).then(res => {
					this.comboOptions = [res.data.records]
				})
			},
			// 部分项目已满继续预约
			handleIsFullConfirm(){
				//继续预约
				this.phyExamForm.isFull = '1'
				this.handleSubmitPhysicalExam()
			}
        }
    }
</script>

<style scoped lang="less">
.phyExam-wrapper{
    width:100%;
	background-color: white;

    .item{
        &:first-of-type{
            // border-top:1px solid #eee;
        }
        font-size: 13px;
        // padding:5px 0px 5px 20px;
        display:flex;
        align-items: center;
        border-bottom:1px solid #eee;
        view{
            width:150px;
            margin-left:20px;
            .item-btn{
                color:#bababa;
                font-size: 12px;
            }
        }
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