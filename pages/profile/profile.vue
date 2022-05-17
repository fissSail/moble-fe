<template>
    <view class="profile-wrapper">
        <view class="profile-bg">
            <view class="profile-header">
                <u-image   src="https://cdn.uviewui.com/uview/album/1.jpg" height="70px" width="70px" shape="circle"></u-image>
                <text>{{userName}}</text>
            </view>
        </view>
        <view class="profile-project">
            <view class="profile-item" @click="handleToAdvance">
                <view>
                    <svg t="1647508335401" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="936" width="20" height="20"><path d="M355.52 121.6a38.4 38.4 0 0 1 38.4 38.4v39.808h236.16V160a38.4 38.4 0 0 1 76.8 0v39.808h78.912A116.608 116.608 0 0 1 902.4 316.416v469.376a116.608 116.608 0 0 1-116.608 116.608H238.208A116.608 116.608 0 0 1 121.6 785.792V316.416a116.608 116.608 0 0 1 116.608-116.608h78.912V160a38.4 38.4 0 0 1 38.4-38.4z m-38.4 155.008H238.208a39.808 39.808 0 0 0-39.808 39.808v469.376a39.808 39.808 0 0 0 39.808 39.808h547.584a39.872 39.872 0 0 0 39.808-39.808V316.416a39.872 39.872 0 0 0-39.808-39.808h-78.976v39.808a38.4 38.4 0 1 1-76.8 0v-39.808H393.92v39.808a38.4 38.4 0 0 1-76.8 0v-39.808z m-39.04 196.288a38.4 38.4 0 0 1 38.4-38.4h391.04a38.4 38.4 0 0 1 0 76.8h-391.04a38.4 38.4 0 0 1-38.4-38.4z" p-id="937"></path></svg>
                    <text style="margin-left:5px;">预约项目</text>
                </view>
                <view>
                    <u-icon name="arrow-right"></u-icon>
                </view>
            </view>
            <view class="profile-item" @click="handleToReport">
                <view>
                    <svg t="1647508428887" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1077" width="20" height="20"><path d="M554.688 296.256a76.8 76.8 0 0 1-56.192-24.448L435.968 204.8H213.312a3.648 3.648 0 0 0-1.472 0.384 8.512 8.512 0 0 0-2.688 1.984 18.176 18.176 0 0 0-4.352 12.288v457.088c0 5.568 2.112 9.856 4.352 12.288a8.512 8.512 0 0 0 2.688 1.984c0.64 0.32 1.152 0.384 1.472 0.384h597.376a3.648 3.648 0 0 0 1.472-0.384 8.448 8.448 0 0 0 2.688-1.984 18.176 18.176 0 0 0 4.352-12.288V310.848a18.176 18.176 0 0 0-4.352-12.224 8.384 8.384 0 0 0-2.688-2.048 3.648 3.648 0 0 0-1.472-0.32h-256zM128 676.48V219.52c0-24.32 8.96-47.552 24.96-64.64 16-17.152 37.76-26.816 60.352-26.816H441.6a64 64 0 0 1 46.72 20.352l66.432 71.04h256c22.592 0 44.288 9.664 60.352 26.816 16 17.152 24.96 40.384 24.96 64.64v365.696c0 24.32-8.96 47.552-24.96 64.64a82.56 82.56 0 0 1-60.352 26.816H213.312a82.56 82.56 0 0 1-60.288-26.752A94.848 94.848 0 0 1 128 676.608z" p-id="1078"></path></svg>
                    <text style="margin-left:5px;">体检报告</text>
                </view>
                <view>
                    <u-icon name="arrow-right"></u-icon>
                </view>
            </view>
            <view class="profile-item" @click="handlToUserInfo">
                <view>
                    <svg t="1647508688991" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="906" width="20" height="20"><path d="M512 518.4c140.8 0 262.4-115.2 262.4-262.4 0-140.8-121.6-256-262.4-256S249.6 115.2 249.6 262.4c0 140.8 121.6 256 262.4 256zM512 64c108.8 0 198.4 89.6 198.4 198.4 0 108.8-89.6 198.4-198.4 198.4-108.8 0-198.4-89.6-198.4-198.4C313.6 153.6 403.2 64 512 64zM928 832l-76.8-128c-25.6-38.4-64-64-108.8-64H275.2c-44.8 0-83.2 25.6-108.8 64l-76.8 128c-25.6 38.4-25.6 83.2 0 128s64 64 108.8 64h620.8c44.8 0 83.2-25.6 108.8-64s25.6-83.2 0-128z m-51.2 96c-12.8 19.2-32 32-51.2 32H204.8c-19.2 0-44.8-12.8-51.2-32-12.8-19.2-12.8-44.8 0-64l76.8-128c12.8-19.2 32-32 51.2-32h467.2c19.2 0 38.4 12.8 51.2 32l76.8 128c6.4 25.6 6.4 44.8 0 64z" p-id="907"></path></svg>
                    <text style="margin-left:5px;">个人信息</text>
                </view>
                <view>
                    <u-icon name="arrow-right"></u-icon>
                </view>
            </view>
            <view class="profile-item" @click="handleToTest">
                <view>
                    <svg t="1647508450760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1218" width="20" height="20"><path d="M211.2 211.2a123.712 123.712 0 0 1 87.488-36.288H384a38.4 38.4 0 0 1 0 76.8H298.688a46.912 46.912 0 0 0-46.976 46.976v512a46.912 46.912 0 0 0 46.976 46.912h426.624a46.912 46.912 0 0 0 46.976-46.912v-512a46.912 46.912 0 0 0-46.976-46.976H640a38.4 38.4 0 1 1 0-76.8h85.312a123.712 123.712 0 0 1 123.776 123.776v512a123.776 123.776 0 0 1-123.776 123.712H298.688a123.712 123.712 0 0 1-123.776-123.712v-512c0-32.832 13.056-64.32 36.288-87.488z" p-id="1219"></path><path d="M469.312 166.4a46.912 46.912 0 0 0 0 93.888h85.376a46.912 46.912 0 0 0 0-93.888H469.312zM345.6 213.312c0-68.352 55.36-123.712 123.712-123.712h85.376a123.712 123.712 0 0 1 0 247.488H469.312A123.712 123.712 0 0 1 345.6 213.312zM667.136 484.864a38.4 38.4 0 0 1 0 54.272l-170.624 170.688a38.4 38.4 0 0 1-54.336 0L356.864 624.512a38.4 38.4 0 1 1 54.272-54.336l58.24 58.176 143.488-143.488a38.4 38.4 0 0 1 54.272 0z" p-id="1220"></path></svg>
                    <text style="margin-left:5px;">体检问卷</text>
                </view>
                <view>
                    <u-icon name="arrow-right"></u-icon>
                </view>
            </view>
        </view>
        <view class="support">
            <text>技术支持：江西微盛信息产业有限公司</text>
        </view>

        <u-tabbar
                :value="active"
                :fixed="true"
                :placeholder="false"
                :safeAreaInsetBottom="false">
            <u-tabbar-item text="首页" icon="home" @click="handleToHome" ></u-tabbar-item>
            <u-tabbar-item text="套餐" icon="bag" @click="handleToCombo" ></u-tabbar-item>
            <u-tabbar-item text="我的" icon="account"></u-tabbar-item>
        </u-tabbar>

        <!--   绑定微信用户标识     -->
        <binding-wx-popup v-if="bindingWxPopupVisible" ref="bindingWxPopup"></binding-wx-popup>
    </view>
</template>

<script>
import BindingWxPopup from "../../pages/bindingWx/binding-wx-popup";

export default {
    components: {BindingWxPopup},
    data(){
        return{
			userName:'',
            active:2,
            //绑定微信用户标识
            bindingWxPopupVisible: false
        }
    },
	onLoad:function(){
		this.userName = Boolean(uni.getStorageSync('userInfo').userName)?uni.getStorageSync('userInfo').userName:uni.getStorageSync('userInfo').phone
	},
    methods:{
		//跳转到首页
        handleToHome(){
            uni.navigateTo({
                url:'/pages/home/home'
            })
        },
		//跳转到套餐界面
        handleToCombo(){
            uni.navigateTo({
                url:'/pages/combo/combo'
            })
        },
		//跳转到预约项目
        async handleToAdvance(){
            if (!await this.perfectInfoOrBindingWx()) {
                return
            }
			
			uni.navigateTo({
			    url:'/pages/advance-project/advance-item'
			})

            
        },
		//跳转到个人信息
        handlToUserInfo(){
            uni.navigateTo({
                url:'/pages/userInfo/userInfo'
            })
        },
		//跳转到体检报告
        async handleToReport(){
            if (!await this.perfectInfoOrBindingWx()) {
                return
            }

            uni.navigateTo({
                url:'/pages/advance-project/advance-finish'
            })
        },
		//跳转到体检问卷
        async handleToTest(){
            if (!await this.perfectInfoOrBindingWx()) {
                return
            }

            uni.navigateTo({
		        url:'/pages/physicalExam-test/physicalExam-test'
		    })
		},
       //是否用户信息完善
        perfectInfoOrBindingWx() {
            const isPerfectInfo = uni.getStorageSync('userInfo').isPerfectInfo;
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
            }else{
				return true
			}
        }


    }
}
</script>

<style lang="scss">
.profile-wrapper{
    width:100%;
    .profile-bg{
        background-color: #7A9AD0;
        border-radius: 10rpx;
         height:300rpx;
        .profile-header{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top:20px;
        }
    }
    .profile-project{
        background-color: white;
        border:1px solid #F7F7F7;
        width:85%;
        height:60%;
        margin:0 auto;
		padding:0 10rpx;
        transform: translateY(-2%);
        .profile-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom:1px solid #f2f2f2;
            height:100rpx;
            view{
                display: flex;
            }
        }
    }
    .support{
        font-size: 22rpx;
        text-align: center;
        color:#101010;
		margin-top:20px;
    }
}
</style>