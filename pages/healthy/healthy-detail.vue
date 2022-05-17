<template>
    <view class="healthy-wrapper">
        <view class="healthy-title">{{healthyDetail.tipsTitle}}</view>
		<view class="helthy-time">{{healthyDetail.createTime}}</view>
        <view class="healthy-content" v-html="healthyDetail.tipsContent"></view>
    </view>
</template>

<script>
import {viewHealthyDetail} from '../../api/question.js'
import {url} from '../../utils/address.js'
    export default {
        name:'healthy-detail',
        data(){
            return {
				healthyId:'',
				healthyDetail:{},
            }
        },
		onLoad:function(option){
			this.healthyId = option.id
			this.handleHealthyDetail()
		},
        methods:{
			//健康小常识详情
			handleHealthyDetail(){
				viewHealthyDetail(this.healthyId).then(res => {
					this.healthyDetail = res.data;
          // this.healthyDetail.replaceAll(this.healthyDetail,'< img src ')
					this.parseContent()
				})
			},
			
			//解析图片地址
			parseContent(){
				this.$nextTick(() => {
					let img = document.getElementsByTagName('img')
					let imgs = [...img]
					 imgs.forEach(item => {
						let replaceUrl = item.src.replace(url+'/dev-api','')
						item.src=this.getFilePath(replaceUrl)
            item.style.width = "300px";
            item.parentNode.style.textIndent = "0px";
            item.style.marginLeft = (item.parentNode.offsetWidth-300)/2+"px";
					})
					
				})
			},

        }
    }
</script>

<style lang="less">
    .healthy-wrapper{
        border-top:1px solid #eee;
		background-color: white;
		height:100%;
		padding:10rpx 20rpx;
        .healthy-title{
            text-align: center;
			font-size: 16px;
        }
        .healthy-content{
			text-indent: 2em;
			line-height: 2em;
        }
		.helthy-time{
			font-size: 12px;
			color: #b3b3b3;
			text-align: right;
		}

    }
	
	::v-deep .healthy-content img{
		width:100%;
		height:100%;
	}
</style>
