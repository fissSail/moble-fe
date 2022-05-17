<template>
    <view class="combo-wrapper">
        <u-swiper :list="swiperImage" imgMode="scaleToFill"></u-swiper>
        <view class="combo-detail">
            <h5>{{comboDetail.title}}</h5>
            <view class="combo-price">
                <view>￥{{comboDetail.amountReceivable}}</view>
                <view>销量：{{comboDetail.saleNumber}}</view>
            </view>
        </view>

        <view>
           <view  class="combo-params"> 
				<view>
				     <text>门店</text>
				     <text>南昌大学第一附属医院</text>
				</view>
				<view>
					<text>参数</text>
					<text >适用人群:</text>
					<text>{{ageRange}}</text>
					<text style="margin-left:10rpx;">适用性别:</text>
					<text v-for="(item,index) in sexRange" :key="index">{{item}}</text>
				</view>
			</view>
            <view>
                <u-tabs :list="tabList"  @click="handleTabClick" ></u-tabs>
				<view>
					<view v-if="currentTabIndex == 0" class="comboDateilContent">{{comboDetail.content}}</view>
					<view v-else-if="currentTabIndex == 1" class="comboDateilContent">{{comboDetail.matter}}</view>
					<view v-else-if="currentTabIndex == 2">
						<u-list @scrolltolower="scrolltolower" >
							<view class="item-wrapper">
								<u-list-item v-for="(item,index) in recommendList" :key="index" >
									<view @click="handleComboRecommend(item.id)">
										<u-image :src="getFilePath(item.image)" width="100%" height="200rpx" ></u-image>
											<view class="title" >{{item.title}}</view>
									</view>
								</u-list-item>
							</view>
							<u-loadmore :status="status"></u-loadmore>
						</u-list>
					</view>
				</view>
            </view>
        </view>

        <view class="footer-btn">
            <view>
                <u-button color="#D7D4D4" @click="handleCancel">取 消</u-button> 
                <u-button color="#7A9AD0" style="margin-left:5px;" @click="handleToAdvance()">立即预约</u-button>
            </view>
        </view>
    </view>
</template>

<script>
	import {getComboDetail,getComboRecommend} from '../../api/combo'
    export default {
        name: "combo-detail",
        data(){
            return {
				comboDetail:{}, //套餐详情
				swiperImage:[],  //轮播图
				recommendList:[],//推荐套餐
				currentTabIndex:0,
                tabList:[{
                    name:'套餐介绍'
                },{
                    name:'温馨提示'
                },{
                    name:'套餐推荐'
                }],
				pageNum:1,
				tagId:'',
				detailId:'',//套餐id
				totalPage:0,
				status:'nomore',
				comboId:'',
				ageRange:'',
				sexRange:[],
				sexList:[{dictLabel:'男',dictValue:'1'},{dictLabel:'女',dictValue:'2'},{dictLabel:'通用',dictValue:'3'}],
            }
        },
        onLoad:function(options){
			if(options.hasOwnProperty('params')){
				let params = JSON.parse(options.params)
				this.comboId = params.baseExaminePackageId
				this.handleComboDetail(params.detailId)
			}
        },
        methods:{
			//显示套餐详情数据
			handleComboDetail(id){
		       getComboDetail(id).then(res => {
				   this.comboDetail = res.data
				   const imgs  = Boolean(res.data.image)?res.data.image.split(','):[]
				  if(imgs.length !== 0){
				  this.swiperImage= imgs.map(item => {
					   return  this.getFilePath(item) 
				   })
				  }
				   this.tagId =  res.data.baseTagVOList.length !== 0?res.data.baseTagVOList.map(item => item.id) : [],
				   this.handleShowParam()
				   //提前加载套餐推荐数据
				   this.loadMore( this.tagId)
			   })
		   },
		   
		   //下拉加载数据
		   scrolltolower(){
			   if(this.pageNum < this.totalPage){
				 this.pageNum++
				 this.loadMore(this.tagId)
			   }else {
				  return 
			   }
		   },
		   
		   //显示套餐推荐数据
		   loadMore(tagId = this.tagId,pageNum =this.pageNum,pageSize = 10){
			   getComboRecommend(tagId,pageNum).then(res => {
				   this.recommendList = res.hasOwnProperty('data')?[...this.recommendList,...res.data.map(item => item)] : []
				   if((parseInt(this.recommendList.length%pageSize))!== 0){
				   	this.totalPage =(parseInt(this.recommendList.length%pageSize)) +1
				   }else{
				   	this.totalPage = (parseInt(this.recommendList.length%pageSize))
				   }
				   if(this.pageNum >= this.totalPage ){
				   	this.pageNum = this.totalPage
				   	this.status = 'nomore'
				   }else{
				   	this.pageNum = this.pageNum
				   }
			   })
		   },
		   
		   //触发tab事件
		   handleTabClick(item){
			   this.currentTabIndex = item.index
		   },

		   //显示套餐参数
		   handleShowParam(type){
			   const ageArr = []
			   const sexArr = []
			  if(this.comboDetail.baseTagVOList.length !== 0){
				  this.comboDetail.baseTagVOList.forEach(item => {
					   if(typeof(item.minApplyAge) == 'number' && typeof(item.maxApplyAge) == 'number'){
							 ageArr.push(item.minApplyAge)
							 ageArr.push(item.maxApplyAge)
					   }else if(typeof(item.minApplyAge) == 'number'){
							 ageArr.push(item.minApplyAge)
					   }else if(typeof(item.maxApplyAge) == 'number'){
							 ageArr.push(item.maxApplyAge)
					   }
						sexArr.push(this.formmateSex(this.sexList,item.applySex))
				  })
				  this.ageRange = Math.min.apply(Math,ageArr) + '至' + Math.max.apply(Math,ageArr) + '岁'
				  this.sexRange = new Set(sexArr)
			  }
			   
		   },
		   //翻译性别字典
		    formmateSex(sexOptions,sexType){
			   return sexOptions.find(item => {
				 return item.dictValue == sexType
			   }).dictLabel
			 },
			 
			 //预约体检
		   async handleToAdvance(){
			   if (!await this.perfectInfoOrBindingWx()) {
			       return
			   }
			   const advanceParams = {
				   baseExaminePackageId:this.comboId,
				   title:this.comboDetail.title,
				   examineType:this.comboDetail.examineType
			   }
			   uni.navigateTo({
			   	url:"../advance-project/advance-physicalExam?advanceParams="+JSON.stringify(advanceParams)
			   })
		   },
		   
		   handleCancel(){
		       uni.navigateTo({
		       	url:'/pages/home/home'
		       })
		   },
		   
		   //显示套餐推荐的详情
		   handleComboRecommend(id){
			   this.recommendList = []
			   this.handleComboDetail(id)
		   },
		   //是否用户信息完善
		   perfectInfoOrBindingWx() {
		    const isPerfectInfo = uni.getStorageSync('userInfo').isPerfectInfo;
		   	console.log("uni.getStorageSync('isPerfectInfo')",uni.getStorageSync('userInfo').isPerfectInfo)
		       if (!isPerfectInfo) {
		           /**
		            * 信息不完善用户弹出
		            * 1，第一次手机号登录，信息不完善，没有userId，跳转信息完善页面
		            * 2，第一次微信登录，信息不完善，没有userId，但有用户标识（openId），弹出微信绑定提示框，需要根据输入的手机或证件号查询用户id进行微信绑定，如何绑定失败表示没有用户id，则跳转信息完善页面填写信息进行保存并自动绑定
		            */
		           this.bindingWxPopupVisible = true;
		           this.$nextTick(() => {
		               this.$refs.bindingWxPopup.open(this.bindingWxPopupVisible);
		           });
		           return false;
		       }else {
		   		return true
		   	}
		   }
        }
    }
</script>

<style scoped lang="less">
    .combo-wrapper{
		margin-bottom:40px;
		background-color: white;
        width:100%;
        .combo-detail{
            width:90%;
            margin:10px auto;
            .combo-price{
                margin-top:10px;
                display:flex;
                justify-content: space-between;
                align-items: center;
                view{
                    &:nth-of-type(1){
                        color:#FB9A12;
                    }
                    &:nth-of-type(2){
                        font-size: 10px;
                        color:#B7B2B2;
                    }
                }
            }

        }
        .combo-params{
            border-bottom: 1px solid #eee;
            view{
                border-top: 1px solid #eee;
               padding:10px 0;
                text{
                    &:nth-of-type(1){
                        padding-left:20px;
                    }
                    &:nth-of-type(2){
                        padding-left:20px;
                    }
                }
            }
        }

        .footer-btn{
			background-color: white;
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

.recommend-wrapper{
	width:40%;
	display:inline-block;
}
.item-wrapper{
	display:grid;
	grid-column-gap: 5%;
	grid-template-columns: repeat(2,47%);
	margin:0px 20rpx;
	.title{
		text-align: center;
		margin:10rpx 0;
	}
}

.comboDateilContent{
	text-indent: 2em;
	padding:10rpx 20rpx;
	line-height: 2em;
}
</style>