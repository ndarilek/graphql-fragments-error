<template>
  <tr>
    <td>
      <select v-model="type" @change="reset">
        <option value="fixed">Fixed</option>
        <option value="time">Time</option>
      </select>
    </td>
    <td><input type="text" v-model="value.item"/></td>
    <td><input type="text" v-model="value.notes"/></td>
    <td><input type="number" v-model="value.hours" min="0" v-if="isTime"/></td>
    <td><currency-input v-model="value.rate" v-if="isTime"/></td>
    <td>
      <currency :value="totalTime" v-if="isTime"/>
      <currency-input v-model="value.total" v-else/>
    </td>
    <td><button class="btn" @click.prevent="remove">Remove</button></td>
  </tr>
</template>

<script>
import {mapMutations} from "vuex"
import Currency from "~components/currency"
import CurrencyInput from "~components/currency/input"
import {total} from "~/lib/line-item"

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    currencyCode: {
      type: String,
      default: "USD"
    }
  },
  data: () => ({
    type: "time"
  }),
  methods: {
    ...mapMutations({
      removeLineItem: "invoices/removeLineItem",
    }),
    remove() {
      this.removeLineItem(this.index)
    },
    reset() {
      if(this.type == "fixed") {
        this.$delete(this.value, "hours")
        this.$delete(this.value, "rate")
        this.$set(this.value, "total", {code: this.currencyCode, amount: 0})
      } else {
        this.$delete(this.value, "total")
        this.$set(this.value, "hours", 0)
        this.$set(this.value, "rate", {code: this.currencyCode, amount: 0})
      }
    }
  },
  computed: {
    isTime() {
      console.log("isTime", this.type == "time")
      return this.type == "time"
    },
    totalTime() {
      return total(this.value)
    }
  },
  components: {
    Currency,
    CurrencyInput
  }
}
</script>
