import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Sheet1 from '../../i18n/i18n.json'

Vue.use(VueI18n)

const {Sheet1:data} = Sheet1
const messages = {}
data.forEach(item => {
	for(let [key,val] of Object.entries(item)) {
		if(!messages[key]) messages[key] = {}
		messages[key][item.id] = val
	}
});



const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
})

export default i18n
