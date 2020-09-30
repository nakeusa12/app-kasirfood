import React, { Component } from 'react'
import { Badge, Col, ListGroup, Row } from "react-bootstrap"
import numberWithCommas from "../utils/utils"
import TotalBayar from './TotalBayar';

export default class Hasil extends Component {
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
                            <ListGroup.Item key={keranjang.id}>
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
                    </ListGroup>
                }

                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        )
    }
}
