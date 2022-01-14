<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view></router-view>
    </a-locale-provider>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
moment.locale('zh-cn')
export default {
  data() {
    return {
      locale: zhCN,
    };
  },
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
