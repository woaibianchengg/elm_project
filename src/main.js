// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
import axios from 'axios'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.prototype.$ajax = axios
Vue.use(VueResource)
Vue.use(VueRouter)

let router = new VueRouter({
	mode:'history',
	routes:[
		{
			path:'/goods',
			component:goods
		},
		{
			path:'/ratings',
			component:ratings
		},
		{
			path:'/seller',
			component:seller
		},
		{
			path:'/',
			component:goods
		}
//		{
//			path:'/detail',
//			component:DetailPage,
//			redirect:'detail/pro',
//			children:[
//				{
//					path:'pro',
//					component:proPage
//				},
//				{
//					path:'team',
//					component:teamPage
//				},
//				{
//					path:'math',
//					component:mathPage
//				},
//				{
//					path:'about',
//					component:aboutPage
//				}
//			]
//		}
	]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
