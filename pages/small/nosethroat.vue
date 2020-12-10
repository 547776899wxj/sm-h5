/**
 * 消化内镜
 */
<template>
	<view class="content"  @longpress="open" @click="open">
		<image class="bg" src="../../static/noseThroat_small_one.png" ></image>
		<view class="title">
			<view class="title-room">电子鼻咽喉镜室</view>
		</view>
		<view class="info">
			<view class="info-patient">
				<view class="info-title">
					当前检查
				</view>
				<view class="room data">
					<view v-if="data.seeingNumber">
						<text class="pr-15">{{data.seeingNumber}}号</text>
						<text class="pl-15">{{data.seeingName}}</text>
					</view>
				</view>
			</view>
			<view class="info-patient pt-15 wait">
				<view class="wait-title">
					等候检查
				</view>
				<view class="room" >
					<view v-for="(item,index) in data.wating" :key="index" class="room-list">
						<view v-if="item.number">
							<text class="pr-15">{{item.number}}号</text>
							<text class="pl-15">{{item.name}}</text>
							<text v-if="index%2==0">，</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="footer-title">
				温馨提示
			</view>
			<view class="footer-text">
				<view>1、检查前请至诊疗室1喷麻药</view>
				<view>2、检查后1小时内禁食禁饮</view>
				<view>3、30分钟后至候诊厅自助打印报告</view>
			</view>
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
				data:{
					room:'检查室203',
					number:'GX124',
					department:'数字胃肠镜',
					seeingName:'吴先杰',
					seeingNumber:'3211',
					wating:[
						{name:'陈琳',number:'3412'},
						{name:'陈琳',number:'3412'},{name:'陈琳',number:'3412'},
						{name:'陈琳',number:'3412'},{name:'陈琳',number:'3412'},
						{name:'陈琳',number:'3412'},{name:'陈琳',number:'3412'},
						{name:'陈琳',number:'3412'},{name:'陈琳',number:'3412'},
						{name:'陈琳',number:'3412'},
					],
					pastName:'我先杰',
				},
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
.pt-15{
	padding-top: 15px;
}
page {
	height: 100%;
}
.title{
	color: #fff;
    padding-top: 166px;
    height: 252px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.title-room{
	font-size: 120px;
	color: #000000;
}
.uni-form-item.uni-form-btn{
	padding: 0;
}

.doctor-name{
	font-size: 130px;
}
.doctor-title{
	font-size: 90px;
}
.doctor-info{
	width: 732px;
	text-align: center;
	color: #fff;
}
.doctor-image{
	width: 240px;
	height: 313px;
	background-image: url(../../static/user.png) ;
	background-size: 240px 313px;
}
.info{
	padding-left: 10px;
	padding-right: 10px;
}
.footer{
	color: #000;
    font-size: 41px;
	display: flex;
	padding: 5px 20px;
	height: 310px;
}
.footer-title{
	width: 68px;
	font-size: 53px;
	padding: 0 46px;
	line-height: 1.1;
	height: 100%;
	display: flex;
	color: rgb(113,17,18);
	align-items: center;
}
.footer-text{
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-left: 30px;
	font-size: 46px;
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

.number view{
	color: rgb(113,17,18) !important;
}
.content {
	position: relative;
	height: 100%;
}


.bg {
	position: absolute;
	height: 1920px;
	width: 1080px;
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
	align-items: center;
	height: 323px;
	text-align: center;
	padding-bottom: 20px;
	padding-top: 0;
	padding-left: 10px;
}
.info-patient .info-title{
	color: rgb(113,17,18);
	font-size: 105px;
	width: 305px;
	
}
.info-patient:first-child{
	padding-top: 10px;
	padding-bottom: 0px;
}
.info-patient .room {
	font-size: 80px;
	color: #000;
	width: 874px;
	text-overflow: ellipsis;
}
.info-patient.wait .room{
	font-size: 57px;
	display: flex;
	padding: 70px 0;
	justify-content: center;
	flex-wrap: wrap;
}
.info-patient.wait .room .room-list{
	padding: 26px 0;
}

.info-patient .room.data{
	color: rgb(113,17,18);
	font-size: 90px;
	width: 736px;
}
.info-patient.wait{
	height: 781px;
	align-items: flex-start;
}
.wait-title{
	height: 100%;
	width: 167px;
	font-size: 100px;
	line-height: 1.1;
	display: flex;
    align-items: center;
}
</style>
