import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import { NavbarComp, Home, Hasil, ListCategory, Menus } from './Components';
import { api_url } from "./utils/constant"
import axios from "axios"

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
    }
  }

  componentDidMount() {
    axios.get(api_url + "products?category.nama=" + this.state.categoriYangDipilih)
      .then(res => {
        const menus = res.data;
        this.setState({ menus })
      })
      .catch(err => {
        console.log(err);
      })
  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });

    axios.get(api_url + "products?category.nama=" + value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus })
      })
      .catch(err => {
        console.log(err);
      })
  }


  render() {
    const { menus, categoriYangDipilih } = this.state;
    return (
      <BrowserRouter>
        <NavbarComp />
        <div className="mt-2">
          <Container fluid>
            <Row>
              <ListCategory changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih} />
              <Col>
                <h4> <strong>Daftar Produk</strong> </h4>
                <hr />
                <Row>
                  {menus && menus.map(menu => (
                    <Menus
                      menu={menu} key={menu.id}
                    />
                  ))}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}
