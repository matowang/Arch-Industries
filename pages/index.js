import React, { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'

import fetch from 'isomorphic-unfetch';

import Layout from '../layout/layout'
import BuyButton from '../components/buy-button';

import StoreContext from '../context/store-context'

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = StoreContext;

  render() {
    return (
      <div>
        <ul>
          {this.props.products.map(({ id, descriptionHtml, images, variants: [{ id: variantID }] }) => (
            <div key={id}>
              {console.log(variantID)}
              <img src={images[0].src} />
              <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
              <BuyButton productID={id} addVariantToCart={() => this.context.addVariantToCart(variantID, 1)} />
            </div>
          ))}
        </ul>
        <h2>Cart</h2>
        <ul>
          {
            this.context.checkout.lineItems.map(({ title, quantity }) =>
              <li>
                <h4>{title}</h4>
                <div>{quantity}</div>
              </li>
            )
          }
        </ul>
        <button onClick={() => window.open(this.context.checkout.webUrl)}>Checkout</button>
        <style jsx>{`
          img {
            object-fit: contain;
            width: 10em;
            height: 10em;
          }
        `}</style>
      </div>
    );
  }
}

Home.getInitialProps = async () => {
  const products = await global.client.product.fetchAll();
  console.log(products);
  return { products };
}

export default Home
