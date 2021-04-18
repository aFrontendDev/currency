<template>
  <section class="main">
    <h2 class="visually-hidden">Main</h2>
    <ul class="rates">
      <li
        v-for="rate in fitleredRates"
        :key="`rate-displays-${rate.currency}`"
        v-bind:class="['rates-item', { 'rates-item--target': rate.currency === targetVal }]"
        v-bind:title="`${rate.currency}: ${rate.value}`"
      >
        <span class="rates-item__currency">{{ rate.currency }}</span>
        <span class="rates-item__value">{{ rate.value }}</span>
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
<style lang="scss" scoped>
@import "../../globalStyles/variables.scss";

.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $brand-color-e;
  padding: $vr * 4 $ggw;
  border-radius: 4px;
  margin-left: $ggw * 3;
}

.rates {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.rates-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: $vr * 2 5px;
  overflow: hidden;
}

.rates-item__currency {
  font-size: 21px;
  line-height: $vr * 4;
  color: $color-title;
  font-weight: 600;

  .rates-item--target & {
    color: $brand-color-a;
  }
}

.rates-item__value {
  font-size: 18px;
  line-height: $vr * 4;
  color: $color-text;
}

</style>
