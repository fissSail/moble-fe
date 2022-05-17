<template>
		<view class="scroll-wrapper">
		   <u-list @scrolltolower="scrolltolower">
		   	<u-list-item v-for="(item,index) in Projectdetail" :key="index">
		   		<view class="project-item">
		   		    <view class="content">
		   		        <view>{{item.examinePackageName}}</view>
		   		    </view>
					<view class="content">
					    <text >{{item.combiProjectName}}</text>
					</view>
		   		    <view class="content">
		   		        <text>{{item.deptName}}</text>
		   		    </view>
		   		    <view>
		   		        <text>{{examineDate}}</text>
		   		    </view>
		   		</view>
		   	</u-list-item>
			<u-loadmore :status="status" />
		   </u-list>
		</view>
</template>

<script>
import {viewReserveExamine}from '../../api/advance.js';
    export default {
        name: "combo",
        data(){
            return {
				examineRecordId:'',
				pageNum:1,
				status:'loadMore',
				Projectdetail:[],
				totalPage:0,
				examineDate:'',
            }
        },
        onLoad:function(option){
			console.log("获取的数据",JSON.parse(option.params))
			this.examineRecordId = JSON.parse(option.params).examineRecordId
			this.examineDate = JSON.parse(option.params).examineDate
			this.loadMore(this.examineRecordId,this.pageNum)
        },
        methods:{
			scrolltolower(){
				if(this.pageNum < this.totalPage){
				 this.pageNum++
				 this.loadMore(this.examineRecordId,this.pageNum)
				}else {
				 return 
				}
			},
			loadMore(id,pageNum,pageSize){
				viewReserveExamine(id,pageNum,pageSize = 10).then(res => {
					this.Projectdetail = res.data.records.length !== 0?[...this.Projectdetail,...res.data.records.map(item => item)] : []
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
					}
				})
			},
        }
    }
</script>

<style scoped lang='less'>
 .project-item{
	 background-color: white;
        display: flex;
		height: 30px;
		width:100%;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #f2f2f2;
	    padding:15rpx; 
        .small-title{
            font-size:12px;
			width:100rpx;
        }
		&>view{
			width:150rpx;
		}
    }
	
	.scroll-wrapper{
		border-top:1px solid #eee;
	}
	.content{
		width:100rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		background-color: ;
		
	}
</style>