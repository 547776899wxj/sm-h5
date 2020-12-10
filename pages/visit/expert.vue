<template>
	<view class="content" @longpress="open" @click="open">
		<view class="header">
			<view class="header-title">专家出诊信息</view>
			<view class="header-eng"><text>EXPERT VISIT INFORMATION</text></view>
		</view>
		<view class="doctor">
			<view class="doctor-item">
				<view style="display: flex;">
					<image class="doctor-image" src="../../static/doctor/doctor.png" mode=""></image>
					<view class="item-content">
						<view>姓名：欧阳天天</view>
						<view style="margin-top: 20px;">职称：副主任医师</view>
						<view class="specialty">特长：轻轻的我走了， 正如我轻轻的来； 我轻轻的招手， 作别西天的云彩。 那河畔的金柳， 是夕阳中的新娘； 波光里的艳影， 在我的心头荡漾。 软泥上的青荇， 油油的在水底招摇； 在康河的柔波里， 我甘心做一条水草！</view>
					</view>
				</view>
				<view class="doctor-time">
					坐诊时间：周二全天 ,周四下午
				</view>
				<view class="bt-info">
					更多信息
				</view>
			</view>
		</view>
		<view class="tips">
			友情提示：请保持安静
		</view>
		<popupSet ref="popupSet" @confirm="confirm" @close="close" :dataInit="dataPopup" :showPlaySound="true" :showIType="true" :showScreenNumber="true"></popupSet>
	</view>
</template>

<script>
	import popupSet from '../../components/popup-set/popup-set.vue';
	export default {
		components: { popupSet },
		data() {
			return {
				dataPopup:{
					title:'',
					iType:'',
					screenNumber:'',
					playSound:false,
				},
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
	.doctor{
		height: 86%;
		overflow-y: auto;
		.doctor-item{
			font-size: 32px;
			padding-top: 50px;
			position: relative;
			height: 25%;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			.doctor-time{
				background-image: linear-gradient(0deg,#e5e3e3,#FFFFFF);
				padding: 4px 0 ;
				text-align: center;
				font-size: 30px;
				color: rgb(18,138,238);
			}
			.bt-info{
				position: absolute;
				background-color: rgb(43,170,243);
				color: #FFFFFF;
				font-size: 28px;
				border-radius: 20px;
				padding: 4px 35px;
				right: 55px;
			}
		}
		.item-content{
			width: 65%;
			.specialty{
				padding-top: 30px;
				font-size: 26px;
				height: 154px;
				line-height: 1.5;
				overflow: hidden;
			}
		}
		.doctor-image{
			width: 210px;
			height: 260px;
			padding: 0 30px;
		}
	}
	.tips{
		background-image: linear-gradient(0deg,#e6e6e6,#fefefe);
		padding: 0 20px;
		height: 4%;
		font-size: 32px;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}
}
</style>
