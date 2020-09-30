import React, { Component } from 'react'
import { Col, ListGroup } from "react-bootstrap"
import { api_url } from "../utils/constant"
import axios from "axios"

// Memanggil FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

const Icon = ({ nama }) => {
    if (nama === "Makanan")
        return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
    if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
    if (nama === "Cemilan")
        return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    // Mengambil API Categories
    componentDidMount() {
        axios.get(api_url + "categories")
            .then(res => {
                const categories = res.data;
                this.setState({ categories })
            })
            .catch(err => {
                console.log(err);
            })
    }



    render() {
        const { categories } = this.state;
        const { changeCategory, categoriYangDipilih } = this.props;
        return (
            <Col md={2} mt="2">
                <h4 className="mt-4"> <strong>Daftar Kategori</strong> </h4>
                <hr />
                <ListGroup>
                    {categories && categories.map(category => (
                        <ListGroup.Item key={category.id} onClick={() => changeCategory(category.nama)} className={categoriYangDipilih === category.nama && "category-active"} style={{ cursor: 'pointer' }} >
                            <h5>
                                <Icon nama={category.nama} /> {category.nama}
                            </h5>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col >
        )
    }
}
