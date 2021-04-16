<template>
  <section class="sidebar">
    <h2>Sidebar</h2>
    <select name="base-currency" id="base-currency" v-on:change="baseChange($event)">
      <option v-for="currency in currencyVals" :value="currency" :key="`base-currency-${currency}`" :selected="currency === baseVal">
        {{ currency }}
      </option>
    </select>

    <button type="button" class="btn-switch" @click="handleSwitch">
      Switch
    </button>

    <select name="target-currency" id="target-currency" v-on:change="targetChange($event)">
      <option v-for="currency in currencyVals" :value="currency" :key="`target-currency-${currency}`" :selected="currency === targetVal">
        {{ currency }}
      </option>
    </select>
  </section>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    currencies: Array,
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
    currencyVals() {
      return this.currencies;
    }
  },
  methods: {
    baseChange (event) {
      const val = event?.target?.value || '';
      if (val) {
        this.$emit('baseUpdate', val)
      }
    },
    targetChange (event) {
      const val = event?.target?.value || '';
      if (val) {
        this.$emit('targetUpdate', val)
      }
    },
    handleSwitch () {
      this.$emit('switchCurrency')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
}
</style>
