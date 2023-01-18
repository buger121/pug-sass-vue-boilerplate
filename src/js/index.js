import Vue from 'vue'
import i18n from './base/lang'



const app = new Vue({
	el: '#app',
	i18n,
	data(){
		return {
			myInput: ''
		}
	},
})

export default app