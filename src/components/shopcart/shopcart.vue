<template>
	<div>
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="shopcarlogowrapper">
						<div class="logo" :class="{'highlinght':totalCount>0}">
							<i class="icon-shopping_cart" :class="{'highlinght':totalCount>0}"></i>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'highlinght':totalPrice>0}">¥{{totalPrice}}</div>
					<div class="desc">另需配送费{{deliveryPrice}}¥元</div>
				</div>
				<div class="content-right" @click.stop.prevent="pay">
					<div class="pay" :class="payClass">
						{{payDesc}}
					</div>
				</div>
			</div>
			<div class="ball-container">
				<div v-for="ball in balls" class="ball">
					<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
						<div class="ball" v-show="ball.show">
							<div class="inner inner-hook"></div>
						 </div>
					</transition>
				</div>
			</div>
			<transition name="fold">
				<div class="shopcart-list" v-show="cartlistshow">
					<div class="list-header">
						<h2 class="title">购物车</h2>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref="listContent">
						<ul>
							<li class="selectfoodlist" v-for="food in selectfoods">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>¥{{food.price*food.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="mask">
			<div class="list_mask" v-show="cartlistshow"  @click="toggleList">
			</div>
		</transition>
	</div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
	export default {
		components:{
			cartcontrol
		},
		props:{
			selectfoods:{
				type:Array,
				default(){
					return [	
					]
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				balls:[
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					}
				],
				dropBalls: [],
				fold:true
			}
		},
		methods:{
			drop(el){
				for (let i = 0; i < this.balls.length; i++) {
		          let ball = this.balls[i]
		          if (!ball.show) {
		            ball.show = true
		            ball.el = el
		            this.dropBalls.push(ball)
		            return
		          }
		        }
			},
			beforeDrop(el) {
		        let count = this.balls.length
		        while (count--) {
		          let ball = this.balls[count]
		          if (ball.show) {
		            let rect = ball.el.getBoundingClientRect()
		            let x = rect.left - 32;
		            let y = -(window.innerHeight - rect.top - 22)
		            el.style.display = ''
		            el.style.transform = `translate3d(0,${y}px,0)`
		            let inner = el.getElementsByClassName('inner-hook')[0]
		            inner.style.transform = `translate3d(${x}px,0,0)`
		          }
		        }
		   },
			  dropping(el, done) {
			    /* eslint-disable no-unused-vars */
			        let rf = el.offsetHeight
			        this.$nextTick(() => {
			          el.style.webkitTransform = 'translate3d(0,0,0)';
			          el.style.transform = 'translate3d(0,0,0)'
			          let inner = el.getElementsByClassName('inner-hook')[0]
			          inner.style.webkitTransform = 'translate3d(0,0,0)'
			          inner.style.transform = 'translate3d(0,0,0)'
			          el.addEventListener('transitionend', done)
			        });
			      },
		      afterDrop(el) {
		        let ball = this.dropBalls.shift()
		        if (ball) {
		          ball.show = false
		          el.style.display = 'none'
		        }
	     	 },
	     	 //来回折叠商品列表
	     	 toggleList(){
	     	 	if(!this.totalCount){
	     	 		return
	     	 	}
	     	 	this.fold = !this.fold
	     	 },
	     	 //清空购物车
	     	 empty(){
	     	 	this.selectfoods.forEach((food)=>{
	     	 		food.count = 0
	     	 	})
	     	 },
//	     	 点击弹层隐藏购物车列表
			hidelist(){
				this.fold = true
			},
			pay(){
				if(this.totalPrice< this.minPrice){
					return
				}
				console.log(`请支付${this.totalPrice}元`)
			}
		},
		computed:{
			totalPrice(){
				let total =0
				this.selectfoods.forEach((food)=>{
					total += food.price * food.count
				})
				return total
			},
			totalCount(){
				let count = 0
				this.selectfoods.forEach((food)=>{
					count += food.count
				})
				return count
			},
			//支付键的背景颜色
			payDesc(){
				if(this.totalPrice === 0){
					return `¥${this.minPrice}元起送`
				}else if(this.totalPrice<this.minPrice){
					let diff =this.minPrice - this.totalPrice
					return `还差¥${diff}元起送`
				}else{
					return '去结算'
				}
			},
			//支付键的背景颜色
			payClass(){
				if(this.totalPrice<this.minPrice){
					return 'normal'
				}else{
					return 'highlinght'
				}
			},
			//显示已选商品列表
			cartlistshow(){
				if(!this.totalCount){
					this.fold = true
					return false
				}
				let show = !this.fold 
				if(show){
					this.$nextTick(()=>{
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.listContent,{
								click:true
							})
						}else{
							this.scroll.refresh()
						}
					})
				}
				return show
			}
		}
	}
</script>

<style lang="stylus">
@import '../css/icon_style.css'
	.list_mask
		position:fixed
		top:0
		left:0
		height:100%
		width:100%
		z-index:40
		opacity: 1
		background: rgba(7, 17, 27, 0.6)
		/*&.mask-enter-active,&.mask-leave-active
			transition: all .5s
		&.mask-enter,&.mask-leave.active
			opacity: 0
     		background: rgba(7, 17, 27, 0)*/
	.shopcart
		position:fixed
		left:0
		bottom:0
		z-index:50
		width:100%
		height:48px
		.ball-container
			.ball
				position:fixed
				left:32px
				bottom:22px
				z-index:200
				transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
				.inner
					width:16px
					height:16px
					border-radius:50%
					/*蓝色小球*/
					/*background:rgb(0,160,220)*/
					background:rgb(240,20,20)
					transition: all .4s linear
		.shopcart-list
			position:absolute
			left:0
			top: 0
			z-index:-1
			width:100%
			transform: translate3d(0, -100%, 0)
			&.fold-enter-active,&.fold-leave-active
				transition: all 0.5s
			&.fold-enter,&.fold-leave-active
				transform: translate3d(0, 0, 0)
			.list-header
				height:40px
				line-height:40px
				padding:0 18px
				background:#f3f5f7
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
				.title
					float:left
					font-size:14px
					color:rgb(7,17,27)
				.empty
					float:right
					font-size:12px
					color:rgb(0,160,220)
			.list-content
				padding:0 18px
				max-height:217px
				overflow:hidden
				background:#fff
				.selectfoodlist
					position: relative
					font-size:12px 0
					padding: 12px 0
					box-sizing:border-box
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
					.name
						line-height:24px
						font-size:14px
						color:rgb(7,17,27)
					.price
						position:absolute
						right:90px
						bottom:12px
						font-size:14px
						font-weight:700
						line-height:24px
						color:rgb(240,20,20)
					.cartcontrol-wrapper
						position:absolute
						right:0
						bottom:6px
		.content
			display:flex
			background:#141d27
			font-size:0
			.content-left
				flex:1
				.shopcarlogowrapper
					box-sizing:border-box
					display:inline-block
					position:relative
					top:-10px
					width:56px
					height:56px
					margin:0 18px
					padding:6px
					vertical-align:top
					border-radius:50%
					background:#141d27
					.logo
						width:100%
						height:100%
						border-radius:50%
						background:#2b343c
						text-align:center
						&.highlinght
							background:rgb(0,160,220)
						.icon-shopping_cart
							font-size:24px
							line-height:44px
							color:#80858a
							&.highlinght
								color:#fff
					.num
						position:absolute
						top:0
						right:0
						width:24px
						height:16px
						line-height:16px
						text-align:center
						border-radius:16px
						font-size:9px
						font-weight:700
						color:#fff
						background:rgb(240,20,20)
						box-shadow:0px 4px 8px 0px rgba(0,0,0,0.4)
				.price
					display:inline-block
					font-size:16px
					color:rgba(255,255,255,0.4)
					font-weight:700
					line-height:24px
					margin-top:12px
					vertical-align:top
					box-sizing:border-box
					padding-right:12px
					border-right:1px solid rgba(255,255,255,0.1)
					&.highlinght
						color:#fff
				.desc
					display:inline-block
					vertical-align:top
					line-height:24px
					margin:12px 0 0 12px
					font-size:12px
					font-weight:normal
					color:rgba(255,255,255,0.4)
			.content-right
				flex:0 0 105px
				width:105px
				.pay
					height:48px
					font-size:12px
					color:rgba(255,255,255,0.4)
					text-align:center
					font-weight:700
					line-height:48px
					&.highlinght
						background:#00b43c
						color:#fff
					&.normal
						background:#2b333b
						
</style>