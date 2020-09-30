import React, { Component } from 'react'
import axios from "axios"
import swal from "sweetalert"
import { Row, Col, Container } from 'react-bootstrap';
import { api_url } from "../utils/constant"
import { Hasil, ListCategory, Menus } from '../Components';

export default class Home extends Component {

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

        this.getListKeranjang();
    }


    // componentDidUpdate(prevState) {
    //     if (this.state.keranjangs !== prevState.keranjangs) {
    //         axios.get(api_url + "keranjangs")
    //             .then(res => {
    //                 const keranjangs = res.data;
    //                 this.setState({ keranjangs })
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }
    // }

    getListKeranjang = () => {
        axios.get(api_url + "keranjangs")
            .then(res => {
                const keranjangs = res.data;
                this.setState({ keranjangs })
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
                            this.getListKeranjang();
                            swal({
                                title: "Sukses Masuk Keranjang",
                                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                                icon: "success",
                                button: false,
                                timer: 1000
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
                                timer: 1000
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
            <main>
                <div className="mt-2">
                    <Container fluid>
                        <Row>
                            <ListCategory changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih} />
                            <Col>
                                <h4 className="mt-4"> <strong>Daftar Produk</strong> </h4>
                                <hr />
                                <Row className="overflow-auto menu">
                                    {menus && menus.map(menu => (
                                        <Menus
                                            menu={menu} key={menu.id}
                                            masukKeranjang={this.masukKeranjang}
                                        />
                                    ))}
                                </Row>
                            </Col>
                            <Hasil keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang} />
                        </Row>
                    </Container>
                </div>
            </main>
        )
    }
}
