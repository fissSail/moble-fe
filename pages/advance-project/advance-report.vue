<template>
  <view class="report-wrapper">
	  <web-view :src="pdfUrl"></web-view>
  </view>
</template>

<script>
export default {
  name: "combo",
  data() {
    return {
	    pdfUrl:''
    };
  },
  onLoad: function (option) {
	  this.pdfUrl = `/static/hybrid/html/pdf.html?url=${decodeURIComponent(option.url)}`;
  },
};
</script>

<style scoped lang="less">
.report-wrapper {
  border-top: 1px solid #eee;
}
.iframe{
	position: absolute;
	right:0;
	bottom:0;
	top:0;
}
</style>