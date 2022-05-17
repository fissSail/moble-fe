<template>
    <view class="combo-wrapper">
		<u-sticky style="top:0px">
		<view class="comboType">
		    <view class="comboType-item" @click="handleComboType('000')" >
			    <u-image width="40px" height="40px" src="../../static/combo/11.png"></u-image>
		        <view class="comboType-text" :style="{color:examineType == '000' ?'#4EA4FB':''}">全部</view>
		    </view>
		    <view class="comboType-item" @click="handleComboType('004')">
				<u-image width="40px" height="40px" src="../../static/combo/09.gif"></u-image>
		        <view class="comboType-text" :style="{color:examineType == '004' ?'#4EA4FB':''}"  >健康体检</view>
		    </view>
		    <view class="comboType-item" @click="handleComboType('001')">
				<u-image width="40px" height="40px" src="../../static/combo/07.gif"></u-image>
		        <view class="comboType-text" :style="{color:examineType == '001' ?'#4EA4FB':''}">从业人员体检</view>
		    </view>
		    <view class="comboType-item" @click="handleComboType('003')" >
					<u-image width="40px" height="40px" src="../../static/combo/05.gif"></u-image>
		        <view class="comboType-text" :style="{color:examineType == '003' ?'#4EA4FB':''}">老年体检</view>
		    </view>
		</view>
		
		<view style="width:100%;height:10px;background-color: rgb(247,247,247);"></view>
		 <view style="position: relative">
					<view class="combo-filter">
						<view style="display: flex" @click="handleFilterChange">
							<text style="font-size: 13px">筛选</text>
							<u-icon name="arrow-down"></u-icon>
						</view>
						<view class="filter-pop" v-show="filterShow">
							<view class="sex">
								<view>性别</view>
								<view class="sexoptions">
									<view :style="{backgroundColor:filterForm.sex === 1? '#7A9AD0' : ''}"  @click="handleSexChange(1)">男</view>
									<view :style="{backgroundColor:filterForm.sex === 2? '#7A9AD0' : ''}" @click="handleSexChange(2)">女</view>
									<view :style="{backgroundColor:filterForm.sex === 3? '#7A9AD0' : ''}" @click="handleSexChange(3)">通用</view>
								</view>
							</view>
							<view class="age">
								<view>年龄</view>
								<view class="input-range">
									<u-input v-model="filterForm.minAge" type="number"  class="input"/> 至
									<u-input v-model="filterForm.maxAge" type="number" class="input"/>
								</view>
							</view>
							<view class="price-range">
								<view>价格区间</view>
								<view class="input-range">
									<u-input v-model="filterForm.minPrice" type="number" class="input"/> 至
									<u-input v-model="filterForm.maxPrice" type="number" class="input"/>
								</view>
							</view>
						
							<view class="filter-btn">
								<u-button color="#D7D4D4" @click="handleReset">重置</u-button>
								<u-button color="#7A9AD0" @click="handleFinish">完成</u-button>
							</view>
						</view>
						<view class="line"></view>
						<view style="display: flex" @click="handleChangeSort">
							<text style="font-size: 13px">销量排序</text>
							<u-icon v-if="sortByDesc" name="arrow-down"></u-icon>
							<u-icon v-else name="arrow-up"></u-icon>
						</view>
					</view>
		         </view>
				</u-sticky>
		
		 <view class="combo-list" style="background-color: white;">
			<u-list @scrolltolower="scrolltolower" lowerThreshold="150">
				<u-list-item v-for="(item,index) in comboList" :key="index">
					<u-cell @click="handleTOComboDetail(item.baseExaminePackageId,item.id)">
						<template slot="title">				
						<view class="content">
						<view>{{item.title}}</view> 
						<view class="comboContent">{{item.content}}</view>
						<view class="price">
							<view>￥ {{item.amountReceivable}}</view>
							<view>{{item.saleNumber}}人已加购</view>
						</view>
					</view>
					</template>
						<u-image slot="icon" :src="getFilePath(item.image)" width="100px" height="100px">
							<view slot="error" style="font-size: 24rpx;">加载失败</view>
						</u-image>
					</u-cell>
				</u-list-item>
				<u-loadmore :status="status"></u-loadmore>
			</u-list>
		 </view>
		 <u-tabbar
		         :value="active"
		         :fixed="true"
		         :placeholder="false"
		         :safeAreaInsetBottom="false">
		     <u-tabbar-item text="首页" icon="home" @click="handleToHome" ></u-tabbar-item>
		     <u-tabbar-item text="套餐" icon="bag" ></u-tabbar-item>
		     <u-tabbar-item text="我的" icon="account" @click="handleToMy" ></u-tabbar-item>
		 </u-tabbar>
    </view>
</template>

<script>
    import {getComboList,getComboDetail} from '../../api/combo'
    export default {
        name: "combo",
        data(){
            return {
				filterForm:{
					examineType:'000',//体检类型：004健康体检，003老年体检，001从业人员体检，002职业健康体检
					sex:'',//性别：1男，2女，3通用
					minAge:'',//最小年龄
					maxAge:'',//最大年龄
					minPrice:'',//最低价格
					maxPrice:'',//最高价格
					sales:'1',//销量：1降，2升
					pageNum:1,
					pageSize:10,
				},
                comboType:[],
                sortByDesc:true,
                filterShow:false,
                active:1,
				comboList:[],
				status:'loadmore',
				totalPage:0,
				examineType:'000'
            }
        },
        onLoad(){
        	//加载列表数据
			this.loadMore()
		},
		 methods:{
            handleToHome(){
                uni.navigateTo({
                    url:'/pages/home/home'
                })
            },
            handleToMy(){
                uni.navigateTo({
                    url:'/pages/profile/profile'
                })
            },
			
			//销量排序筛选
            handleChangeSort(){
                this.sortByDesc = !this.sortByDesc
				// 1降2升
				this.sortByDesc ? this.filterForm.sales = 1 : this.filterForm.sales = 2
				this.filterForm.pageNum = 1
				this.comboList = []
                this.loadMore()
			},
            handleFilterChange(){
                this.filterShow= !this.filterShow
            },
            handleTOComboDetail(id,detailId){
                this.filterShow = false
				let params = {
					baseExaminePackageId:id,
					detailId,
				}
                uni.navigateTo({
                    url:'/pages/combo/combo-detail?params='+JSON.stringify(params)
                })
            },
			//触发体检类型事件
            handleComboType(index){
			    this.examineType = index
				 this.comboList = []
				this.filterForm.pageNum = 1
				this.loadMore()
            },
            handleSexChange(type){
                this.filterForm.sex = type
            },
			//重置搜索项
			handleReset(){
				this.filterForm.sex = ''
				this.filterForm.minAge = ''
				this.filterForm.maxAge = ''
				this.filterForm.minPrice = ''
				this.filterForm.maxPrice = ''
			},
			//搜索列表
			handleFinish(){
				this.filterForm.pageNum = 1
			    this.comboList = []
				this.loadMore()
				this.filterShow = false
			},
            //列表滚动事件
            scrolltolower(){
				 if(this.filterForm.pageNum < this.totalPage){
					 this.filterForm.pageNum++
					 this.loadMore()
				 }else {
					 return 
				 }
            },
			//获取套餐列表
            loadMore(){
				//全部条件类型
				this.filterForm.examineType = this.examineType == '000' ? '':this.examineType;
                getComboList(this.filterForm).then(res => {
                    this.comboList = res.data.records.length !== 0?[...this.comboList,...res.data.records.map(item => item)] : []
					if((parseInt(res.data.total%this.filterForm.pageSize))!== 0){
						this.totalPage = (parseInt(res.data.total/this.filterForm.pageSize)) +1
					}else{
						this.totalPage = (parseInt(res.data.total/this.filterForm.pageSize))
					}
					if(this.filterForm.pageNum >= this.totalPage ){
						this.filterForm.pageNum = this.totalPage
						this.status = 'nomore'
					}else{
						this.filterForm.pageNum = this.filterForm.pageNum
					}
                })
            },

        }
    }
</script>

<style scoped lang="less">
.combo-wrapper {
    .comboType {
        padding: 5px 0;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        display: flex;
		background-color: white;
		.comboType-item{
			flex:1;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
        .comboType-text {
            font-size: 12px;
            text-align: center;
        }
    }

    .combo-filter {
        // margin-top: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 40px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
		background-color: white;

        .line {
            width: 1px;
            height: 45px;
            background-color: #eee;
        }

        .filter-pop {
            position: absolute;
            left: 0px;
            top: 40px;
            width: 100%;
            border-bottom: 1px solid #eee;
            background-color: white;
            z-index: 999;

            .sex {
                .sexoptions {
                    width: 80%;
                    display: flex;
                    justify-content: space-around;
					           align-items: center;
                    view {
                        width: 60px;
                        height: 25px;
                        border: 1px solid #eee;
                        text-align: center;
                    }
                }
            }
            .input-range {
                display: flex;
                width: 80%;
                align-items: center;
                .input {
                    width: 30px;
                    text-align: center;
                }
            }
        }
    }

    .combo-list {
         margin-bottom: 100rpx;
    & > view {
        display: flex;
        padding: 5px;
    }
}
}

.content {
	width:100%;
    margin-left: 3px;
    & > view {
        padding-top: 7px;
    }
    & > view:nth-of-type(1) {
        font-weight: bold;
        font-size: 14px;
        text-indent: 20px;
		width:200rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
    }
    & > view:nth-of-type(2) {
        font-size: 13px;
		width:400rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
    }
    .price {
		width:100%;
        display: flex;
        justify-content: space-between;
        view {
            &:nth-of-type(1) {
                color: #FB9A12;
            }
            &:nth-of-type(2) {
                font-size: 10px;
                color: #B7B2B2;
            }
        }
    }
}

.filter-btn{
	display:flex;
	width:100%;
	box-shadow: -2px -2px 10px #E1E1E1;
	margin-top:5px;
}
.price-range,.sex,.age{
	padding:5px 15px;
}
</style>

