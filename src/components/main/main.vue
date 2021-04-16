<template>
  <section class="main">
    <h2>Main</h2>
    <ul>
      <li v-for="rate in fitleredRates" :key="`rate-displays-${rate.currency}`" v-bind:class="[{ active: rate.currency === targetVal }]">
        {{ rate.currency }} : {{ rate.value }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Main',
  props: {
    rates: Array,
    base: String,
    target: String
  },
  computed: {
    baseVal() {
      return this.base;
    },
    targetVal() {
      return this.target;
    },
    fitleredRates() {
      // We want to display all currency apart from BASE rate
      const base = this.baseVal || '';
      const rates = this.rates || [];
      if (!rates || rates.length < 1 || !base) {
        return []
      }

      return rates.filter(function(x) {
        return x.currency !== base
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active {
  color: red;
}
</style>
