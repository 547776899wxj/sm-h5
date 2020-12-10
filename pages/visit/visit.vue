<template>
	<view class="content" @longpress="open" @click="open">
		<view class="header">
			<view class="header-title">今日出诊信息</view>
			<view class="header-eng"><text>TODAY`S VISIT INFORMATION</text></view>
		</view>
		<view class="table">
			<wTable
			    :columns="columns"
			    :data="tableData" 
			    @on-row-click="clickrow"
			    border
			    @on-select-all="selectAll"
			    @on-select="selectO"/>
		</view>
		<popupSet ref="popupSet" @confirm="confirm" @close="close" :dataInit="dataPopup" :showPlaySound="true" :showIType="true" :showScreenNumber="true"></popupSet>
	</view>
</template>

<script>
	import popupSet from '../../components/popup-set/popup-set.vue';
	import wTable  from '../../components/wang-wTable/wTable.vue';
	export default {
		components: { popupSet ,wTable},
		data() { 
			return {
				dataPopup:{
					title:'',
					iType:'',
					screenNumber:'',
					playSound:false,
				},
				tableData:[
                  {department:'消化内科',doctor:'欧阳天天',title:'副主任医师',specialty:'特长',time:'上午',cost:'30元专家费'} 
                ],
                columns:[
                    { title:'科室',key:'department',width:10},
                    { title:'医生',key:'doctor' ,width:20},
                    { title:'职称',key:'title',width:12},
                    { title:'特长',key:'specialty',width:36},
                    { title:'时间',key:'time',width:10},
                    { title:'费用',key:'cost',width:12},
                   
                ]
			};
		},
		methods:{
			// 打开设置
			open(){
				this.$refs.popupSet.open();
			},
			//确定设置
			confirm(res) {
				
			},
			// 关闭设置
			close(){
				
			},
			clickrow({ row,index }){
                console.log(row,index)
            },
            selectAll(val){
                console.log(val)
            },
            selectO({ allChecked,checked }){
                console.log(allChecked,checked)
            }
			
		}
	}
</script>

<style lang="scss">
view{
	box-sizing: border-box;
}
page{
	height: 100%;
}
.content{
	height: 100%;
	.header{
		background-color: rgb(18,138,238);
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 10%;
		.header-title{
			font-size: 140rpx;
			letter-spacing: 12rpx;
		}
		.header-eng{
			font-size: 46rpx;
			padding-top: 4px;
			letter-spacing: 8rpx;
		}
	}
	.table{
		height: 90%;
	}
}
</style>
