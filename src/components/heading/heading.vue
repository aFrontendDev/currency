<template>
  <header class="heading">
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: 'Heading',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.heading {
  text-align: center;
}
</style>
