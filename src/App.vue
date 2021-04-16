<template>
  <div class="layout layout--a">
    <div class="layout__heading">
      <Heading title="Currency Converter" />
    </div>
    <div class="layout__sidebar">
      <Sidebar
        v-on:baseUpdate="baseUpdate"
        v-on:targetUpdate="targetUpdate"
        v-on:switchCurrency="switchCurrency"
        v-bind:currencies="currencies"
        v-bind:base="base"
        v-bind:target="target"
      />
    </div>
    <div class="layout__main">
      <Main v-bind:rates="rates" v-bind:base="base" v-bind:target="target" />
    </div>
  </div>
</template>

<script>
import Heading from './components/heading/heading.vue';
import Sidebar from './components/sidebar/sidebar.vue';
import Main from './components/main/main.vue';
import { apiKeys, endpoints } from './config.js';

export default {
  name: 'App',
  components: {
    Heading,
    Sidebar,
    Main
  },
  data: function () {
    return {
      rates: null,
      currencies: [],
      base: '',
      target: ''
    }
  },
  created() {
    this.getCurrencyData();
  },
  methods: {
    getCurrencyData(selectedBase) {
      const key = apiKeys.currency;
      let url = endpoints.currency.replace('[API_KEY]', key);
      if (selectedBase) {
        url = `${url}&base=${selectedBase}`;
      }

      fetch(url)
        .then(res => res.json())
        .then(json => {
          const { rates, base } = json || {};
          
          // get currency keys for use in selects if initial request (no seleted base value)
          const keys = Object.keys(rates);
          if (!selectedBase) {
            this.currencies = keys;
          }

          // get currency data in array format for use in main listings
          const ratesArr = keys.map(key => {
            const value = rates[key];
            return {
              currency: key,
              value
            };
          });
          this.rates = ratesArr;

          // set defaults on base and target
          this.base = base;

          // If we haven't set a target yet
          if (!this.target) {
            const firstRate = ratesArr[0];
            this.target = firstRate.currency;
          }
        });
    },
    baseUpdate(val) {
      this.base = val;
      this.getCurrencyData(val);
    },
    targetUpdate(val) {
      this.target = val;
    },
    switchCurrency() {
      const currentBase = this.base;
      const currentTarget = this.target;
      this.base = currentTarget;
      this.target = currentBase;
      this.getCurrencyData(currentTarget);
    }
  }
}
</script>

<style lang="scss">
</style>
