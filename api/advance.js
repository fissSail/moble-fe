import { http } from '../utils/request.js'

/**
 * 
 */
// 用户预约体检
export function addReserveExamine(data){
    return http({
        url:'/dev-api/reserveExamine/add',
        method: 'post',
        data
    })
}


/**
 * 
 */
// 获取用户体检项目列表
export function viewReserveExamineList(userId,type,pageNum,pageSize){
    return http({
        url:'/dev-api/reserveExamine/list',
        method: 'get',
        data:{
			userId,
			type,
			pageNum,
			pageSize,
		}
    })
}


/**
 * 
 */
// 获取用户体检项目详情
export function viewReserveExamine(examineRecordId,pageNum,pageSize){
    return http({
        url:'/dev-api/reserveExamine/packageDetails',
        method: 'get',
        data:{
		examineRecordId,
		pageNum,
		pageSize
		}
    })
}

/**
 * 
 */
// 取消预约
export function deleteReserveExamine(examineRecordId){
    return http({
        url:`/dev-api/reserveExamine/cancelAppointment?examineRecordId=${examineRecordId}`,
        method: 'delete',
        
    })
}

/**
case "1":  // 职业健康个人上岗前报告
case "3":   // 职业健康个人离岗时报告
case "4":   // 职业健康个人离岗后报告
case "5":   // 职业健康个人应急健康检查报告
case "6":   // 健康体检报告
case "7":   // 老年体检报告
case "8":   // 从业体检报告
case "9":   // 团体报告
case "2":   // 职业健康个人在岗报告
 */
// 体检报告
export function previewReport(reportType,examineRecordId){
    return http({
        url:`/dev-api/print/previewReport/${reportType}`,
        method: 'post',
		header: { 'Content-Type': 'application/json' },
		responseType: 'blob',
        data:{
			examineRecordId
		}
    })
}


/**
 * 获取字典类型数据
 * @param {Object} data
 */
export function getDictType(dictType){
    return http({
        url:`/dev-api/userInfo/dictionary`,
        method: 'get',
		data:{
			dictType
		}
        
    })
}


/**
 * 
 */
// 已完检列表
export function examineFinishList(data){
    return http({
        url:`/dev-api/reserveExamine/examineFinishList`,
        method: 'get',
		data
        
    })
}


