<template>
  <component :is="input" v-model="value.amount""/>
</template>

<script>
import usd from "./usd/input"

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    input() {
      if(this.value.code == "USD")
        return usd
      else
        return null
    }
  },
  components: {
    usd
  }
}
</script>
