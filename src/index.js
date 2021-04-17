import './assets/scss/style.scss'

import './assets/js/main'


// Vue.js
import Vue from "vue";

// Vue store
import store from './assets/js/store'

// Vue components
import Example from "./assets/js/components/Example.vue";

// Vue init
const app = new Vue({
	el: '#app',
	store,
	components: {
		Example
	}
})