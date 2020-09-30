import React, { Component } from 'react'
import { Badge, Col, ListGroup, Row } from "react-bootstrap"
import numberWithCommas from "../utils/utils"
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar';

export default class Hasil extends Component {

    state = {
        showModal: false,
        keranjangDetail: false,
        jumlah: 0,
        keterangan: ''
    }

    handleShow = (keranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: keranjang,
            jumlah: keranjang.jumlah,
            keterangan: keranjang.keterangan
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1
        })
    }

    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1
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

        console.log(this.state.keterangan);
    }



    render() {

        const { keranjangs } = this.props;
        return (
            <Col md={3} mt="2">
                <h4>
                    <strong>Hasil</strong>
                </h4>
                <hr />
                {keranjangs.lenght !== 0 &&
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

                        <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} />
                    </ListGroup>
                }

                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        )
    }
}
