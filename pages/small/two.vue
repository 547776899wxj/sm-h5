/**
 * 超声科 口腔 放射科  CT  MR检查室二级分诊
 */
<template>
	<view class="content"  @longpress="open" @click="open">
		<image class="bg" src="../../static/triage_small_second.png" ></image>
		<view class="title">
			<view class="title-dep">超声科检查室</view>
			<view class="title-room">诊室1</view>
		</view>
		<view class="info">
			<view class="info-patient">
				<view class="data">
					<view v-if="data.seeingNumber">
						<text class="pr-15">{{data.seeingNumber}}号</text>
						<text class="pl-15">{{data.seeingName}}</text>
					</view>
				</view>
			</view>
			<view class="info-patient pt-15">
				<view class="room">
					<view v-if="data.waitingNumber">
						<text class="pr-15">{{data.waitingNumber}}号</text>
						<text class="pl-15">{{data.waitingName}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			温馨提示：请保持安静，有序就诊！
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
					seeingName:'吴先1111111111',
					seeingNumber:'3211',
					waitingName:'吴先杰',
					waitingNumber:'321',
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
    padding-top: 232px;
    height: 595px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.title-dep{
	text-shadow: 5px 5px 1px #333;
}
.title-room{
	text-shadow: 5px 5px 1px #333;
	font-size: 140px;
}
.uni-form-item.uni-form-btn{
	padding: 0;
}
.info{
	padding-left: 10px;
	padding-right: 10px;
}
.footer{
	color: #FFFFFF;
    font-size: 41px;
    padding-left: 54px;
	padding-top: 21px;
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
	justify-content: center;
	align-items: center;
	height: 497px;
	text-align: center;
	padding-left: 313px;
}
.info-patient view {
	 font-size: 81px;
	color: #fff;

	text-overflow: ellipsis;
}

</style>
