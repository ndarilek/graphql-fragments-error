export const total = (item) => {
  if(item.rate) {
    const code = item.rate.code
    let amount = parseInt(item.rate.amount)
    if(!amount)
      amount = 0
    amount = amount*parseFloat(item.hours)
    if(!amount)
      amount = 0
    return {code, amount}
  } else if(item.total)
    return item.total
  else
    return null
}
