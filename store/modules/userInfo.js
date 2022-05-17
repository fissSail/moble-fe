 import {localStorage} from '../../utils/storage.js'
 import {getUserInfo} from '../../api/login.js'
 const userInfo = {
	state:{
		userId:localStorage.getItem('userId') ,
		
	},
	mutations:{
		setUserId:(state,id)=>{
			state.userId = id 
		},
		
	},
	actions:{
		SET_USERINFOID:({commit},id)=> {
			commit('setUserId',id)
		},
	},
}
export default userInfo