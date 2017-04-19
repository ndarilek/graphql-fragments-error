<template>
  <span>${{formattedAmount}}</span>
</template>

<script>

export default {
  props: {
    amount: {
      type: Number,
      default: () => 0.00
    }
  },
  computed: {
    formattedAmount() {
      return (this.amount/100).toFixed(2)
    }
  }
}
</script>
