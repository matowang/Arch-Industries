import React from 'react';

export default class BuyButton extends React.Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
    }
    onClick = () => {
        // Create an empty checkout

    }
    componentDidMount() {
    }
    render() {
        return <button onClick={this.props.addVariantToCart} >
            Add to cart
            </button>;
    }
}