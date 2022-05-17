<template>
		<view class="finish-wrapper">
			<u-sticky style="top:0px">
				<view class="time-search">
					<view>
						<svg t="1648871248210" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2197" width="30" height="30"><path d="M896 448H128v447.957333l477.738667 0.021334L896 895.957333V448z m0-42.666667V192.042667C896 192 768 192 768 192V149.333333h128.042667A42.666667 42.666667 0 0 1 938.666667 192.042667v703.914666A42.624 42.624 0 0 1 896.064 938.666667H127.936A42.666667 42.666667 0 0 1 85.333333 895.957333V192.042667C85.333333 168.469333 104.256 149.333333 127.957333 149.333333H256v42.666667l-128 0.042667V405.333333h768zM298.666667 85.333333h42.666666v170.666667h-42.666666V85.333333z m384 0h42.666666v170.666667h-42.666666V85.333333zM384 149.333333h256v42.666667H384V149.333333z" fill="#3D3D3D" p-id="2198"></path></svg>
					</view>
					<view @click="dateShow = true">
						<text>{{params.startTime}}</text>至
						<text>{{params.endTime}}</text>
					</view>
				</view>
			</u-sticky>
			
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in examFinishList" :key="index" >
					<view class="finish-content">
						<view class="time">
							<view>{{item.endTime}}</view>
							<view>
								<u-button type="primary" @click="handleViewReport(item)">查看</u-button>
							</view>
						</view>
						<view class="content">
							<view>
								<view style="color:rgb(125 118 118)">体检套餐类型</view>
								<view>{{item.examineType}}</view>
							</view>
							<view>
								<view>体检套餐名称</view>
								<view>{{item.examinePackageName}}</view>
							</view>
							<view>
								<view>体检人</view>
								<view>{{item.personRecordName}}</view>
							</view>
						</view>
					</view>
				</u-list-item>
				<u-loadmore :status="status" ></u-loadmore>
			</u-list>
			<u-calendar :show="dateShow" :mode="mode" @close="dateShow =false" @confirm="handleConfirm" :defaultDate="defaultDate" :minDate="weekAgo"></u-calendar>
		</view>
</template>

<script>
	
import{getYestoday,currentTime} from '../../utils/time.js'
import {examineFinishList}from '../../api/advance.js'
    export default {
        name: "combo",
	
        data(){
            return {
				params:{
					userId:uni.getStorageSync('userInfo').userId,
					endTime:'',
					startTime:'',
					pageNum:1,
					pageSize:10,
				},
				totalPage:0,
				dateShow:false,
				mode: 'range',
				status:'nomore',
				examFinishList:[],
				weekAgo:getYestoday(),
				defaultDate:[getYestoday(),currentTime()],
				
            }
        },
        onLoad:function(){
			this.handleAdvanceFinish()
			//开始时间
			const startTime = getYestoday()
			this.params.startTime = startTime
			//结束时间
			const endTime = currentTime()
			this.params.endTime = endTime			
        },
        methods:{
			//加载就诊记录
			handleAdvanceFinish(){
				examineFinishList(this.params).then(res =>{
					this.examFinishList = res.data.records.length !== 0?[...this.examFinishList,...res.data.records.map(item => item)] : []
					this.totalPage = (parseInt(res.data.total/this.params.pageSize)) +1
					if(this.params.pageNum >= this.totalPage ){
						this.params.pageNum = this.totalPage
						this.status = 'nomore'
					}else{
						this.params.pageNum = this.params.pageNum
					}
				})
			},
			//向下滚动
			scrolltolower(){
				if(this.params.pageNum < this.totalPage){
				 this.params.pageNum++
				 this.handleAdvanceFinish()
				}else {
				 return 
				}
			},
			//查看报告单
			handleViewReport(item){
				const params = {
					postType:item.postType,
					examineRecordId:item.examineRecordId,
					examineTypeCode:item.examineTypeCode,
				}
				const reportType = this.handleData(
					params.examineTypeCode,
					params.postType
				);
				uni.request({
					url: `/dev-api/print/previewReport/${reportType}`,
					data: { examineRecordId: params.examineRecordId },
					responseType: "arrayBuffer",
					method: "post",
					header: {
					Authorization:uni.getStorageSync('userInfo').token,	
					},
					success: (res) => {
						const binaryData = [];
						binaryData.push(res.data);
						//获取blob链接
						let pdfUrl = window.URL.createObjectURL(
							new Blob(binaryData, { type: "application/pdf" })
						);
						uni.navigateTo({
							url:'/pages/advance-project/advance-report?url='+encodeURIComponent(pdfUrl)
						})
					},
				});
			},
			// 001从业人员体检；002职业健康体检；003老年体检；004健康体检
			//匹配reportType
			handleData(examType, postType) {
				let type = examType + "-" + postType;
				console.log("type", type);
				let reportType = "";
				switch (type) {
					case "002-1001":
					//职业健康个人上岗前报告
					reportType = "3";
					break;
					//职业健康个人在岗报告
					case "002-1002":
					reportType = "3";
					break;
					//职业健康个人离岗时报告
					case "002-1003":
					reportType = "3";
					break;
					//职业健康个人离岗后报告
					case "002-1004":
					reportType = "3";
					break;
					// 职业健康个人应急健康检查报告
					case "002-1005":
					reportType = "3";
					break;
					// 健康体检报告
					case "004-":
					reportType = "4";
					break;
					// 老年体检报告
					case "003-":
					reportType = "5";
					break;
					// 从业体检报告
					case "001-":
					reportType = "6";
					break;
					//团体体检报告
					default:
					reportType = "9";
					break;
				}
				return reportType;
			},
			// 时间过滤
			handleConfirm(value){
				this.params.startTime = value[0],
				this.params.endTime = value[1]
				this.params.pageNum = 1
				this.handleAdvanceFinish()
				this.dateShow = false
			},
        }
    }
</script>

<style scoped lang='less'>
.finish-wrapper{
	border-top:1px solid #eee;
	.time-search{
		display:flex;
		align-items: center;
		background-color: white;
		border-radius: 10px;
		height:50px;
	
	}
}
.finish-content{
	padding:5rpx;
	background-color: white;
	margin:5px 0;
	border-radius: 10px;
	.time{
		display:flex;
		align-items: center;
		justify-content: space-between;
		border-bottom:1px solid #eee;
	}
	.content >view{
		display:flex;
		align-items: center;
		justify-content: space-between;
		padding:10rpx 5rpx;
		
	}
}
</style>