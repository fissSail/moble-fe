
<script>
	export default {
		onLaunch: function(option) {
			this.globalData.page = option.path;
			console.log("----",this.globalData)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			page:''
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'uview-ui/index.scss';
	::v-deep uni-app, uni-page-head{
		
		background-color: #f5f5f5;
		//#EAEFFE;
		// border-top:1px solid #eee;
		font-size: 13px;
		// padding:0px 15rpx;
		
	}
	
	// ::v-deep .u-list{
	// 	height:100% !important;
	// }
</style>
