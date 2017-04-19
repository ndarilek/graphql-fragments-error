import bodyParser from "body-parser"
import Promise from "bluebird"
import {exec} from "child_process"
import Express from "express"
import {GraphQLScalarType} from "graphql"
import {Kind} from "graphql/language"
import {graphiqlExpress, graphqlExpress} from "graphql-server-express"
import {makeExecutableSchema} from "graphql-tools"
import "isomorphic-fetch"
import _ from "lodash"
import mkdirp from "mkdirp"
import Datastore from "nedb"
import Nuxt from "nuxt"

import {dbDir, staticDir} from "./lib/dirs"
import {totalCurrency, totalHours} from "./lib/invoice"
import {total as lineItemTotal} from "./lib/line-item"

const Invoices = Promise.promisifyAll(new Datastore({
  filename: `${dbDir}/invoices`,
  autoload: true
}))

const typeDefs = `

enum CurrencyCode {
  USD
}

type Currency {
  code: CurrencyCode!
  amount: Float!
}

input CurrencyInput {
  code: CurrencyCode!
  amount: Float!
}

interface LineItem {
  item: String!
  notes: String!
  total: Currency!
}

type FixedLineItem implements LineItem {
  item: String!
  notes: String!
  total: Currency!
}

type TimeLineItem implements LineItem {
  item: String!
  notes: String!
  hours: Int!
  rate: Currency!
  total: Currency!
}

input LineItemInput {
  item: String!
  notes: String!
  hours: Int
  rate: CurrencyInput
  total: CurrencyInput
}

type Invoice {
  id: String!
  lineItems: [LineItem]
}

input InvoiceInput {
  lineItems: [LineItemInput]
}

type Query {
  invoice(id: String!): Invoice
  invoices: [Invoice]
}

type Mutation {
  newInvoice(invoice: InvoiceInput!): Invoice!
}

schema {
  query: Query
  mutation: Mutation
}

`

const resolvers = {
  Invoice: {
    id: (doc) => doc._id
  },
  LineItem: {
    __resolveType(obj, context, info) {
      console.log("obj", obj)
      if(obj.hours != null)
        return "TimeLineItem"
      console.log("Fixed")
      return "FixedLineItem"
    }
  },
  TimeLineItem: {
    total: (doc) => lineItemTotal(doc)
  },
  Query: {
    invoice: (doc, {id}) => Invoices.findOneAsync({_id: id}),
    invoices: () => Invoices.findAsync({}),
  },
  Mutation: {
    async newInvoice(root, {invoice}) {
      return Invoices.insertAsync(invoice)
    }
  }
}

const app = new Express()

const server = require("http").createServer(app)
const host = process.env.HOST || "0.0.0.0"
const port = process.env.PORT || "8000"

app.set("port", port)

const schema = makeExecutableSchema({resolvers, typeDefs})

const formatError = console.error

app.use(
  "/api",
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {sandstorm: req.sandstorm},
    formatError,
  }))
)

app.use("/graphiql", graphiqlExpress({
  endpointURL: "/api"
}))

// Import and Set Nuxt.js options
let config = require("./nuxt.config.js")
config.dev = !(process.env.NODE_ENV === "production")

// Init Nuxt.js
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}

server.listen(port, host)
