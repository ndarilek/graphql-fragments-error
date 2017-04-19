import _ from "lodash"
import {total as lineItemTotal} from "./line-item"

export const totalCurrency = (invoice) => {
  const amount = _.sum(invoice.lineItems.map((v) => lineItemTotal(v).amount))
  const {code} = lineItemTotal(invoice.lineItems[0])
  return {code, amount}
}

export const totalHours = (invoice) => {
  return _.sum(
    invoice.lineItems.map((v) => {
      const hours = parseFloat(v.hours)
      if(!hours)
        return 0
      else
        return hours
    })
  )
}
