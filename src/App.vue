<template>
  <div id="apps">
		<div class="my_input">
			<a-input :value="inputValue" @change="handleInputChange" placeholder="请输入事项" class="my_ipt" />
			<a-button type="primary" class="my_btn" @click="addItemToList">添加事项</a-button>
		</div>
		<a-list bordered :data-source="infoList" class="dt_list">
		      <a-list-item slot="renderItem" slot-scope="item, index">
						<!-- 复选框 -->
						<a-checkbox :checked="item.done" @change="(e) => {cbStatusChange(e,item.id)}"></a-checkbox>
		        {{ item.info }}
						<!-- 删除连接 -->
						<a slot="actions" @click="removeItemById(item.id)">删除</a>
		      </a-list-item>
					<div slot="footer" class="footer">
						<!-- 未完成的任务个数 -->
						<span>{{unDoneLength}}条剩余</span>
						<!-- 操作按钮 -->
						<a-button-group>
							<a-button :type="viewKey === 'all' ? 'primary' : 'default'" @click="changeKey('all')">全部</a-button>
							<a-button :type="viewKey === 'undone' ? 'primary' : 'default'" @click="changeKey('undone')">未完成</a-button>
							<a-button :type="viewKey === 'done' ? 'primary' : 'default'" @click="changeKey('done')">已完成</a-button>
						</a-button-group>
						<!-- 把已经完成的任务清除 -->
						<a @click="clean">清除已完成</a>
					</div>
					
		    </a-list>
  </div>
</template>
<script>
	import { mapState , mapGetters } from 'vuex'
	export default{
		data () {
			return {
				
			}
		},
		created() {
			this.$store.dispatch('getList')
		},
		computed:{
			...mapState(['inputValue','viewKey']),
			...mapGetters(['unDoneLength','infoList']),
		},
		methods:{
			//监听文本框的内容变化
			handleInputChange(e){
				// console.log(e.target.value)
				this.$store.commit("setChangeInput",e.target.value)
			},
			//向吧【列表中新增事项
			addItemToList(){
				if(this.inputValue.trim().length <= 0){
					return this.$message.warning("文本框内容不能为空")
				}
				this.$store.commit("addItem")
			},
			//根据id删除选中的事项
			removeItemById(id){
				// console.log(id)
				this.$store.commit("removeItem",id)
			},
			//监听选中状态的事项
			cbStatusChange(e,id){
				//通过e.target.checked获取到最新的选中状态
				// console.log(e.target.checked)
				// console.log(id)
				const params = {
					id: id,
					status: e.target.checked
				}
				this.$store.commit("changeSatus",params)
			},
			//清除已完成任务
			clean(){
				this.$store.commit("cleanDone")
			},
			// 切换key的状态
			changeKey(key){
				// console.log(key)
				this.$store.commit("changeViewKey",key)
			}
		}
	}
</script>
<style lang="scss">
#apps {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
	width: 640px;
	margin:30px 0 0 30px;
	.my_input{
		width: 100%;height: 50px;
	}
	.my_ipt{
		float: left;
		width: 540px;
	}
	.ant-checkbox-wrapper{margin-right: 10px;}
	.my_btn{float: right;}
	.dt_list{
		width: 540px;
	}
	.footer{
		.ant-btn-group{
			margin: 0 30px;
		}
	}
	
}

</style>
