<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/globals/Header.vue';
import Footer from '@/components/globals/Footer.vue';
@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {}
</script>
