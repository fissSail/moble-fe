<template>
    <view>
        <u-modal title="微信绑定" :show="show" showCancelButton buttonReverse
                 @confirm="confirm" @cancel="cancel">
            <u--input placeholder="请输入手机号或证件号进行绑定" border="surround" v-model="phoneOrCertificateNo" clearable
                      maxlength="50">
            </u--input>
        </u-modal>

        <!--   跳转信息完善页面提示     -->
        <u-modal content="用户信息未完善，请先完善信息" :show="perfectShow" showCancelButton buttonReverse
                 @confirm="perfectConfirm" @cancel="perfectCancel">
        </u-modal>
    </view>
</template>
<script>
import {bindingWx, getUserInfoByPhoneOrCertificateNo} from "../../api/login";
import {localStorage} from "../../utils/storage";

export default {
    data() {
        return {
            show: false,
            perfectShow: false,
            phoneOrCertificateNo: '',
            userId: "",
            openId: uni.getStorageSync('userInfo').openId
        }
    },
    methods: {
        //弹出提示
        open(bindingWxPopupVisible) {
            //微信用户标识
            if (this.openId) {
                //弹出微信绑定提示框
                this.show = bindingWxPopupVisible;
            } else {
                //第一次手机登录，没有用户id和openid，直接跳转信息完善页面
                this.perfectShow = true;
            }
        },
        //跳转信息完善页面
        perfectConfirm() {
            //第一次手机登录，没有用户id和openid，直接跳转信息完善页面
            uni.redirectTo({url: '/pages/userInfo/userInfo'})
        },
        //取消跳转
        perfectCancel() {
            this.perfectShow = false;
        },
        //取消绑定
        cancel() {
            this.show = false;
            this.phoneOrCertificateNo = "";
        },
        //绑定
        confirm() {
            const phoneOrCertificateNo = this.phoneOrCertificateNo;
            //校验手机或证件号
            if (!this.phoneOrCertificateNoValid(phoneOrCertificateNo)) {
                return
            }
            //根据手机或证件号查询用户信息
            this.getUserInfoByPhoneOrCertificateNo(phoneOrCertificateNo);
        },
        //手机或证件号校验
        phoneOrCertificateNoValid(phoneOrCertificateNo) {
            if (phoneOrCertificateNo == "") {
                uni.showToast({
                    title: '手机或证件号不能为空',
                    icon: 'error'
                })
                return false;
            }

            if (phoneOrCertificateNo.length < 12 && !(/^1[3456789]\d{9}$/).test(phoneOrCertificateNo)) {
                uni.showToast({
                    title: '手机格式错误',
                    icon: 'error'
                })
                return false;
            }

            if (phoneOrCertificateNo.length >= 12 && !(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(phoneOrCertificateNo)) {
                uni.showToast({
                    title: '证件号格式错误',
                    icon: 'error'
                })
                return false;
            }

            return true;
        },
        //根据手机或证件号查询用户信息
        getUserInfoByPhoneOrCertificateNo(value) {
            getUserInfoByPhoneOrCertificateNo(value).then(res => {
                if (res.code == 200) {
                    const {data} = res;
                    this.userId = data.id;
                    this.userName = data.name;

                    this.$nextTick(() => {
                        //判断根据手机或证件号是否查询用户信息，如果没有则提示完善信息，有则绑定
                        if (!this.userId) {
                            this.cancel();
                            this.perfectShow = true;
                            return;
                        }
                        this.bindingWx();
                    })

                } else {
                    uni.showToast({
                        title: "查询失败，请重新输入",
                        icon: 'error'
                    })
                }
            })

        },
        //绑定微信用户标识，并将用户id存入缓存
        bindingWx() {
            let params = {
                openId: this.openId,
                personRecordId: this.userId
            };
            bindingWx(params).then(res => {
                if (res.code == 200) {
                    uni.showToast({
                        title: '绑定成功',
                        icon: 'success',
                        success: () => {
                            this.cancel();
                            //绑定之后更新缓存
                            uni.setStorageSync('userInfo', res.data)
                        }
                    });
                } else {
                    uni.showToast({
                        title: "查询失败，请重新输入",
                        icon: 'error'
                    })
                }
            })
        }
    }
}
</script>
