import React, { useState } from "react";
import { Form, FormControl, Button, Row} from 'react-bootstrap';
import '../Styles/search.css';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import config from '../config/config';





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


  }

  return (
    <>
      <Form className="d-flex searchform" onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          {...register("username", { required: true })}
        />
        <Button type = "submit" style={{ backgroundColor: "white", border: "solid 1px #28a745", color: "#28a745" }}>Search</Button>
      </Form>

      <div className="dropdown">
        {filteredData.length != 0 && (
          <div className="dataResult">
            {filteredData.map((searchedWord => {
              return (
                <a href={"/profile/" + searchedWord.id}>
                <div className="dataItem">{searchedWord.name}</div>
                </a>
              );
            }))}
          </div>

        )}
      </div>
    </>
    
  )
}


export default Search;