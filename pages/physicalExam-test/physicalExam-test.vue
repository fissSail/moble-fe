<template>
    <view class="test-wrapper">
        <u-form>
            <view class="healthy-wrapper">
                <view v-for="(item,index) in questionList" :key="index">
                    <!-- 题目 -->
                    <view><view v-if="item.requiredFlag == '0'" class="required">*</view>{{ index + 1 }} 、{{ item.questionTitle }}</view>
                    <!-- 可选项 0为单选 1为多选 -->
                    <view v-if="item.questionType == '0'">
                        <u-radio-group
                                v-model="item.questionOption"
                                placement="row">
                            <u-radio
                                    :customStyle="{margin: '10px'}"
                                    v-for="item in item.questionnaireAnswersVOList"
                                    :key="item.id"
                                    :label="item.questionnaireOption"
                                    :name="item.id">
                            </u-radio>
                        </u-radio-group>
                    </view>
                    <view v-else>
                        <u-checkbox-group
                                v-model="item.questionOption"
                                placement="column">
                            <u-checkbox
                                    :customStyle="{margin: '10px'}"
                                    v-for="item in item.questionnaireAnswersVOList"
                                    :key="item.id"
                                    :label="item.questionnaireOption"
                                    :name="item.id"
                            >
                            </u-checkbox>
                        </u-checkbox-group>
                    </view>
                </view>
            </view>
        </u-form>

        <view class="footer-btn">
            <u-button color="#7A9AD0" @click="handleCommit">提交问卷</u-button>
        </view>

        <!--   绑定微信用户标识     -->
        <binding-wx-popup v-if="bindingWxPopupVisible" ref="bindingWxPopup"></binding-wx-popup>

    </view>
</template>

<script>
import UForm from "../../uview-ui/components/u-form/u-form";
import UFormItem from "../../uview-ui/components/u-form-item/u-form-item";
import BindingWxPopup from "../../pages/bindingWx/binding-wx-popup";
import {getQuestionList, commitQuestion} from '../../api/question.js';

export default {
    name: "combo",
    components: {UFormItem, UForm, BindingWxPopup},

    data() {
        return {
            questionList: [],//问卷数据
            //绑定微信用户标识
            bindingWxPopupVisible: false
        }
    },

    onLoad: function () {
        this.loadList()
    },

    methods: {
        // 获取问卷列表
        loadList() {
            getQuestionList().then(res => {
                this.questionList = res.data.map(item => {
                    if (item.questionType == '1') {
                        item.questionOption = []
                    } else {
                        item.questionOption = ''

                    }
                    return item
                })
            })
        },
        //提交问卷
         handleCommit() {
             this.commitQuestion();
        },
        //提交问卷
        commitQuestion() {
            const params = {
                questionnaireBankBOList: [],
                userId: uni.getStorageSync('userInfo').userId,
                userName: uni.getStorageSync('userInfo').userName
            }

            let questionList = this.questionList;

            console.log("this.questionList", questionList)
            //如果questionOption有数据则说明是做了此题
            questionList.forEach(item => {
                if (item.requiredFlag == '0' && item.questionOption == '') {
                    uni.showToast({
                        title: "提交失败，请填写必选题",
                        icon: 'error'
                    })
                    throw new Error("提交失败，请填写必选题");
                }

                if (Array.isArray(item.questionOption) && item.questionOption.length == 0) {
                    return
                } else if (typeof (item.questionOption) == 'string' && item.questionOption == '') {
                    return
                } else {
                    const obj = {}
                    // 题目id
                    obj.questionnaireBankId = item.id
                    //选项[]
                    obj.questionnaireAnswersIdList = []
                    if (Array.isArray(item.questionOption) && item.questionOption.length !== 0) {
                        console.log("item.questionnaireAnswersVOList", item.questionOption)
                        item.questionOption.forEach(i => {
                            obj.questionnaireAnswersIdList.push(i)
                        })
                    } else {
                        obj.questionnaireAnswersIdList.push(item.questionOption)
                    }
                    params.questionnaireBankBOList.push(obj)
                }
            })
            console.log("处理好得数据", params.questionnaireBankBOList)

            if(params.questionnaireBankBOList == 0){
                uni.showToast({
                    title: "提交失败，请至少选择一题",
                    icon: 'error'
                })
                return
            }

            commitQuestion(params).then(res => {
                if (res.code == 200) {
                    uni.showToast({
                        title: '提交成功',
                        icon: 'success',
                        success: () => {
                            uni.redirectTo({
                                url: '/pages/home/home'
                            })
                        }
                    });
                } else {
                    uni.showToast({
                        title: "提交失败，请重新提交",
                        icon: 'error'
                    })
                }

            })
        }
    }
}
</script>

<style scoped lang="less">
.test-wrapper {
    background-color: white;
    border-top: 1px solid #eee;
}

.footer-btn {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 40px;

    view {
        color: white;
        width: 90%;
        margin: 0 auto;
        display: flex;
    }
}

.healthy-wrapper {
    border: 1px solid #eee;
    padding: 10px;
    margin-bottom: 40px;

}

.required{
    color: red;
    float: left;
}
</style>
