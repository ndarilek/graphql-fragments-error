<template>
  <div>
    <h1>New Invoice</h1>
    <form @submit.prevent="save">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Type</th>
              <th>Item</th>
              <th>Notes</th>
              <th>Hours</th>
              <th>Hourly Rate</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody class="table-striped" v-if="hasLineItems">
            <template v-for="item, index in invoice.lineItems">
              <line-item-input v-model="item" :index="index" :currencyCode="currencyCode" :key="index"/>
            </template>
          </tbody>
        </table>
      </div>
      <button class="btn" @click.prevent="addLineItem">Add Line Item</button>
      <button type="submit" class="btn btn-default">Save</button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex"
import Currency from "~components/currency"
import LineItemInput from "~components/line-item/input"

export default {
  methods: {
    ...mapActions({
      saveDraftInvoice: "invoices/saveDraftInvoice",
      initDraft: "invoices/initDraft"
    }),
    ...mapMutations({
      addLineItemToState: "invoices/addLineItem",
      updateDraft: "invoices/updateDraft"
    }),
    addLineItem() {
      this.addLineItemToState("USD")
    },
    save() {
      this.saveDraftInvoice()
      .then(() => {
        this.$router.push({name: "invoices-id", params: {id: this.invoice.id}})
        this.initDraft()
      })
    }
  },
  computed: {
    ...mapState({
      draft: ({invoices}) => invoices.draft
    }),
    ...mapGetters({
      hasLineItems: "invoices/hasLineItems"
    }),
    invoice: {
      get() { return this.draft },
      set(value) { this.updateDraft(value) }
    }
  },
  created() {
    this.initDraft()
  },
  head: {
    title: "New Invoice"
  },
  components: {
    Currency,
    LineItemInput,
  }
}
</script>
