import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import numberWithCommas from "../utils/utils"
import axios from "axios";
import { api_url } from "../utils/constant"


export default class TotalBayar extends Component {

    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }

        axios.post(api_url + "pesanans", pesanan)
            .then(res => {
                this.props.history.push('/sukses')
            })
    }

    render() {
        const totalBayar = this.props.keranjangs.reduce((result, item) => {
            return result + item.totalHarga;
        }, 0)

        return (
            <div className="fixed-bottom ">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h5>Total Harga : <strong className="float-right mr-2"> Rp. {numberWithCommas(totalBayar)}</strong></h5>
                        <Button variant="primary" block className="mb-2 mt-4 mr-2" size="lg" onClick={() => this.submitTotalBayar(totalBayar)}>
                            <strong>Bayar</strong>
                        </Button>
                    </Col>
                </Row>
            </div >
        )
    }
}
