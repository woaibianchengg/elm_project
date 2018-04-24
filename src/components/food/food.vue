<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img class="foodimg" :src="food.image" alt="" />
					<div class="back-arrow" @click="Hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h2 class="title">{{food.name}}</h2>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}</span>
					</div>
					<div class="price">
						<span class="now">¥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol @add="addFood" :food="food"></cartcontrol>
					</div>
					<transition name="fade">
						<div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="buy">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h2 class="title">商品信息</h2>
					<p class="text">{{food.info}}</p>
				</div>
				<div class="rating">
					<h2 class="title">商品评价</h2>
					<ratingselect @toggle="toggleContent" @select="selectRating" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
					<div class="ratings-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img class="avatar" :src="rating.avatar" alt="" width="12px" height="12px" />
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
									{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="norating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import {formatDate} from '../../common/js/date'

//定义全部，满意，不满意三个按钮的常亮
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
	export default{
		props:{
			food:{
				type:Object
			}
		},
		components:{
			cartcontrol,
			split,
			ratingselect
		},
		data(){
			return{
				showFlag: false,
				selectType:ALL,
				onlyContent:true,
				desc:{
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				}
			}
		},
		methods:{
			show(){
				this.showFlag =true
				this.selectType = POSITIVE
				this.onlyContent = true
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.food,{
							click : true
						})
					}else{
						this.scroll.refresh()
					}
				})
			},
			Hide(){
				this.showFlag =false
			},
			//点击购物车按钮
			buy(event){
				if (!event._constructed){
					 console.log(1)
			          return;
			   }
				//小球动画
				this.$emit('add', event.target)
				Vue.set(this.food, 'count', 1)
			},
			//多次点击添加商品小小球动画
			addFood(){
				this.$emit('add', event.target)
			},
			//筛选评论列表
			needShow(type,text){
				if(this.onlyContent && !text){
					return false
				}
				if(this.selectType === ALL){
					return true 
				}else{
					return type === this.selectType
				}
			},
			//接受子组件传递回来的操作，更改数据
			selectRating(type){
				this.selectType = type
				this.$nextTick(() => {
			      this.scroll.refresh()
			    })
			},
			toggleContent(){
				 this.onlyContent = !this.onlyContent;
				 this.$nextTick(() => {
		          this.scroll.refresh()
		        })
			},
		},
		//转化时间戳
		filters: {
	      formatDate(time) {
	        let date = new Date(time);
	        return formatDate(date, 'yyyy-MM-dd hh:mm');
	      }
	    }
	}
</script>

<style lang="stylus">
@import '../css/icon_style.css'
	.food
		position:fixed
		left:0
		top:0
		bottom:48px
		z-index:30
		width:100%
		background:#fff
		transform: translate3d(0, 0, 0)
		&.move-enter-active,&.move-leave-active
			transition: all .2s linear
		&.move-enter,&.move-leave-active
			transform: translate3d(100%, 0, 0)
		.image-header
			position:relative
			width:100%
			padding-top:100%
			.foodimg
				position:absolute
				top:0;
				left:0;
				width:100%
				height:100%
			.back-arrow
				position:absolute
				top:10px
				left:0
				background:rgba(0,0,0,0.6)
				border-radius:50%
				.icon-arrow_lift
					display:block
					padding:10px
					font-size:20px
					color:#fff
		.content
			padding:18px
			position:relative
			.title
				font-size:14px
				line-height:14px
				margin-bottom:8px
				font-weight:700
				color:rgb(7,17,27)
			.detail
				margin-bottom:14px
				line-height:10px
				font-size:0
				.sell-count,.rating
					font-size:10px
					color:rgb(147,153,159)
				.sell-count
					margin-right:12px
			.price
				font-weight:700
				line-height:24px
				.now
					margin-right:8px
					color:rgb(240,20,20)
					font-size: 14px
				.old
					text-decoration:line-through
					font-size:10px
					color:rgb(147,153,159)
			.cartcontrol-wrapper
				position:absolute
				right:12px
				bottom:12px
			.buy
				height:24px
				line-height:24px
				position:absolute
				right:18px
				bottom:18px
				z-index:10px
				padding:0 12px
				box-sizing:border-box
				font-size:10px
				border-radius:12px
				background:rgb(0,160,220)
				color:#fff
				&.fade-enter-active,&.fade-leave-active
					transition:all .2s
				&.fade-enter,&.fade-leave-active
					transform:opacity
					z-index:-1
		.info
			padding:18px
			.title
				line-height:14px
				margin-bottom:6px
				font-size:14px
				color:rgb(7, 17, 27)
			.text
				line-height:24px
				font-size:12px
				color:rgb(77,85,93)
				font-weight:200
				 padding: 0 8px
		.rating
			padding-top:18px
			.title
				margin-left:18px
				line-height:14px
				font-size:14px
				color:rgb(7, 17, 27)
			.ratings-wrapper
				padding:0 18px
				.rating-item
					position:relative
					padding:16px 0 
					&::after
						content: ' '
						display: block
						position: absolute
						height: 1px
						width: 100%
						background: rgba(7,17,27,0.1)
						bottom:0
						left: 0
						transform: scaleY(0.5)
					.user
						position:absolute
						right:0
						top:16px
						font-size:0
						line-height:12px
						.name
							margin-right:6px
							display:inline-block
							vertical-align:top
							font-size:10px
							color:rgb(147,153,159)
						.avatar
							border-radius:50%
					.time
						margin-bottom:6px
						line-height:12px
						font-size:10px
						color:rgb(147,153,159)
					.text
						line-height:16px
						font-size:12px
						color:rgb(7,17,27)	
						.icon-thumb_up,.icon-thumb_down
							margin-right:4px
							line-height:16px
							font-size:12px
						.icon-thumb_up
							color:rgb(0,160,220)
						.icon-thumb_down
							color:rgb(147,153,159)
			.norating
				padding:16px 0
				font-size:12px
				color:rgb(147,153,159)
</style>