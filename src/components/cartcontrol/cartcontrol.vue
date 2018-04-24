<template>
	<div class="cartcontrol">
		<transition name="move">	
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreasegoods($event)">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addGood($event)"></div>
	</div>
</template>

<script>
import Vue from 'vue';
	export default{
		props:{
			food:{
				type:Object,
				default(){
				}
			}
		},
		methods:{
			addGood(event){
				if (!event._constructed){
					 console.log(1)
			          return;
			   }
				if(!this.food.count){
					Vue.set(this.food,'count',1)
				}else{
					this.food.count++
				}
				this.$emit('add', event.target);
				
			},
			decreasegoods(event){
				if (!event._constructed){
					 console.log(1)
			          return;
			   }
				if(this.food.count){
					this.food.count--
				}
			}
		}
	}
</script>

<style lang="stylus">
@import '../css/icon_style.css'
	.cartcontrol
		font-size:0
		.cart-decrease
			display:inline-block
			padding:6px
			.inner
				display: inline-block
				font-size:24px
				line-height:24px
				color:rgb(0,160,220)
				transition: all 0.4s linear
				transform: rotate(0)
			&.move-enter-active, &.move-leave-active
				transition: all 0.4s linear
			&.move-enter, &.move-leave-active
				opacity: 0;
				transform: translate3d(24px, 0, 0);
				.inner
					transform: rotate(180deg)
		.cart-count
			display:inline-block
			font-size:10px
			vertical-align:top
			width:12px
			padding-top:6px
			line-height:24px
			text-align:center
			color:rgb(147,153,159)
		.cart-add
			display:inline-block
			padding:6px 
			font-size:24px
			line-height:24px
			color:rgb(0,160,220)
		
</style>