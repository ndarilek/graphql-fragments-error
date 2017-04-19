<template>
  <component :is="output" :amount="value.amount"/>
</template>

<script>
import usd from "./usd"

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    output() {
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
