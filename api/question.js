import { http } from '../utils/request.js'

//获取问卷列表
export function getQuestionList(){
    return http({
        url:'/dev-api/mobile/questionnaire/list',
        method: 'get',
        
    })
}

//提交问卷
export function commitQuestion(data){
    return http({
        url:'/dev-api/mobile/questionnaire/add',
        method: 'post',
        data
    })
}

//查询推荐小常识
export function getHealthyList(data){
    return http({
        url:'/dev-api/mobile/healthtips/list',
        method: 'get',
		data
        
    })
}


//健康小常识详情
export function viewHealthyDetail(id){
    return http({
        url:`/dev-api/mobile/healthtips/${id}`,
        method: 'get',
    })
}

//通知公告
export function viewNotice(id){
    return http({
        url:`/dev-api/mobile/healthtips/notice/list`,
        method: 'get',
    })
}





