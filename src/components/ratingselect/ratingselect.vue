<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2,$event)" class="box positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0,$event)" class="box positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click="select(1,$event)" class="box negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE = 0
	const NEGATIVE = 1
	const ALL = 2
	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return []	
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default: false
			},
			desc:{
				type:Object,
				default(){
					return{
						all:'全部',
						positive:'满意',
						negative:'不满意'
					}
				}
			}
		},
		methods:{
			select(type,evnet){
				if(event.constructed){
					return
				}
				this.$emit('select', type);
			},
			toggleContent(){
				if(event.constructed){
					return
				}
				this.$emit('toggle')
			}
		},
		computed:{
			positives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType === POSITIVE
				})
			},
			negatives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType === NEGATIVE
				})
			}
			
		}
	}
</script>

<style lang="stylus">
@import '../css/icon_style.css'

	.ratingselect
		.rating-type
			padding:18px 0
			margin:0 18px
			font-size:0
			position:relative
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
			.box
				display:inline-block
				padding:8px 12px 
				border-radius:1px
				margin-right:8px
				color:rgb(77,85,93)
				font-size:12px
				&.positive
					background:rgba(0,160,220,0.2)
					color:rgb(77,85,93)
					&.active
						background:rgb(0,160,220)
						color: #fff
				&.negative
					background:rgba(77,85,93,0.2)
					&.active
						background:rgb(77,85,93)
						color: #fff
				.count
					font-size:8px
					margin-left:2px
					line-height:16px
		.switch
			padding:12px 18px
			line-height:24px
			color:rgb(147,153,159)
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
			&.on
				.icon-check_circle
					color:#00c850
			.icon-check_circle
				display:inline-block
				margin-right:4px
				font-size:24px
				vertical-align:top
			.text
				vertical-align:top
				display:inline-block
				font-size:12px
				
</style>