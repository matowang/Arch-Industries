import React from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
    storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    domain: process.env.SHOPIFY_URL,
})

global.client = client;

export const defaultStoreContext = {
    client,
    adding: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {},
    addVariantToCart: () => { },
    removeLineItem: () => { },
    updateLineItem: () => { },
}

const StoreContext = React.createContext(defaultStoreContext)

export default StoreContext