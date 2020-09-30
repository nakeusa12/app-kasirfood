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
import swal from "sweetalert"

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: []
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

    axios.get(api_url + "keranjangs")
      .then(res => {
        const keranjangs = res.data;
        this.setState({ keranjangs })
      })
      .catch(err => {
        console.log(err);
      })
  }


  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios.get(api_url + "keranjangs")
        .then(res => {
          const keranjangs = res.data;
          this.setState({ keranjangs })
        })
        .catch(err => {
          console.log(err);
        })
    }
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


  masukKeranjang = (value) => {
    axios.get(api_url + "keranjangs?product.id=" + value.id)
      .then(res => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            totalHarga: value.harga,
            product: value
          }

          axios.post(api_url + "keranjangs", keranjang)
            .then(res => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 800
              });
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            totalHarga: res.data[0].totalHarga + value.harga,
            product: value
          }

          axios.put(api_url + "keranjangs/" + res.data[0].id, keranjang)
            .then(res => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 800
              });
            })
            .catch(err => {
              console.log(err);
            })


        }

      })
      .catch(err => {
        console.log(err);
      })

  }


  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
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
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} />
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
