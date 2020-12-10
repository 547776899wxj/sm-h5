<template>
	<view class="content"  @longpress="open" @click="open">
		<image class="bg" src="../../static/triage_five.png" ></image>
		<view class="type">
			<view class="type-text">检查室</view>
			<view class="type-text">当前检查</view>
			<view class="type-text">候诊</view>
			<view class="type-text">过号</view>
		</view>
		<view class="info">
			<view class="info-patient" v-for="(item,index) in data" :key="index">
				<view class="room">
					<view>{{item.room}}</view>
				</view>
				<view class="number room">
					<view v-if="item.seeingNumber">
						<text class="pr-15">{{item.seeingNumber}}号</text>
						<text class="pl-15">{{item.seeingName}}</text>
					</view>
				</view>
				<view class="room">
					<view v-if="item.waitingNumber">
						<text class="pr-15">{{item.waitingNumber}}号</text>
						<text class="pl-15">{{item.waitingName}}</text>
					</view>
				</view>
				<view class="room">
					<view v-if="item.pastName">
						<text class="pl-15">{{item.pastName}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			温馨提示：请持票等待呼叫！
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
				title:'超声科',
				data:[
					{
						room:'检查室203',
						number:'GX124',
						department:'数字胃肠镜',
						seeingName:'吴先杰',
						seeingNumber:'3211',
						waitingName:'吴先杰',
						waitingNumber:'321',
						pastName:'过号',
					},
					{
						room:'摄片室—205',
						number:'GX124',
						department:'反射科',
						seeingName:'林光耀',
						seeingNumber:'321',
						waitingName:'林光耀',
						waitingNumber:'321',
						pastName:'过号',
					},{
						room:'摄片室—205',
						number:'GX124',
						department:'反射科',
						seeingName:'王泽华',
						seeingNumber:'321',
						waitingName:'王泽华',
						waitingNumber:'321',
						pastName:'过号',
					},{
						room:'检查室203',
						number:'GX124',
						department:'数字胃肠镜',
						seeingName:'雷泽宇',
						seeingNumber:'3211',
						waitingName:'雷泽宇',
						waitingNumber:'321',
						pastName:'过号',
					},
					
				
				],
				calledNumbera:'WXJ1',
				iType:'',
				popupShow:false,
				seqNumber:'',
				voiceData:[],
				testNubmer:0,
				voiceDataInit:[],
				dataPopup:{
					title:'',
					iType:'',
					screenNumber:'',
					playSound:false,
				},
				voicePlayNumber:0,
			}
		},
		onLoad() {
			this.iType = uni.getStorageSync('iType')||'';
			this.screenNumber = uni.getStorageSync('screenNumber') || '';
			this.playSound = uni.getStorageSync('playSound') || false;
			if(this.iType){
				this.init();
				this.dataPopup.iType = this.iType;
				this.dataPopup.screenNumber = this.screenNumber;
				this.dataPopup.playSound = this.playSound;
			}
		},
		methods: {
			// 打开设置
			open(){
				this.$refs.popupSet.open();
				this.popupShow = true;
			},
			// 关闭设置
			close(){
				this.popupShow = false;
				if(this.iType){
					this.init();
				}
			},
			//确定设置
			confirm(res) {
				this.iType = res.iType;
				this.screenNumber = res.screenNumber;
				this.playSound = res.playSound;
				this.popupShow = false;
				this.init();
			},
			// 初始化数据
			init(){
				if(this.popupShow){
					return false;
				}
				// 测试使用
				// let res = {data:{"Data":[
				// {"ghhbid":null,"dept_code":null,"dept_name":"皮肤科","clinique_name":"皮肤1","clinique_code":"946","tech_title":null,"doctor":"王斗训","doctor_pic":null,"calling":null,"calling_seq":null,"calling_pre_time":null,"waiting":"郑杰","waiting_seq":"1","waiting_pre_time":null,"am_pm":"下午","status":"坐诊","dqjzbr":null,"dqjzxh":null},{"ghhbid":null,"dept_code":null,"dept_name":"皮肤科","clinique_name":"皮肤2","clinique_code":"947","tech_title":null,"doctor":"谢涵津","doctor_pic":null,"calling":"吴先杰","calling_seq":"53","calling_pre_time":null,"waiting":null,"waiting_seq":null,"waiting_pre_time":null,"am_pm":"下午","status":"坐诊","dqjzbr":null,"dqjzxh":null},{"ghhbid":null,"dept_code":null,"dept_name":"皮肤科","clinique_name":"皮肤3","clinique_code":"948","tech_title":null,"doctor":"林宝珍","doctor_pic":null,"calling":null,"calling_seq":null,"calling_pre_time":null,"waiting":"林榛苹","waiting_seq":"1","waiting_pre_time":null,"am_pm":"下午","status":"坐诊","dqjzbr":null,"dqjzxh":null}
				// ],"ServiceTime":"2020-09-08 16:41:01"}}			
				// res.data.Data[1].calling_seq =  res.data.Data[1].calling_seq +this.testNubmer++
				
				// uni.request({
				//     url: 'http://129.1.20.21:8019/Queue/mmy_Get_Queue', 
				// 	data:{
				// 		dept_code :this.iType ,
				// 		clinique_code :this.screenNumber ,
				// 	},
				// 	timeout:3000,
				//     success: (res) => {
				// 		let datas = res.data.Data;
				// 		let dataMaps = [];
				// 		let voiceDataInit = [];
				// 		datas.forEach((data,index) =>{
				// 			let waitName =data.waiting?this.$util.hideName(data.waiting):'';
				// 			let seeingName =data.calling?this.$util.hideName(data.calling):'';
				// 			let dataMap = {
				// 				room:data.clinique_name,
				// 				doctor:data.doctor,
				// 				code:data.dept_code,
				// 				wait:{
				// 					number:data.waiting_seq,
				// 					name:waitName,
				// 				},
				// 				seeing:{
				// 					number:data.calling_seq,
				// 					name:seeingName,
				// 				},
				// 			}
				// 			dataMaps = dataMaps.concat(dataMap);
						
				// 			if(seeingName && this.playSound){
				// 				let number = this.$util.chineseNumeral(dataMap.seeing.number+'');
				// 				let speakText = `请,${number}号,${data.calling}到,${dataMap.room}就诊`;
				// 				if(this.data.length==0){
				// 					this.voiceData.push(speakText);
				// 					this.voiceDataInit.push(speakText);
				// 				}else{
				// 					voiceDataInit = voiceDataInit.concat(speakText);
				// 				}
				// 			}
				// 		})
				// 		this.data = dataMaps;
				// 		if(this.playSound){
				// 			if(voiceDataInit.length>0){
				// 				this.voiceData = this.$util.findDifferentElements(voiceDataInit,this.voiceDataInit);
				// 				this.voiceDataInit = voiceDataInit;
				// 			}
				// 			if(this.voiceData.length>0){
				// 				this.voiceQueue();	
				// 			}else{
				// 				setTimeout(() => {
				// 					this.init()
				// 				}, 5000);
				// 			}
				// 		}else{
				// 			setTimeout(() => {
				// 				this.init();
				// 			}, 5000);
				// 		}		
						
				//     },
				// 	fail:(res) => {
				// 		uni.showToast({
				// 			title:'请求失败',
				// 			icon:'none'
				// 		})
				// 		setTimeout(() => {
				// 			this.init()
				// 		}, 5000);
				// 	}
				// });
			},
			// 语音队列
			voiceQueue(){
				let text = this.voiceData[0] ; 
				this.$tui.webView.postMessage({
					data: {
						text:text
					}
				})
				if(this.voiceData.length>1){
					this.onDone(this.voiceData[1]);
				}else{
					this.voiceData = [];
					setTimeout(() => {
						this.init()
					}, 5000);
				}
			},
			// 播放完执行
			onDone(data){
				let date = 4300;
				if(data.length>12){
					date = date + ((data.length - 12)*300 ) 
				}
				setTimeout(() => {
					this.voicePlayNumber++;
					if(this.voicePlayNumber>=2){
						this.voiceData.shift();
						this.voicePlayNumber = 0;
					}
					if(this.voiceData.length>0){
						this.voiceQueue()
					}else{
						setTimeout(() => {
							this.init()
						}, 5000);
					}
				}, date);
				
			},
		}
	}
</script>

<style>
.pr-15{
	padding-right: 15px;
}
.pl-15{
	padding-left: 15px;
}
page {
	height: 100%;
}
.uni-form-item.uni-form-btn{
	padding: 0;
}
.info{
	padding-left: 10px;
	padding-right: 10px;
	height: 762px;
}
.footer{
	color: #FFFFFF;
    font-size: 44px;
    height: 78px;
    line-height: 78px;
    padding-left: 54px;
}
.chooseBtn{
	font-size: 30px;
	width: 438px;
}
.header{
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 118px;
}
.room{
	width: 477px;
}
.number view{
	color: rgb(113,17,18) !important;
}
.content {
	position: relative;
	height: 100%;
}
.type{
	font-size: 70px;
	display: flex;
	padding-top: 116px;
	font-weight: bold;
	height: 122px;
	line-height: 122px;
    padding-left: 10px;
	padding-right: 10px;
}
.type-text{
	width: 471px;
	text-align: center;
}
.bg {
	position: absolute;
	height: 1080px;
	width: 1920px;
	z-index: -1;
}
.header-time {
	display: flex;
	position: absolute;
	justify-content: center;
	flex-direction: column;
	right: 45px;
	padding-top: 15px;
	top: 0px;
}
.header-title{
	color: rgb(253,250,7);
	font-size: 63px;
	font-weight: 800;
	letter-spacing: 12px;
}
.header-time view {
	font-size: 35px;
	color: #000;
	letter-spacing:5px;
}

.info-patient {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 153px;
	text-align: center;
}
.info-patient view {
	 font-size: 58px;
	font-weight: bold;
	color: #000;
	overflow: hidden;
}

</style>
