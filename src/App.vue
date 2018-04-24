<template>
  <div id="app">
	<v-header :seller="seller"></v-header>
	<div class="tab">
		<div class="tab_item"><router-link :to="{path:'/goods'}" active-class="item_hover">商品</router-link></div>
		<div class="tab_item"><router-link :to="{path:'/ratings'}" active-class="item_hover">评论</router-link></div>
		<div class="tab_item"><router-link :to="{path:'/seller'}" active-class="item_hover">商家</router-link></div>
	</div>
	<keep-alive>
		<router-view :seller="seller"></router-view>
	</keep-alive>	
  </div>
</template>

<script>
import header from './components/header/header'
import { urlParse } from './common/js/util'
//记录商家id,点击收藏时候使用
const ERR_OK = 0 
export default {
  name: 'App',
  data(){
  	return {
  		seller:{
  			 id: (() => {
	            let queryParam = urlParse();
	            return queryParam.id;
  			 })()
  		}
  	}
  },
  components:{
  	'v-header' : header
  },
  created(){
	this.$ajax.get('/api/seller?id='+this.seller.id).then((response)=>{
		if(response.data.errno ===ERR_OK){
			this.seller = Object.assign({}, this.seller, response.data.data)
		}
	})
//	  this.$http.get("/api/seller").then((response) => {
//	    response = response.body;
//	    if (response.errno === ERR_OK) {
//	      this.seller = Object.assign({}, this.seller, response.data);
//	    }
//	  })
  }
}
</script>

<style>
	#app .tab{
		display: flex;
		width:100%;
		height: 40px;
		line-height: 40px;
		position: relative;
	}
	#app .tab::after{
		content: ' ';
		display: block;
		position: absolute;
		height: 1px;
		width: 100%;
		background: rgba(7,17,27,0.1);;
		bottom:0;
		left: 0;
		transform: scaleY(0.5);
		
	}
	#app .tab_item{
		flex:1;
		text-align: center;
	}
	.tab_item a{
		display: block;
		font-size:14px;
		color: rgb(77,85,93);
	}
	#app .tab_item .item_hover{
		color:rgb(240,20,20)
	}
</style>
