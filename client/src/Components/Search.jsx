import React, { useState, useEffect } from "react";
import { Form, FormControl, Button, Row } from 'react-bootstrap';
import '../Styles/search.css';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import config from '../config/config';
import Fuse from 'fuse.js'


const Search = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [users, setusers] = useState();
  const [results, setresults] = useState([]);
  useEffect (async() =>{
    axios.get(`${config.baseURL}/searchUser/`)
    .then(response => {
      setusers(response.data)
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
 
  }, [])

  const fuse = new Fuse(users, {
    keys: [
    'name'
    ],
    includeScore: true
  })

 
  
  // searchResults = filteredData ? results.map(result => result.item) : filteredData;

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setFilteredData(value);
    setresults(fuse.search(filteredData))
    console.log(results)
  }

  return (
    <>
      <div>
        <label> Search: </label>
        <input type='text' onChange={handleOnSearch} />
      </div>
      <div>
            <div className="dropdown">
         {results.length != 0 && (
          <div className="dataResult">
            {results.map((user => {
              return(
                <a href={"/profile/" + user.item.id}>
                <div className="dataItem">{user.item.name}</div>
                </a>
              )
            }))}
          </div>
      
         )}
         </div>
         </div>

      
    </>

  )
}

export default Search;