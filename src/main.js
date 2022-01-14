import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import api from './http/index'
import {
    message,
    Button,
    Layout,
    Icon,
    Menu,
    Breadcrumb,
    Table,
    Popconfirm,
    Drawer,
    FormModel,
    Input,
    Upload,
    Tooltip,
    Modal,
    DatePicker
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

Vue.use(Button).use(Layout).use(Icon).use(Menu).use(Breadcrumb).use(Table).use(Popconfirm).use(Drawer).use(FormModel).use(Input).use(Upload)
Vue.use(Tooltip).use(Modal).use(DatePicker)
Vue.use(VueRouter)

Vue.config.productionTip = false
Vue.prototype.$message = message;
Vue.prototype.$api = api;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
