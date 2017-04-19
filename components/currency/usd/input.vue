<template>
  <span>$<input type="number" v-model="formattedValue" @blur="input($event.target.value)" min="0"/></span>
</template>

<script>

export default {
  props: {
    value: {
      type: Number,
      default: () => 0.00
    }
  },
  computed: {
    formattedValue() {
      return (this.value/100).toFixed(2)
    }
  },
  methods: {
    input(value) {
      let amount = parseInt(parseFloat(value)*100)
      if(amount)
        this.$emit("input", amount)
    }
  }
}
</script>
