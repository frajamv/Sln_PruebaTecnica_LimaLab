import React, { Component } from 'react';
import { Button, Card, Row, Dropdown } from 'react-bootstrap';
import config from 'react-global-configuration';

export class Home extends Component {

    constructor() {
        super();
        this.state = ({
            products: [],
            filteredProducts: [],
            shoppingCart: [],
            currentFilter: 'Todos',
            loading: true
        });
    }

    componentDidMount() {
        this.populateProducts();
        this.loadCart();
    }

    async populateProducts() {
        const response = await fetch('home');
        const data = await response.json();
        this.setState({ products: data, filteredProducts: data, loading: false });
    }

    addToCart = (p) => {
        this.state.shoppingCart.push(p);
        config.set({ cart: this.state.shoppingCart });
    }

    loadCart() {
        try {
            this.setState({ shoppingCart: config.get('cart') });
        } catch (error) {
            this.setState({ shoppingCart: [] });
        }
    }

    filterProducts = () => {
        var filter = this.state.currentFilter;
        if (filter === "Todos") {
            this.setState({ filteredProducts: this.state.products });
        } else {
            if (filter === "Frutas") {
                filter = "Fruit";
            } else {
                filter = "Vegetable";
            }
            this.setState({
                filteredProducts: this.state.products.map((p) => {
                    if (p.category === filter) {
                        return p;
                    }
                })
            });
        }
        this.forceUpdate();
    }

    renderProducts = (products) => {
        return (
            <div>
                <Dropdown onClick={ this.filterProducts }>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        { this.state.currentFilter }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(data) => this.setState({ currentFilter: "Todos" })}>Todos</Dropdown.Item>
                        <Dropdown.Item onClick={(data) => this.setState({ currentFilter: "Frutas" })}>Frutas</Dropdown.Item>
                        <Dropdown.Item onClick={(data) => this.setState({ currentFilter: "Verduras" })}>Verduras</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Row>
                    {products[0] != null ? products.map((p) => {
                        return <Card key="prod" className='shadow-box-example z-depth-5' style={{ width: '20rem', margin: '10px' }}>
                            <Card.Img variant="top" src="https://exoticfruitbox.com/wp-content/uploads/2015/10/papaya-3-Exotic-500x500.jpg" />
                            <hr></hr>
                            <Card.Body>
                                <Card.Title>{p.description + ' ($' + p.price + ')'}</Card.Title>
                                <Card.Text>
                                    {p.category}
                                    <br></br>
                                    {p.stockAmount + ' en stock'}
                                </Card.Text>
                                {p.stockAmount > 1 ? <Button variant="primary" onClick={this.addToCart.bind(this, p)}>A&ntilde;adir al carrito</Button> : <Button variant="primary" onClick={this.addToCart.bind(this, p)} disabled>A&ntilde;adir al carrito</Button>}
                            </Card.Body>
                        </Card>
                    }): ''}
                </Row>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProducts(this.state.filteredProducts);

        return (<div>{contents}</div>)
    }
}
