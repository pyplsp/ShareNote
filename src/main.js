import Vue from 'vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import '@/assets/css/normalize.css'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';


//主题
import './theme/index.css'

//矢量图标库
import iconfont from '@/assets/font/iconfont.css'

// 引入重新设置的$message
import {message} from './global/resetMessage';

Vue.use(ElementUI);
Vue.use(Toast,{
    type: 'center',
    duration: 1500,
    wordWrap: true,
    width: '10rem'
});
Vue.config.productionTip = false
// 引入重写后的$message
Vue.prototype.$message = message;
export default new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')




