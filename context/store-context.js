import React from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
    storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    domain: process.env.SHOPIFY_DOMAIN,
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