<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item,index) in goods" class="menu_item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
						<span class="text">
							<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foodsWrapper">
				<ul>
					<li v-for="item in goods" class="food-list" ref="footlistitem">
						<h2 class="title">{{item.name}}</h2>
						<ul>
							<li v-for="fooditem in item.foods" class="food-item" @click="selectFood(fooditem,$event)">
								<div class="icon">
									<img :src="fooditem.icon" width="57px" height="57px" alt="" />
								</div>
								<div class="content">
									<h2 class="name">{{fooditem.name}}</h2>
									<p class="desc">{{fooditem.description}}</p>
									<div class="extra">
										<span class="count">月售{{fooditem.sellCount}}</span>
										<span>好评率{{fooditem.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">¥{{fooditem.price}}</span>
										<span class="old" v-show="fooditem.oldPrice">¥{{fooditem.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartcontrol  @add="addFood" :food="fooditem"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart ref="shopcart" :selectfoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		</div>
		<food @add="addFood" :food="nowselectfood" ref="food"></food>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'
	const ERR_OK = 0
	export default{
		props:{
//			goods:{
//				type:Object
//			}
		},
		components:{
			shopcart,
			cartcontrol,
			food
		},
		data(){
			return{
				goods:[],
				listHeight:[],
				scrollY :0,
				seller:[],
				nowselectfood:{}
			}
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		  	this.$ajax.get('/api/goods').then(response=>{
	  		if(response.data.errno ===ERR_OK){
				this.goods = response.data.data
	  			}
			})	
  			this.$ajax.get('/api/seller').then(response=>{
	  		if(response.data.errno ===ERR_OK){
				this.seller = response.data.data
	  			}
  			})	
//			当dom发生变化 计算好高度,才能成功调用滚动插件
  			this.$nextTick(() => {
	            this._initScroll()
          })
          setTimeout(()=>{
          	this._calculateHeight()
          },1000)
  		},
  		computed:{
  			currentIndex(){
  				for(let i=0;i<this.listHeight.length;i++){
  					let aheight = this.listHeight[i];
  					let bheight = this.listHeight[i+1];
  					if(!bheight||this.scrollY>=aheight&&this.scrollY<bheight){
  						return i
  					}  
  				}
  				return 0 
  			},
  			//添加已选商品进购物车
  			selectFoods(){
  				let foodslist = []
  				this.goods.forEach((good)=>{
  					good.foods.forEach((food)=>{
  						if(food.count){
  							foodslist.push(food)
  						}
  					})
  				})
  				return foodslist
  			}
  		}, 
  		methods: {
			selectMenu(index,event){
				if (!event._constructed){
			          return;
			    }
				let foodList = this.$refs.footlistitem
		        let el = foodList[index]	
		        this.foodsScroll.scrollToElement(el, 300);
  			},
  			//设置滚动
  			_initScroll(){
                this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                		click: true	
                })
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
//              		实时监控滚动的位置
                		probeType:3,
                		click: true
                })
                this.foodsScroll.on('scroll',(pos)=>{
                		this.scrollY = Math.abs(Math.round(pos.y))
                })
        	   },
        	   //获取每个类型食物栏目的滚动高度
           _calculateHeight(){
           		let foodList = this.$refs.footlistitem
           		let height = 0
           		this.listHeight.push(height)
           		for(let i=0;i<foodList.length;i++){
           			let item = foodList[i];
           			height += item.clientHeight;
           			this.listHeight.push(height)
           		}
           },
	        //获取添加商品事件
			addFood(target){
				this._drop(target)
			},
			_drop(target) {
      		  // 体验优化,异步执行下落动画
		        this.$nextTick(() => {
		          this.$refs.shopcart.drop(target);
		        	});
	      	},
	      	//查看商品详情
  			selectFood(fooditem,event){
  				if (!event._constructed){
			          return;
			   }
  				this.nowselectfood = fooditem
  				this.$refs.food.show()
  			}
        }
	}
</script>

<style lang="stylus">
@import '../../../src/common/stylus/mixin.styl'
	.goods
		display:flex
		position:absolute
		top:174px
		width:100%
		bottom:46px
		overflow:hidden
		.menu-wrapper
			flex:0 0 80px
			width:80px
			background:#f3f5f7
			height:100%
			.menu_item
				display:table
				height:54px
				width:56px
				line-height:14px
				padding:0 12px
				&.current
					font-weight:700px
					position:relative
					z-index:9
					margin-top:-1
					background:#fff
					.text::after
						display:none
				.text
					font-size:12px
					display:table-cell
					width:56px
					vertical-align:middle
					position:relative
					&::after
						content: ' ';
						display: block;
						position: absolute;
						height: 1px;
						width: 100%;
						background: rgba(7,17,27,0.1);;
						bottom:0;
						left: 0;
						transform: scaleY(0.5);
					.icon
						display:inline-block
						vertical-align:top
						width:12px
						height:12px
						margin-left:4px
						background-size:12px 12px
						background-repeat: no-repeat
						&.decrease
							bg-image('decrease_3')
						&.discount
							bg-image('discount_3')	
						&.guarantee
							bg-image('guarantee_3')
						&.invoice
							bg-image('invoice_3')
						&.special
							bg-image('special_3')	
				
		.foods-wrapper
			flex:1
			.title
				padding-left:14px
				height:26px
				line-height:26px
				border-left:2px solid #d9dde1
				font-size:active2px
				color:rgb(147,153,159)
				background:#f3f5f7
			.food-item
				display:flex
				margin-left:18px
				position:relative
				padding:18px 0
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
				&:last-child::after
					display:none
				.icon
					flex: 0 0 57px
					margin-right:10px
				.content	
					flex:1
					.name
						font-size:14px
						color:rgb(7,17,27)
						line-height:14px
						margin:2px 0 8px 0
					.desc,.extra
						font-size:10px
						line-height:10px
						color:rgb(147,153,159)
					.desc
						margin-bottom:8px
						line-height:12px
					.extra
						.count
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
				right:0
				bottom:12px				
</style>	