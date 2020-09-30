import React, { Component } from 'react'
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap"
import numberWithCommas from "../utils/utils"
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar';
import swal from "sweetalert"
import axios from "axios"
import { api_url } from "../utils/constant"

export default class Hasil extends Component {

    state = {
        showModal: false,
        keranjangDetail: false,
        jumlah: 0,
        keterangan: '',
        totalBayar: 0
    }

    handleShow = (keranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: keranjang,
            jumlah: keranjang.jumlah,
            keterangan: keranjang.keterangan,
            totalBayar: keranjang.totalHarga
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalBayar: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }

    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalBayar: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
            })
        }
    }

    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.handleClose();

        const data = {
            jumlah: this.state.jumlah,
            totalHarga: this.state.totalBayar,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        }

        axios.put(api_url + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then(res => {
                this.props.getListKeranjang();
                swal({
                    title: "Update Pesanan",
                    text: "Update Pesanan " + data.product.nama,
                    icon: "success",
                    button: false,
                    timer: 800
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    hapusPesanan = (id) => {
        this.handleClose();

        axios.delete(api_url + "keranjangs/" + id)
            .then(res => {
                this.props.getListKeranjang();
                swal({
                    title: "Hapus Pesanan Sukses",
                    text: "Hapus Pesanan Sukses " + this.state.keranjangDetail.product.nama,
                    icon: "error",
                    button: false,
                    timer: 1000
                });
            })
            .catch(err => {
                console.log(err);
            })
    }



    render() {

        const { keranjangs } = this.props;
        return (
            <Col md={3} mt="2">
                <h4 className="mt-4">
                    <strong>Hasil</strong>
                </h4>
                <hr />
                {keranjangs.lenght !== 0 &&
                    <Card className="overflow-auto hasil">

                        <ListGroup variant="flush">
                            {keranjangs.map(keranjang => (
                                <ListGroup.Item key={keranjang.id} onClick={() => this.handleShow(keranjang)}>
                                    <Row>
                                        <Col xs={2}>
                                            <h4>
                                                <Badge pill variant="success">
                                                    {keranjang.jumlah}
                                                </Badge>
                                            </h4>
                                        </Col>
                                        <Col>
                                            <h6>{keranjang.product.nama}</h6>
                                            <p>Rp. {numberWithCommas(keranjang.product.harga)}</p>
                                        </Col>
                                        <Col>
                                            <strong className="float-right">
                                                Rp. {numberWithCommas(keranjang.totalHarga)}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}

                            <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan} />
                        </ListGroup>
                    </Card>
                }

                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        )
    }
}
