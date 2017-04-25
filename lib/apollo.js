import ApolloClient, {createNetworkInterface} from "apollo-client"

const uri = process.BROWSER_BUILD ? "/api" : "http://127.0.0.1:8000/api"

const networkInterface = createNetworkInterface({
  uri,
  opts: {
    credentials: "same-origin"
  }
})

export const apolloClient = new ApolloClient({
  networkInterface,
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "INTERFACE",
          name: "LineItem",
          possibleTypes: [{name: "FixedLineItem"}, {name: "TimeLineItem"}]
        }
      ]
    }
  }
})
