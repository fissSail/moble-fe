
export  let localStorage ={
	setItem:(key,value)=>{
		uni.setStorageSync(key,value)
	},
	getItem:(key)=>{
		 return uni.getStorageSync(key)
	},
	removeItem:(key)=>{
		uni.removeStorageSync(key)
	}
}