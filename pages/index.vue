<template>
  <div>
    <h1>Invoices</h1>
    <router-link :to="{name: 'invoices-new'}">New</router-link>
    <div class="table-responsive" v-if="invoices">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
          </tr>
        </thead>
        <tbody class="table-striped">
          <tr v-for="invoice in invoices">
            <td><router-link :to="{name: 'invoices-id', params: {id: invoice.id}}">{{invoice.id}}</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from "vuex"
import Currency from "~components/currency"

export default {
  computed: {
    ...mapGetters({
      invoices: "invoices/invoices"
    })
  },
  methods: mapActions({
    fetchInvoices: "invoices/fetchInvoices"
  }),
  mounted() {
    this.fetchInvoices()
  },
  components: {
    Currency
  },
  head: {
    title: "Invoices"
  }
}

</script>
