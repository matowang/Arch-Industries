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
    console.log(this.context);
    console.log(this.props.products);
    return (
      <div>
        <ul>
          {this.props.products.map(({ id, descriptionHtml, images }) => (
            <div key={id}>
              {console.log(id)}
              <img src={images[0].src} />
              <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
              <BuyButton productID={id} addVariantToCart={() => this.context.addVariantToCart(id, 1)} />
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
