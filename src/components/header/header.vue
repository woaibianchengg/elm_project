<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64px" height="64px" :src="seller.avatar"/>
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}/分钟送达
				</div>
				<div v-if="seller.supports" class="supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
			
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin_title"></span><span class="bulletin_text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background-image">
			<img :src="seller.avatar" width="100%" height="100%" alt="" />
		</div>
		<transition name="fade">
			<div v-show="detailShow" class="detail">
			<div class="detail_wrapper clearfix">
				<div class="detail-main">
					<h2 class="name">{{seller.name}}</h2>
					<div class="star-wrapper">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul v-if="seller.supports" class="supports">
						<li class="support-item" v-for="(item,index) in seller.supports">
							<span class="icon" :class="classMap[seller.supports[index].type]"></span>
							<span class="text">{{item.description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p class="content">{{seller.bulletin}}</p>
					</div>
				</div>
			</div>
			<div class="detail-close" @click="closeDetail">
				<i class="icon-close"></i>
			</div>
		</div>
		</transition>
	</div> 
</template>
	
<script>
import star from '../star/star'
export default {
	components:{
		star	
	},
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			detailShow:false
		}
	},
	methods:{
		showDetail(){
			this.detailShow = true
		},
		closeDetail(){
			this.detailShow = false
		}
	},
	created(){
		this.classMap = ['decrease','discount','special','invoice','guarantee']
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../src/common/stylus/mixin.styl'
@import '../css/icon_style.css'
	.header{
		color:#fff;
		position: relative;
		background-color: rgba(7,17,27,0.5);
		/*防止图层溢出*/
		overflow: hidden;
	}
	.header .content-wrapper{
		padding: 24px 12px 18px 24px;
		/*消除字体缝隙*/
		font-size:0;
		position: relative;
	}
	.header .content-wrapper .avatar{
		display: inline-block;
		vertical-align: top;
	}
	.header .content-wrapper .avatar img{
		border-radius: 2px;
	}
	.header .content-wrapper .content{
		display: inline-block;
		margin-left: 16px;
	}
	.header .content-wrapper .content .title{
		margin:2px 0 8px 0;
	}
	.header .content-wrapper .content .title .brand{
		display: inline-block;
		width: 30px;
		height:18px;
		bg-image('brand');
		background-size: 30px 18px;
		background-repeat: no-repeat;
		vertical-align: top;
	}
	.header .content-wrapper .content .title .name{
		margin-left: 6px;
		font-size: 16px;
		line-height: 18px;
		font-weight: bold;
	}
	.header .content-wrapper .content .description{
		margin-bottom:10px;
		line-height: 12px;
		font-size: 12px;
	}
	.header .content-wrapper .content .supports{
		
	}
	.header .content-wrapper .content .supports .icon{
		vertical-align: top;
		display: inline-block;
		width:12px;
		height:12px;
		margin-right:4px;
		background-size: 12px 12px;
		background-repeat: no-repeat;
	}
	.header .content-wrapper .content .supports .decrease{
		bg-image('decrease_1');
	}
	.header .content-wrapper .content .supports .discount{
		bg-image('discount_1');
	}
	.header .content-wrapper .content .supports .guarantee{
		bg-image('guarantee_1');
	}
	.header .content-wrapper .content .supports .invoice{
		bg-image('invoice_1');
	}
	.header .content-wrapper .content .supports .special{
		bg-image('special_1');
	}
	.header .content-wrapper .content .supports .text{
		line-height: 12px;
		font-size: 10px;
	}
	.header .content-wrapper .support-count{
		position: absolute;
		right: 12px;
		bottom: 18px;
		padding: 0 8px;
		height:24px;
		line-height: 24px;
		border-radius: 14px;
		background-color: rgba(0,0,0,0.2);
		text-align: center;
	}
	.header .content-wrapper .support-count .count{
		vertical-align: top;
		font-size: 10px;
	}
	.header .content-wrapper .support-count .icon-keyboard_arrow_right{
		font-size: 10px;
		line-height: 24px;
		margin-left: 2px;
	}
	.bulletin-wrapper{
		position: relative;
		height:28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 200;
		background: rgba(7,17,27,0.2);
	}
	.bulletin-wrapper .bulletin_title{
		display: inline-block;
		margin-top:8px;
		width: 22px;
		height:12px;
		bg-image('bulletin');
		background-size: 22px 12px;
		background-repeat: no-repeat;
		vertical-align: top;
	}
	.bulletin-wrapper .bulletin_text{
		font-size: 10px;
		margin: 0 4px;
		vertical-align: top;
	}
	.bulletin-wrapper .icon-keyboard_arrow_right{
		position: absolute;
		font: 10px;
		right: 10px;
		bottom:7px
	}
	.header .background-image{
		position: absolute;
		width: 100%;
		height: 100%;
		top:0;
		left:0;
		z-index: -1;
		/*图片模糊*/
		filter: blur(10px);
	}
	
	/*弹层*/
	.header .detail{
		position: fixed;
		top:0;
		left: 0;
		z-index: 100;
		width: 100%;
		height:100%;
		overflow: hidden;
		background-color: rgba(7,17,27,0.8);
	}
	.header .detail .detail_wrapper{
		min-height: 100%;
		width: 100%;
	}
	.header .detail .detail_wrapper .detail-main{
		margin-top: 64px;
		padding-bottom: 64px;
	}
	.header .detail .detail-close{
		position: relative;
		width: 32px;
		height: 32px;
		margin: -64px auto 0 auto;
		font-size: 32px;
	}
	.header .detail .detail-main .name{
		font-size: 16px;
		text-align: center;
		line-height: 16px;
		font-weight: 700;
	}
	
	/*评分星星组件*/
	.header .detail .detail-main .star-wrapper{
		margin-top:18px;
		padding: 2px 0;
		text-align: center;
	}
	
	.header .detail .detail-main .title{
		display: flex;
		width:80%;
		margin: 28px auto 24px auto;
	}
	.header .detail .detail-main .title .line{
		flex: 1;
		position: relative;
		top:-6px;
		border-bottom: 1px solid rgba(255,255,255,0.2);
	}
	.header .detail .detail-main .title .text{
		padding: 0 12px;
		font-size: 14px;
		font-weight: 700;
	}
	.header .detail .detail_wrapper .detail-main .supports {
		width: 80%;
		margin: 0 auto;
	}
	.header .detail .detail_wrapper .detail-main .supports .support-item{
		padding: 0 12px;
		margin-bottom: 12px;
		
	}
	.header .detail .detail_wrapper .detail-main .supports .support-item:last-child{
		margin-bottom: 0;
	}
	.header .detail .detail_wrapper .detail-main .supports .support-item .icon{
		display: inline-block;
		width:16px;
		height:16px;
		background-size: 16px 16px;
		background-repeat: no-repeat;
		margin-left: 6px;
		vertical-align: middle;
	}
	.header .detail .detail_wrapper .detail-main .supports .support-item .decrease{
		bg-image('decrease_2');
	}
	.header .detail .detail_wrapper .detail-main .supports .support-item .discount{
		bg-image('discount_2');
	}
	.header .detail .detail_wrapper .detail-main .supports .support-item .special{
		bg-image('special_2');
	}
	.header .detail .detail_wrapper .detail-main .supports .support-item .invoice{
		bg-image('invoice_2');
	}
	.header .detail .detail_wrapper .detail-main .supports .support-item .guarantee{
		bg-image('guarantee_2');
	}
	.header .detail .detail_wrapper .detail-main .supports .support-item  .text{
		vertical-align: middle;
		font-size: 12px;
		font-weight: 200;
		color:rgb(255,255,255);
		line-height: 12px;
	}
	.header .detail .detail_wrapper .detail-main .bulletin{
		width: 80%;
		margin: 0 auto;
	}
	.header .detail .detail_wrapper .detail-main .bulletin .content{
		font-size: 12px;
		font-weight: 200;
		color:rgb(255,255,255);
		line-height: 24px;
		padding: 0 12px;
	}
	/*弹层动画*/
	.fade-enter-active, .fade-leave-active{
		transition: all .5s;
	}
	.fade-enter , .fade-leave-to{ 
		opacity: 0; 
	}
	
</style>