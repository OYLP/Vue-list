import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
 Vue.use(Vuex)
const store = new Vuex.Store({
	//state中存储的就是全局共享的数据
	state: {
		//所有任务列表
		list: [],
		inputValue:'aaa',  //文本框的内容
		nextId:5,  //下一个id
		viewKey: 'all'
		
	},
	mutations: {
		initList(state, list) {
			state.list = list
		},
		setChangeInput(state, val) {
			state.inputValue = val
		},
		addItem(state){
			const obj = {
				id: state.nextId,
				info: state.inputValue.trim(),
				done: false
			}
			state.list.push(obj)
			state.nextId++
			state.inputValue = ''
		},
		//根据id删除对应的任务事项
		removeItem(state,id){
			//	根据id查找对应任务的索引值
			const i = state.list.findIndex(x => x.id === id)
			// 根据索引值，删除对应的列表项
			if(i !==-1){
				state.list.splice(i,1)
			}
		},
		//修改列表项的转选中状态
		changeSatus(state,params){
			const i = state.list.findIndex(x => x.id === params.id)
			if(i !== -1){
				state.list[i].done = params.status
			}
		},
		//清除已完成的任务
		cleanDone(state){
			//filter()将未完成的任务过滤出来，返回给list
		 state.list = state.list.filter(x => x.done === false)
		},
		//修改viewKey的状态
		changeViewKey(state,key){
			state.viewKey = key
		}
	},
	actions: {
		//获取列表数据
		getList (context) {
			axios.get('/list.json').then(({data}) => {
				// console.log(data)
				context.commit('initList',data);
			})
		}
	},
	getters: {
		//统计未完成的任务条数
		unDoneLength(state){
			return state.list.filter(x => x.done === false).length
		},
		//切换任务列表
		infoList(state){
			if(state.viewKey === 'all'){
				return state.list
			}
			if(state.viewKey === 'undone'){
				return state.list.filter(x => !x.done)
			}
			if(state.viewKey === 'done'){
				return state.list.filter(x => x.done)
			}
			return state.list
		}
	}
})

export default store;