var myModule = (function (Vue, VueI18n) {
	'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
	var VueI18n__default = /*#__PURE__*/_interopDefaultLegacy(VueI18n);

	var Sheet1 = [
		{
			id: 2001,
			zh: "首页",
			en: "HOME"
		},
		{
			id: 2002,
			zh: "活动",
			en: "EVENTS"
		},
		{
			id: 2003,
			zh: "最新咨询",
			en: "NEWS"
		},
		{
			id: 2004,
			zh: "共创作品",
			en: "CO-CREATIONS"
		},
		{
			id: 2005,
			zh: "阵营介绍",
			en: "CAMPS"
		},
		{
			id: 2006,
			zh: "游戏介绍",
			en: "FEATURES"
		},
		{
			id: 2007,
			zh: "输入",
			en: "输入"
		}
	];
	var Sheet1$1 = {
		Sheet1: Sheet1
	};

	Vue__default["default"].use(VueI18n__default["default"]);

	const {Sheet1:data} = Sheet1$1;
	const messages = {};
	data.forEach(item => {
		for(let [key,val] of Object.entries(item)) {
			if(!messages[key]) messages[key] = {};
			messages[key][item.id] = val;
		}
	});



	const i18n = new VueI18n__default["default"]({
	  locale: 'zh', // set locale
	  messages, // set locale messages
	});

	const app = new Vue__default["default"]({
		el: '#app',
		i18n,
		data(){
			return {
				myInput: ''
			}
		},
	});

	return app;

})(Vue, VueI18n);
//# sourceMappingURL=bundle.js.map
