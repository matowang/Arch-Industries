import React from 'react'
import Client from 'shopify-buy'

import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const client = Client.buildClient({
    storefrontAccessToken: publicRuntimeConfig.SHOPIFY_ACCESS_TOKEN,
    domain: publicRuntimeConfig.SHOPIFY_DOMAIN,
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