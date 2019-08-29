import React from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
    storefrontAccessToken: "29799d7e46c520f8339de48e7940ac1b",
    domain: "mato-industries.myshopify.com",
})

global.client = client;

export const defaultStoreContext = {
    client,
    adding: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {},
    addVariantToCart: () => { console.log("default add") },
    removeLineItem: () => { },
    updateLineItem: () => { },
}

const StoreContext = React.createContext(defaultStoreContext)

export default StoreContext