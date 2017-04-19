<template>
  <div>
    <invoice :id="$route.params.id"/>
  </div>
</template>

<script>
import Invoice from "~components/invoice"

export default {
  head() {
    return {
      title: `Invoice ${this.$route.params.id}`
    }
  },
  components: {
    Invoice
  }
}
</script>
