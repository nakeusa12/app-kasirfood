import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { api_url } from "../utils/constant";

export default class Sukses extends Component {
    componentDidMount() {
        axios
            .get(api_url + "keranjangs")
            .then((res) => {
                const keranjangs = res.data;
                keranjangs.map(function (item) {
                    return axios
                        .delete(api_url + "keranjangs/" + item.id)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error))
                })
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    }

    render() {
        return (
            <div className="mt-4 text-center">
                <Image src="assets/images/sukses.png" width="500" />
                <h2>Sukses Pesan</h2>
                <p>Terimakasih Sudah Memesan!</p>
                <Button variant="primary" as={Link} to="/">
                    Kembali
                </Button>
            </div>
        );
    }
}