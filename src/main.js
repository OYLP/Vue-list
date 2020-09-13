import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App';
import store from './store/index.js'
import 'ant-design-vue/dist/antd.css';
//使用插件
 Vue.use(Antd)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
	//将创建的共享数据对象，挂载到 Vue 实例中
	//所有组件，就可以直接从store中获取全局的数据了
	store
}).$mount('#app')
