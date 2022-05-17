<template>
    <view class="item-wrapper">
		<u-sticky style="top:0px">
        <u-subsection :list="menuList" :current="currentNo" bgColor="white" @change="sectionChange"></u-subsection>
		</u-sticky>
		<u-list @scrolltolower="scrolltolower" upperThreshold="20">
			<u-list-item v-for="(item,index) in projectList" :key="index">
				<view class="project-item" @click="handleToAdvanceDetail(item.examineRecordId,item.examineDate)">
				    <view style="width:40%;">
				       <view class="main-title">{{item.examinePackageName}}</view>
				        <view class="main-title small-title">{{item.combiProjectName}}</view>
				    </view>
				    <view style="width:30%;">
				        <text class="small-title">{{formateTIme(item.examineDate)}}</text>
				    </view>
				</view>
				<view>
				    <u-button size="small"  v-if="currentNo === 0" type="primary" @click="handleCancel(item)">
						取消预约
					</u-button>
				    <u-button size="small" v-else type="primary" @click="handleAgain(item)">
						重新预约
					</u-button>
				</view>
			</u-list-item>
			<u-loadmore :status="status" />
		</u-list>
		
        <view>
			<!-- 取消预约 -->
            <u-modal :show="cancelShow" :title="cancelTitle" :content='content' @confirm="handleCancelAdvance" @cancel="cancelShow = false" :showCancelButton='true'></u-modal>
           <!-- 重新预约 -->
			<u-datetime-picker :show="againTimeshow" v-model="againTime" mode="datetime" @cancel="againTimeshow = false" @confirm="handleAnginConfirm"></u-datetime-picker>
        </view>
    </view>
</template>

<script>
	import {GMTToTime} from '../../utils/time.js'
	import {viewReserveExamineList,deleteReserveExamine,addReserveExamine} from '../../api/advance.js';
    export default {
        name: "combo",
        data(){
            return {
                menuList:['待体检','已失效'],
                currentNo:0,
                cancelShow:false,
                againShow:false,
                againTitle:"重新预约体检套餐",
                cancelTitle:'取消预约体检套餐',
                content:'',
                againTimeshow:false,
                againTime:Number(new Date()),
				userId:'',
				pageNum:1,
				type:1,
				projectList:[],
				status:'loadMore',
				examineRecordId:'',
				totalPage:0,
				modalShow:false,
            }
        },
        onLoad:function(){
		   this.userId =uni.getStorageSync('userInfo').userId
           this.loadMore(this.userId,this.type,this.pageNum)
        },
		computed:{
			formateTIme(time){
				return function(time){
					 let date = new Date(time)
					    let Str=date.getFullYear() + '-' +
					    (date.getMonth() + 1) + '-' + 
					    date.getDate() + '-' +  
					    date.getHours() + ':' + 
					    date.getMinutes() + ':' + 
					    date.getSeconds()
					    return Str
				}
			},
		},

        methods:{
            sectionChange(value){
				//代体检1，已过期2
                this.currentNo = value 
				this.pageNum = 1
				this.type = value ==1?2:1
				this.projectList = []
				this.loadMore(this.userId,this.type,this.pageNum)
            },
			scrolltolower(){
				if(this.pageNum < this.totalPage){
				 this.pageNum++
				this.loadMore(this.userId,this.type,this.pageNum)
				}else {
				 return 
				}
			},
			//加载预约项目列表
			loadMore(userId,type,pageNum,pageSize = 10){
				viewReserveExamineList(userId,type,pageNum,pageSize).then(res => {
					this.projectList = res.data.records.length !== 0?[...this.projectList,...res.data.records.map(item => item)] : []
					if((parseInt(res.data.total%pageSize))!== 0){
						this.totalPage = (parseInt(res.data.total/pageSize)) +1
					}else{
						this.totalPage = (parseInt(res.data.total/pageSize))
					}
					
					if(this.pageNum >= this.totalPage ){
						this.pageNum = this.totalPage
						this.status = 'nomore'
					}else{
						this.pageNum = this.pageNum
						this.status = 'loadMore'
					}
				})
			},
			//取消预约
			handleCancelAdvance(){
				deleteReserveExamine(this.examineRecordId).then(res => {
					if(res.code == 200){
						uni.showToast({
							title:'取消预约成功',
							icon:'success',
							success:()=>{
								this.projectList = []
								this.loadMore(this.userId,this.type,this.pageNum)
							}
						})
					}else {
						uni.showToast({
							title:'取消预约失败',
							icon:'error'
						})
					}
					this.cancelShow= false
				})
			},
			handleAgain(item){
				uni.navigateTo({
					url:'/pages/advance-project/advance-physicalExam?params='+JSON.stringify(item)
				})
			},
			//重新预约
			handleAnginConfirm(){
				addReserveExamine().then(res => {
					if(res.code == 200){
						uni.showToast({
							title:'预约成功',
							icon:'success'
						})
					}else{
						uni.showToast({
							title:'预约失败',
							icon:'error'
						})
					}					})
			},
			//触发取消预约按钮
			handleCancel(item){
				this.cancelShow= true
				this.content = `确定取消${item.examinePackageName}体检套餐吗？`
				this.examineRecordId = item.examineRecordId
			},
			handleToAdvanceDetail(id,time){
				// uni.navigateTo({
				// 	url:'/pages/advance-project/advance-detail?examineRecordId='+id
				// })
				let params = {
					examineRecordId:id,
					examineDate:time,
				}
				uni.navigateTo({
					url:'/pages/advance-project/advance-detail?params='+JSON.stringify(params)
				})
			},
			
			},

        
    }
</script>

<style scoped lang="less">
.item-wrapper{
    width:100%;
	border-top: 1px solid #eee;
    .project-item{
		width:80%;
		
		height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom:1px solid #f2f2f2;
  //       padding:5px 0px 5px 0px;
		 .main-title{
			width:80%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			 font-size: 13px;
			
		}
        .small-title{
             font-size:12px;
			 

        }
    }
}

::v-deep .u-list-item{
	align-items: center;
	flex-direction: row;
	justify-content: space-evenly;
	background-color: white;
	margin:2px 0;
	
}

::v-deep .u-button{
	font-size: 12px;
	white-space: nowrap;
}

::v-deep .u-subsection__item--last{
	border-left:1px solid #eee;
}
</style>