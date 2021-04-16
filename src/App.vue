<template>
  <div class="layout layout--a">
    <div class="layout__heading">
      <Heading title="Currency Converter" />
    </div>
    <div class="layout__sidebar">
      <Sidebar />
    </div>
    <div class="layout__main">
      <Main />
    </div>
  </div>
</template>

<script>
import Heading from './components/heading/heading.vue';
import Sidebar from './components/sidebar/sidebar.vue';
import Main from './components/main/main.vue';

export default {
  name: 'App',
  components: {
    Heading,
    Sidebar,
    Main
  }
}
</script>

<style lang="scss">
</style>
