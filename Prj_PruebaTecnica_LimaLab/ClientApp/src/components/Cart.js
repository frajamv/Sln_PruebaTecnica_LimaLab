import React, { Component } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import config from 'react-global-configuration';


export class Cart extends Component {

    constructor() {
        super();
        this.state = ({
            shoppingCart: [],
            loading: true
        });
    }

    loadCart() {
        try {
            this.setState({shoppingCart: config.get('cart')});
        } catch (error) {
            this.setState({shoppingCart: []});
        }
    }

    componentDidMount() {
        this.loadCart();
    }

    saveSell = async () => {
        var sc = this.state.shoppingCart;
        console.log(sc);
        const response = await fetch('cart', {
            method: 'POST', body: JSON.stringify(sc), headers: {
                "Content-Type": "application/json"}});
        const res = await response.json();
        if (res.ok) {
            this.setState({ shoppingCart: [] });
            config.set({ cart: []});
        }
    }

    render() {
        return (
            <div>
                <Button style={{
                    margin: '10px'
                }} variant="primary" onClick={ this.saveSell }>Comprar</Button>
                <Button variant="danger" >Limpiar carrito</Button>
                <Row>
                    {this.state.shoppingCart != null ? this.state.shoppingCart.map((p, i) => {
                        return <Card key={p.productID + i} className='shadow-box-example z-depth-5' style={{ width: '20rem', margin: '10px' }}>
                            <Card.Img variant="top" src="https://exoticfruitbox.com/wp-content/uploads/2015/10/papaya-3-Exotic-500x500.jpg" />
                            <hr></hr>
                            <Card.Body>
                                <Card.Title>{p.description}</Card.Title>
                                <Card.Text>
                                    $ {p.price}
                                    <br></br>
                                    {p.category}
                                </Card.Text>
                                <Button variant="primary" onClick={console.log(p)}>Quitar del carrito</Button>
                            </Card.Body>
                        </Card>
                    }): 'No hay productos en el carrito.'}
                </Row>
            </div>
        );
    }
}
