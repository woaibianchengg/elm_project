<template>
	<div	 class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h2 class="score">{{seller.score}}</h2>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
					    <span class="title">送达时间</span>
					    <span class="delivery">{{seller.deliveryTime}}分钟</span>
				  	</div>
				</div>
			</div>
			<split></split>
			<ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
			<div class="ratings-wrapper">
				<ul v-show="ratings && ratings.length">
					<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
						<div class="avatar">
							<img width="28px" height="28px" :src="rating.avatar">
			            </div>
			            <div class="content">
				            	<h2 class="name">{{rating.username}}</h2>
				            	<div class="star-wrapper">
				            		<star :size="24" :score="rating.score"></star>
				            		<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
				            	</div>
				            	<p class="text">{{rating.text}}</p>
				            	<div class="recommend" v-show="rating.recommend && rating.recommend.length">
				            		<span class="icon-thumb_up"></span>
				            		<span class="item" v-for="item in rating.recommend">{{item}}</span>
				            	</div>
				            	<div class="time">
				            		{{rating.rateTime | formatDate}}
				            	</div>
			            </div>
					</li>
				</ul>
				<div class="norating" v-show="!ratings || !ratings.length">暂无评价</div>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '../star/star'
	import split from '../split/split'
	import ratingselect from '../ratingselect/ratingselect'
	import BScroll from 'better-scroll'
	import {formatDate} from '../../common/js/date'
	const ERR_OK = 0
 	const ALL = 2
	export default{
		props:{
//			seller: {
//		        type: Object
//		      }
	},
		components:{
			star,
			split,
			ratingselect
		},
		data(){
			return{
				seller:{},
				selectType:ALL,
				onlyContent:true,
				ratings:[]
			}
		},
		created(){
			this.$ajax.get('/api/seller').then(response=>{
	  		if(response.data.errno ===ERR_OK){
				this.seller = response.data.data
	  			}
  			})
			this.$ajax.get('/api/ratings').then(response=>{
	  		if(response.data.errno ===ERR_OK){
				this.ratings = response.data.data
	  			}
  			})
			this.$nextTick(() => {
	            this.scroll = new BScroll(this.$refs.ratings, {
	              click: true
	            })
          	})
		},
		methods:{
			selectRating(type){
				this.selectType = type
				this.$nextTick(() => {
		          this.scroll.refresh()
		        })
			},
			toggleContent(){
				this.onlyContent = !this.onlyContent
				this.$nextTick(() => {
		          this.scroll.refresh()
		        })
			},
			//按属性筛选评论
			needShow(type,text){
				if(this.onlyContent && !text){
					return false
				}
				if(this.selectType === ALL){
					return true
				}else{
					return type === this.selectType
				}
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		}
	}
</script>

<style lang="stylus">
@import '../css/icon_style.css'
	.ratings
		position:absolute
		top:174px
		bottom:0
		left:0
		width:100%
		overflow:hidden
		.overview
			display:flex
			padding: 18px 0
			.overview-left
				flex: 0 0 137px
				width:137px
				padding: 6px 0
				border-right: 1px solid rgba(7, 17, 27, 0.1)
				text-align: center
				@media only screen and (max-width: 320px)
					flex: 0 0 120px
					width: 120px
				.score
					margin-bottom: 6px
					font-size:24px
					color:rgb(255,153,0)
					line-height:28px
				.title
					margin-bottom: 8px
					line-height:12px
					font-size:12px
					color:rgb(7,17,27)
				.rank
					font-size:10px
					color: rgb(147, 153, 159)
					line-height:10px
					margin-bottom:6px
			.overview-right
				flex: 1
				padding: 6px 0 6px 24px
				@media only screen and (max-width: 320px)
					padding-left: 6px
				.score-wrapper
					margin-bottom:8px
					font-size: 0
					.title
						font-size:12px
						color:rgb(7,17,27)
						line-height:18px
					.star
						display:inline-block
						margin: 0 12px 0 10px
						vertical-align: top
					.score
						font-size:12px
						color:rgb(255,153,0)
						line-height:18px
						vertical-align:top
				.delivery-wrapper
					font-size:0
					.title
						font-size:12px
						color:rgb(7,17,27)
						line-height:18px
					.delivery
						margin-left: 12px
						font-size:12px
						color:rgb(147,153,159)
						line-height:18px
		.ratings-wrapper
				padding:0 18px
				.rating-item
					position:relative
					display: flex
					padding: 18px 0
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
					.avatar
						flex: 0 0 28px
						width: 28px
						margin-right: 12px
						img
							border-radius:50%
					.content
						position:relative
						flex:1
						.name
							margin-bottom:4px
							line-height:12px
							font-size:10px
							color:rgb(7,17,27)
						.star-wrapper
							margin-bottom: 6px
							font-size: 0
							.star
								display:inline-block
								margin-right:6px
								vertical-align:top
							.delivery
								display:inline-block
								vertical-align:top
								line-height:12px
								font-size:10px
								color:rgb(147,153,159)
						.text
							margin-bottom:8px
							line-height:18px
							color:rgb(7,17,27)
							font-size:12px
						.recommend
							line-height:16px
							font-size:0
							.icon-thumb_up,.item
								display:inline-block
								margin:0 8px 4px 0
								font-size:9px
							.icon-thumb_up
								color:rgb(0,160,220)
							.item
								padding:0 6px
								border:1px solid rgba(1,17,27,0.1)
								border-radius:1px
								color:rgb(147,153,159)
								background:#fff
						.time
							position:absolute
							top:0
							right:0
							line-height:12px
							font-size:10px
							color:rgb(147,153,159)	
								
								
</style>