// 过滤所有特殊字符
export function stripscript (str) {
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？↵\r\n]");
			var rs = "";
	for (var i = 0; i < str.length; i++) {
			rs = rs + str.substr(i, 1).replace(pattern, '');
	}
	return rs;
};

//验证邮箱地址
export function validateEmail(value){
	var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	if(!reg.test(value)){
		return true
	}else{
		return false
	}
};
//密码规则：至少6-20个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符：
export function validatePassword(value){
	var reg= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/;
	return !reg.test(value) ? true : false
};

export function validateCode(value){
	var reg = /^[a-z0-9]{6}/ ;
	return !reg.test(value) ? true : false
};