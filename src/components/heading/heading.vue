<template>
  <header class="heading">
    <h1 class="title">{{ title }}</h1>
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
<style lang="scss" scoped>
@import "../../globalStyles/variables.scss";

.heading {
  text-align: center;
  margin-bottom: $vr * 4;

  @media #{$bp-d} {
    margin-bottom: $vr * 8;
  }
}

.title {
  position: relative;
  display: inline-block;
  color: $brand-color-a;

  &:after {
    content: '';
    position: absolute;
    left: 10%;
    right: 10%;
    height: 2px;
    background-color: currentColor;
    top: calc(100% + #{$vr});
  }
}
</style>
