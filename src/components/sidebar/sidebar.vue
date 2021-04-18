<template>
  <section class="sidebar">
    <h2 class="visually-hidden">Currency Controls</h2>

    <form class="currency-control">

      <fieldset class="currency-control__fieldset currency-control__rates">
        <legend class="visually-hidden">Currency selection fields</legend>
        <div class="currency-control__selection">
          <label for="base-currency" class="currency-control__label">Base</label>
          <select class="currency-control__select" name="base-currency" id="base-currency" v-on:change="baseChange($event)">
            <option v-for="currency in currencyVals" :value="currency" :key="`base-currency-${currency}`" :selected="currency === baseVal">
              {{ currency }}
            </option>
          </select>
        </div>

        <button type="button" class="currency-control__switch" @click="handleSwitch">
          Switch
        </button>

        <div class="currency-control__selection">
          <label for="target-currency" class="currency-control__label">Target</label>
          <select class="currency-control__select" name="target-currency" id="target-currency" v-on:change="targetChange($event)">
            <option v-for="currency in currencyVals" :value="currency" :key="`target-currency-${currency}`" :selected="currency === targetVal">
              {{ currency }}
            </option>
          </select>
        </div>
      </fieldset>

      <fieldset class="currency-control__fieldset currency-control__calculation">
        <legend class="visually-hidden">Currency calculation field and result</legend>
        
        <div class="currency-control__target">
          <label for="currency-calculation-input" class="currency-control__label">Amount</label>
          <input
            name="currency-calculation-input"
            id="currency-calculation-input"
            class="currency-control__calculation-input"
            type="text"
            pattern="[0-9]{1,5}"
            placeholder="100"
            v-on:input="handleInputChange"
            v-model="conversionAmount"
          />
        </div>

        <div class="currency-control__calculation-results" v-if="conversionAmount && conversionResult">
          <span class="currency-control__calculation-base">{{ conversionAmount }} {{ baseVal }} = </span>
          <span class="currency-control__calculation-target">{{ conversionResult }} {{ targetVal }}</span>
        </div>
      </fieldset>

    </form>
  </section>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    ratesArr: Array,
    base: String,
    target: String,
    ratesObj: Object
  },
  data: function () {
    return {
      conversionAmount: 1,
      conversionResult: null,
    }
  },
  updated() {
    this.calculateTargetAmount(this.conversionAmount);
  },
  computed: {
    baseVal() {
      return this.base;
    },
    targetVal() {
      return this.target;
    },
    currencyVals() {
      const keys = Object.keys(this.ratesObj);
      return keys;
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
    },
    handleInputChange (event) {
      const val = event?.target?.value || '';
      const numberVal = val.replace(/[^0-9.]/g, '');
      this.conversionAmount = numberVal;
      this.calculateTargetAmount(numberVal);
    },
    calculateTargetAmount (amount) {
      // get converted value
      const target = this.target;
      const ratesObj = this.ratesObj;
      const targetVal = ratesObj[target];
      
      if (!targetVal || !amount) {
        return;
      }

      const result = (targetVal * amount).toFixed(2);
      this.conversionResult = result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../globalStyles/variables.scss";

.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $brand-color-e;
  border-radius: 4px;
  padding: $vr * 4 $ggw / 2;
  margin-bottom: $vr * 4;

  @media #{$bp-d} {
    padding: $vr * 4 $ggw;
    margin-bottom: 0;
  }
}

.currency-control {
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media #{$bp-b} {
    flex-direction: row;
  }

  @media #{$bp-d} {
    flex-direction: column;
  }
}

.currency-control__fieldset {
  display: flex;
  flex-direction: column;

  @media #{$bp-b} {
    align-items: flex-end;
  }
}

.currency-control__rates {

  @media #{$bp-d} {
    margin-bottom: $vr * 6;
  }
}

.currency-control__switch {
  padding: $vr * 2 $ggw;
  background-color: $brand-color-a;
  color: $white;
  border-radius: 5px;
  transition: background-color 150ms ease-in-out;

  &:hover,
  &:focus {
    background-color: $brand-color-b;
  }
}

.currency-control__selection {
  display: flex;
  margin-bottom: $vr * 3;
}

.currency-control__switch {
  margin-bottom: $vr * 3;
  order: 2;

  @media #{$bp-b} {
    order: revert;
  }
}

.currency-control__label {
  font-size: 20px;
  line-height: $vr * 4;
  margin-right: 5px;
}

.currency-control__select {
  min-width: 100px;
  flex: 1;
}

.currency-control__target {
  display: flex;
  margin-bottom: $vr * 2;

  @media #{$bp-d} {
    margin-bottom: $vr * 15;
  }
}

.currency-control__calculation-results {
  display: flex;
  flex-direction: column;
}

.currency-control__calculation-input {
  width: 100px;
  flex: 1;

  @media #{$bp-d} {
    width: auto;
  }
}

.currency-control__calculation-base {
  font-size: 20px;
  line-height: $vr * 4;
  text-align: end;
}

.currency-control__calculation-target {
  font-size: 45px;
  line-height: $vr * 8;
  text-align: end;
}

</style>
