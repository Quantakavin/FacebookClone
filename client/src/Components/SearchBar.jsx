import React, { useState } from "react";
import { Form, FormControl, Button, Row } from 'react-bootstrap';
import '../Styles/search.css';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import config from '../config/config';
import Fuse from 'fuse.js'


const Search = () => {
    const [filteredData, setFilteredData] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        axios.get(`${config.baseURL}/searchUser/${data.username}`)
            .then(response => {
                setFilteredData(response.data)
            }
            ).catch(error => {
                console.log("error in frontend")
                console.log(error);
            })
        console.log("psasa" + onSubmit)


    }

    const fuse = new Fuse(filteredData, {
        keys: [
            'name'
        ],
        includeScore: true
    })

    const results = fuse.search(filteredData);
    const searchResults = filteredData ? results.map(result => result.item) : filteredData;

    function handleOnSearch({ currentTarget = {} }) {
        const { value } = currentTarget;
        setFilteredData(value);
    }

    return (
        <>
            <div>
                <label> Search: </label>
                <input type='text' onChange={handleOnSearch}/>
            </div>

        </>
    )
}