import { http } from '../utils/request.js'

/**
 * 
 */
// 获取套餐列表
export function getComboList(data){
    return http({
        url:'/dev-api/medicalPackage/list',
        method: 'get',
        data
    })
}

/**
 * @param {string} id：套餐id
 */
// 获取套餐详情
export function getComboDetail(id){
    return http({
        url:`/dev-api/medicalPackage/details/${id}`,
        method: 'get',
    })
}

/**
 * @param {string} tagid：标签id
 */
// 套餐推荐
export function getComboRecommend(tagId,pageNum,pageSize = 10){
    return http({
        url:`/dev-api/medicalPackage/recommendation`,
        method: 'get',
		data:{
			tagId,
			pageSize,
			pageNum,
		}
    })
}

/**
 */
// 体检类型
export function getAdvanceType(pageNum,pageSize = 5){
    return http({
        url:`/dev-api/medicalPackage/examineType`,
        method: 'get',
		data:{
			pageSize,
			pageNum,
		}
    })
}
