import React, { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'

import fetch from 'isomorphic-unfetch';

import Layout from '../layout/layout'
import BuyButton from '../components/buy-button';

import Client from 'shopify-buy';
const client = Client.buildClient({
  domain: process.env.SHOPIFY_URL,
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOCKEN
});

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.products);
    return (
      <Layout>
        <ul>
          {this.props.products.map(({ id, descriptionHtml, images }) => (
            <div key={id}>
              <img src={images[0].src} />
              <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
              <BuyButton productID={id} addVariantToCart={this.addVariantToCart} />
            </div>
          ))}
        </ul>
        <style jsx>{`
          img {
            object-fit: contain;
            width: 10em;
            height: 10em;
          }
        `}</style>
      </Layout>
    );
  }
}

Home.getInitialProps = async () => {
  const products = await global.client.product.fetchAll();
  console.log(products);
  return { products };
}

export default Home
