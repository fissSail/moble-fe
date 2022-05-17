/**
 * @Description: 获取url中的参数
 * @param {*} name
 * @return {*}
 * @author: yzz
 */
export function getUrlCode(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.href
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}






// 根据身份证识别用户的性别、出生日期
export function getIdInfo(cardNo) {
    var reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/; //验证身份证号码的正则
    if(reg.test(cardNo)){ // 身份证号码是否合法
        var birthday = "";
        var gender = "";
        if (cardNo.length == 15) {
            var org_birthday = cardNo.substring(6, 12);
            var org_gender = cardNo.substring(14, 15);
            birthday = "19" + org_birthday.substring(0, 2) + "-"
                + org_birthday.substring(2, 4) + "-"
                + org_birthday.substring(4, 6);
            gender = org_gender % 2 == 1 ? "male" : "female";
        } else if (cardNo.length == 18) {
            var org_birthday = cardNo.substring(6, 14);
            var org_gender = cardNo.substring(16, 17);
            birthday = org_birthday.substring(0, 4) + "-"
                + org_birthday.substring(4, 6) + "-"
                + org_birthday.substring(6, 8);
            gender = org_gender % 2 == 1 ? "male" : "female";
        }
			console.log("birthday",birthday,gender)
		return {
			birthday,
			gender
		}
	
    }else{
        return false;
    }
}

//深克隆
export function clone(target) {
let result;

if (Array.isArray(target)) {

result = [];

target.forEach((item) => {

result.push(clone(item));

});

} else if (typeof target === "object" && target !== null) {

result = {};

for (const key in target) {

if (Object.hasOwnProperty.call(target, key)) {

result[key] = clone(target[key]);

}

}

} else {

result = target;

}

return result;

}


/**
 * 关键信息隐藏
 * @param str 字符串
 * @param frontLen 字符串前面保留位数
 * @param endLen 字符串后面保留位数
 * @returns {string}
 */
export function hideCode(str, frontLen, endLen) {
    var len = str.length - frontLen - endLen;
    var xing = '';
    for (var i = 0; i < len; i++) {
        xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
};