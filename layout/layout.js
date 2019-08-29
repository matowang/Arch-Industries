import React from 'react'

import StoreContext, { defaultStoreContext } from '../context/store-context'

class Layout extends React.Component {
    state = {
        store: {
            ...defaultStoreContext,
            addVariantToCart: (variantId, quantity) => {
                if (variantId === '' || !quantity) {
                    console.error('Both a size and quantity are required.')
                    return
                }

                this.setState(state => ({
                    store: {
                        ...state.store,
                        adding: true,
                    },
                }))

                const { checkout, client } = this.state.store
                const checkoutId = checkout.id
                const lineItemsToUpdate = [
                    { variantId, quantity: parseInt(quantity, 10) },
                ]
                console.log(`Adding ${quantity} of product ${variantId}...`)
                return client.checkout
                    .addLineItems(checkoutId, lineItemsToUpdate)
                    .then(checkout => {
                        console.log("Variant added");
                        this.setState(state => ({
                            store: {
                                ...state.store,
                                checkout,
                                adding: false,
                            },
                        }))
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            },
            removeLineItem: (client, checkoutID, lineItemID) => {
                return client.checkout
                    .removeLineItems(checkoutID, [lineItemID])
                    .then(res => {
                        this.setState(state => ({
                            store: {
                                ...state.store,
                                checkout: res,
                            },
                        }))
                    })
            },
            updateLineItem: (client, checkoutID, lineItemID, quantity) => {
                const lineItemsToUpdate = [
                    { id: lineItemID, quantity: parseInt(quantity, 10) },
                ]

                return client.checkout
                    .updateLineItems(checkoutID, lineItemsToUpdate)
                    .then(res => {
                        this.setState(state => ({
                            store: {
                                ...state.store,
                                checkout: res,
                            },
                        }))
                    })
            },
        },
    }

    async initializeCheckout() {
        // Check for an existing cart.
        const isBrowser = typeof window !== 'undefined'
        const existingCheckoutID = isBrowser
            ? localStorage.getItem('shopify_checkout_id')
            : null

        const setCheckoutInState = checkout => {
            if (isBrowser) {
                localStorage.setItem('shopify_checkout_id', checkout.id)
            }

            this.setState(state => ({
                store: {
                    ...state.store,
                    checkout,
                },
            }))
        }

        const createNewCheckout = () => global.client.checkout.create()
        const fetchCheckout = id => global.client.checkout.fetch(id)

        if (existingCheckoutID) {
            console.log("Fetching existing checkout...");
            try {
                const checkout = await fetchCheckout(existingCheckoutID)

                // Make sure this cart hasn’t already been purchased.
                if (!checkout.completedAt) {
                    setCheckoutInState(checkout)
                    return
                }
            } catch (e) {
                localStorage.setItem('shopify_checkout_id', null)
            }
        }

        console.log("Creating new checkout...");

        const newCheckout = await createNewCheckout()
        setCheckoutInState(newCheckout)
    }

    componentDidMount() {
        this.initializeCheckout()
            .catch(err => {
                console.error("Something went wrong with initializing checkout");
                console.error(err);
            })
    }

    render() {
        const { children } = this.props

        return (
            <StoreContext.Provider value={this.state.store}>
                <div
                    style={{
                        margin: `0 auto`,
                        maxWidth: 960,
                        padding: `0px 1.0875rem 1.45rem`,
                        paddingTop: 0,
                    }}
                >
                    {children}
                </div>
            </StoreContext.Provider>
        )
    }
}

export default Layout