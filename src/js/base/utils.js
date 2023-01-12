/**
 * 判断移动端系统类型
 *
 * @return {number} {0: IOS, 1: Android, 2: other}
 */
 export function getOsType() {
	const u = navigator.userAgent;
	const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if (isIOS) return 0;
	if (isAndroid) return 1;
	return 2;
}

/**
* 判断移动/PC端
* @returns {string} Mobile || Desktop
*/
export function getDeviceType() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
	)
			? 'Mobile'
			: 'Desktop';
}

/**
* 函数防抖
* @param {function} func
* @param {number} wait 延迟执行的毫秒数，默认500
* @param {boolean} immediate 是否立即执行，默认false
* @returns {function}
*/
export function debounce(func, wait = 500, immediate = false) {
	let timeout;
	return function debounceFunc(...args) {
			if (timeout) clearTimeout(timeout);
			if (immediate) {
					const callNow = !timeout;
					timeout = setTimeout(() => {
							timeout = null;
					}, wait);
					if (callNow) func.apply(this, args);
			} else {
					timeout = setTimeout(() => {
							func.apply(this, args);
					}, wait);
			}
	};
}

/**
* 函数节流
* @param {function} func
* @param {number} wait 延迟执行的毫秒数，默认500
* @returns {function}
*/
export function throttling(func, wait = 500) {
	let timeout;
	return function throttlingFunc(...args) {
			if (!timeout) {
					timeout = setTimeout(() => {
							timeout = null;
							func.apply(this, args);
					}, wait);
			}
	};
}

/**
* 获取数据类型
* @param {any} target
* @returns {string} 数据类型
*/
export function getType(target) {
	const ret = typeof target;
	const template = {
			'[object Array]': 'array',
			'[object Object]': 'object',
			'[object Number]': 'number',
			'[object Boolean]': 'boolean',
			'[object String]': 'string',
	};
	if (target === null) {
			return 'null';
	}
	if (ret === 'object') {
			return template[Object.prototype.toString.call(target)];
	}
	return ret;
}

/**
*
* @returns {object} 包含所有url参数的对象字面量
*/
export function getURLParametes() {
	let search;
	const { href } = window.location;
	if (href.includes('?')) [, search] = href.split('?');
	if (href.includes('#')) [, search] = href.split('#');
	const urlParam = decodeURIComponent(search);
	const paramArr = urlParam.match(/([^?=&]+)(=([^&]*))/g) || [];
	const res = paramArr.reduce((pre, cur) => {
			pre[cur.slice(0, cur.indexOf('='))] = cur.slice(cur.indexOf('=') + 1);
			return pre;
	}, {});
	return res;
}

/**
* 判空验证
* @param {string} 校验内容
* @returns {boolean} 内容为空返回ture，否则返回false
*/
export function isEmpty(str) {
	if (str === null || str === undefined) return true;
	if (str.trim().length === 0) return true;
	return false;
}

/**
* 校验邮箱
* @param {string} 校验邮箱
* @returns {boolean} 符合邮箱格式返回true，否则返回false
*/
export function isEmail(str) {
	const reg = /^(.)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	return reg.test(str);
}
