import { login } from "../../api/login.js";
import { localStorage } from "../../utils/storage.js";
const user = {
  state: {
    token: "",
    userId: "",
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      //刷新造成store数据丢失
      state.token = token;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
  },

  actions: {
    // 登录
    Login({ dispatch, commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // 登录
        login(userInfo.mobilePhone, userInfo.code)
          .then((res) => {
            const { data } = res;
			 uni.setStorageSync('userInfo',data)
            // 保存token
			// localStorage.setItem("token", data.token);
            commit("SET_TOKEN", data.token);
			uni.setStorageSync('openId',data.openId)
			// localStorage.setItem("userName", data.userName)
			// localStorage.setItem("isPerfectInfo", data.isPerfectInfo);
			// localStorage.setItem("phone", data.phone);
			
   //          // 保存userId
            localStorage.setItem("userId", data.userId);
            commit("SET_USERID", data.userId);
			dispatch('SET_USERINFOID',data.userId)
			dispatch('SET_USERINFO',data.userId)
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 微信登录
    wxLogin({ commit }, data) {
     // localStorage.setItem("token", data.token);
      commit("SET_TOKEN", data.token);
	  uni.setStorageSync("userInfo",data)
	  // localStorage.setItem("userName", data.userName);
   //    localStorage.setItem("userId", data.userId);
	  // localStorage.setItem("openId", data.openId);
	  // localStorage.setItem("isPerfectInfo", data.isPerfectInfo);
	 
      commit("SET_USERID", data.userId);
      // 跳转到首页
      uni.reLaunch({
        url: "/pages/home/home",
      });
    },
    // 清除缓存
    resetCache({ commit }) {
      uni.clearStorageSync();
      commit("SET_TOKEN", "");
      commit("SET_USERID", "");
    },

    // // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo().then(res => {
    //       const { roles, user, permissions } = res.data
    //       const avatar = user.avatar == null ? require("@/assets/images/profile.jpg") : user.avatar;
    //       if (roles && roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', roles)
    //         commit('SET_PERMISSIONS', permissions) //按钮权限
    //       } else {
    //         commit('SET_ROLES', ['ROLE_DEFAULT'])
    //       }
    //       commit('SET_NAME', user.userName)
    //       commit('SET_AVATAR', avatar)
    //       commit('SET_USERID',user.userId)
    //       resolve(res)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // // 刷新token
    // RefreshToken({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     refreshToken(state.token).then(res => {
    //       setExpiresIn(res.data)
    //       commit('SET_EXPIRES_IN', res.data)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // // 退出系统
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       commit('SET_PERMISSIONS', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },



    // // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // }
  },
};

export default user;
