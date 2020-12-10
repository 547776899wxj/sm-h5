<template>
	<view class="content"  @longpress="open" @click="open">
		<image class="bg" src="../../static/skin.png" ></image>
		<view class="info">
			<view class="info-patient" v-for="(item,index) in data" :key="index">
				<view class="room">{{item.room}}</view>
				<view class="doctor">{{item.doctor}}</view>
				<view class="seeing" >
					<view v-show="item.seeing.number">
						<text class="pr-15" >{{item.seeing.number}}号</text>
						<text class="pl-15">{{item.seeing.name}}</text>
					</view>
				</view>
				<view class="seeing" >
					<view v-show="item.wait.number">
						<text class="pr-15">{{item.wait.number}}号</text>
						<text class="pl-15">{{item.wait.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<popupSet ref="popupSet" @confirm="confirm" @close="close" :dataInit="dataPopup" :showPlaySound="true" :showIType="true" :showScreenNumber="true"></popupSet>
	</view>
</template>

<script>
import popupSet from '../../components/popup-set/popup-set.vue';
// #ifdef APP-PLUS
	var FvvUniTTS = uni.requireNativePlugin('Fvv-UniTTS');
// #endif
export default {
	components: { popupSet },
	data() {
		return {
			dateText: {
				year: '',
				month: '',
				date: '',
				day: '',
				time: ''
			},
			title:'',
			weekday: [],
			data:[
				// {
				// 	room:'诊室1',
				// 	doctor:'张医生',
				// 	wait:{
				// 		number:'A1002',
				// 		name:'张无忌',
				// 	},
				// 	seeing:{
				// 		number:'J1003',
				// 		name:'赵敏',
				// 	} 
				// },
			
			],
			cliniqueCode:'',
			iType:'',
			popupShow:false,
			seqNumber:'',
			voiceData:[],
			test:'测试',
			testNubmer:0,
			voiceDataInit:[],
			dataPopup:{
				title:'',
				iType:'',
				screenNumber:'',
				playSound:false,
			},
			voicePlayNumber:0,
		};
	},
	onLoad() {
		this.iType = uni.getStorageSync('iType')||'';
		this.screenNumber = uni.getStorageSync('screenNumber') || '';
		this.playSound = uni.getStorageSync('playSound') || false;
		let date = new Date();
		this.weekday = new Array(7);
		this.weekday[0] = '星期日';
		this.weekday[1] = '星期一';
		this.weekday[2] = '星期二';
		this.weekday[3] = '星期三';
		this.weekday[4] = '星期四';
		this.weekday[5] = '星期五';
		this.weekday[6] = '星期六';
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
			let res = {data:{"Data":[
			{"ghhbid":null,"dept_code":null,"dept_name":"皮肤科","clinique_name":"皮肤1","clinique_code":"946","tech_title":null,"doctor":"王斗训","doctor_pic":null,"calling":null,"calling_seq":null,"calling_pre_time":null,"waiting":"郑杰","waiting_seq":"1","waiting_pre_time":null,"am_pm":"下午","status":"坐诊","dqjzbr":null,"dqjzxh":null},{"ghhbid":null,"dept_code":null,"dept_name":"皮肤科","clinique_name":"皮肤2","clinique_code":"947","tech_title":null,"doctor":"谢涵津","doctor_pic":null,"calling":"吴先杰","calling_seq":"53","calling_pre_time":null,"waiting":null,"waiting_seq":null,"waiting_pre_time":null,"am_pm":"下午","status":"坐诊","dqjzbr":null,"dqjzxh":null},{"ghhbid":null,"dept_code":null,"dept_name":"皮肤科","clinique_name":"皮肤3","clinique_code":"948","tech_title":null,"doctor":"林宝珍","doctor_pic":null,"calling":null,"calling_seq":null,"calling_pre_time":null,"waiting":"林榛苹","waiting_seq":"1","waiting_pre_time":null,"am_pm":"下午","status":"坐诊","dqjzbr":null,"dqjzxh":null}
			],"ServiceTime":"2020-09-08 16:41:01"}}			
			res.data.Data[1].calling_seq =  res.data.Data[1].calling_seq +this.testNubmer++
			this.$request({
				url: '/cartoon/cartoon/selectBasics',
				method: 'POST',
				success: res => {
					console.log('success',res)
				},
				fail: err => {
					console.log('err',err)
				}
			})
			// uni.request({
			// 	url: ' http://192.168.0.108:8080/cartoon/cartoon/selectBasics',
			// 	method: 'POST',
			// 	header: { 'content-type': 'application/x-www-form-urlencoded' },
			// 	success: res => {
			// 		console.log('success',res)
			// 	},
			// 	fail: err => {
			// 		console.log('err',err)
			// 	}
			// })
			let datas = res.data.Data;
			let dataMaps = [];
			let voiceDataInit = [];
			datas.forEach((data,index) =>{
				let waitName =data.waiting?this.$util.hideName(data.waiting):'';
				let seeingName =data.calling?this.$util.hideName(data.calling):'';
				let dataMap = {
					room:data.clinique_name,
					doctor:data.doctor,
					code:data.dept_code,
					wait:{
						number:data.waiting_seq,
						name:waitName,
					},
					seeing:{
						number:data.calling_seq,
						name:seeingName,
					},
				}
				dataMaps = dataMaps.concat(dataMap);
			
				if(seeingName && this.playSound){
					let number = this.chineseNumeral(dataMap.seeing.number+'');
					let speakText = `请,${number}号,${data.calling}到,${dataMap.room}就诊`;
					if(this.data.length==0){
						this.voiceData.push(speakText);
						this.voiceDataInit.push(speakText);
					}else{
						voiceDataInit = voiceDataInit.concat(speakText);
					}
				}
			})
			this.data = dataMaps;
			if(this.playSound){
				if(voiceDataInit.length>0){
					this.voiceData = this.$util.findDifferentElements(voiceDataInit,this.voiceDataInit);
					this.voiceDataInit = voiceDataInit;
				}
				if(this.voiceData.length>0){
					this.voiceQueue();	
				}else{
					setTimeout(() => {
						this.init()
					}, 5000);
				}
			}else{
				setTimeout(() => {
					this.init();
				}, 5000);
			}		
			
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
			// 				let number = this.chineseNumeral(dataMap.seeing.number+'');
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
		//转大写
		chineseNumeral(data){
			let tmpnewchar = "" ;
				for(let char of data){
					switch (char) {
			            case "0":   tmpnewchar =  tmpnewchar + "零" ;break;
			            case "1":  tmpnewchar =  tmpnewchar + "一" ; break;
			            case "2":  tmpnewchar =  tmpnewchar + "二" ; break;
			            case "3":  tmpnewchar =  tmpnewchar + "三" ; break;
			            case "4":  tmpnewchar =  tmpnewchar + "四" ; break;
			            case "5":  tmpnewchar =  tmpnewchar + "五" ; break;
			            case "6":  tmpnewchar =  tmpnewchar + "六" ; break;
			            case "7":  tmpnewchar =  tmpnewchar + "七" ; break;
			            case "8":  tmpnewchar =  tmpnewchar + "八" ; break;
			            case "9":  tmpnewchar =  tmpnewchar + "九" ; break;
						default: tmpnewchar = tmpnewchar + char;
			        }
			}
			return tmpnewchar;
		},
		
		
	}
};
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
	width: 400px;
}
.doctor{
	width: 440px;
}
.seeing{
	width: 504px;
}
.content {
	position: relative;
	height: 100%;
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
.info{
	padding-top: 139px;
	padding-left: 35px;
	padding-right: 35px;
}
.info-patient {
	display: flex;
	height: 100px;
}
.info-patient view {
	 font-size: 55px;
	font-weight: bold;
	color: #000;
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.popup-btn{
		font-size: 30px;
		color: #fff;
		padding-left: 40px;
		padding-right: 40px;
		background-color: rgb(68,114,196);
		margin-left: 40px;
		margin-right: 40px;
	}
	.popup{
		background-color: #fff;
		width: 600px;
		font-size: 40px;
		z-index: 100;
	}
	.popup-header{
		background-color: rgb(68,114,196);
		text-align: center;
		padding: 10px 0 ;
	}
	.uni-form-item{
		display: flex;
		align-items: center;
		padding: 40px;
		justify-content: center;
	}
	.popup-title{
		font-size: 30px;
	}
	.uni-input{
		font-size: 25px;
		border: 1px solid;
		padding: 20px 30px;
	}
</style>

