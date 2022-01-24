import React, { useState, useEffect } from "react";
import { Form, FormControl, Button, Row } from 'react-bootstrap';
import '../Styles/search.css';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import config from '../config/config';
import Fuse from 'fuse.js'
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";


const Search = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [users, setusers] = useState();
  const [results, setresults] = useState([]);

  useEffect(async () => {
    axios.get(`${config.baseURL}/searchUser/`)
      .then(response => {
        setusers(response.data)
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })

  }, [filteredData])

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
    setresults(fuse.search(value))
    console.log(results)
  }

  const clearInput = () => {
    setFilteredData("");
    setresults([]);
  };

  return (
    <>
      <div className="search">
        <div className="searchInputs">
        <input
          type="text"
          // value={filteredData}
          onChange={handleOnSearch}
        />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {/* <div className="dropdown"> */}
          {results.length != 0 && (
            <div className="dataResult">
              {results.filter((user)=>user.score < 0.5).map((user => {
                return (
                  <a className="dataItem" href={"/profile/" + user.item.id}>
                    <div >{user.item.name}</div>
                  </a>
                );
              }))}
            </div>

          )}
      </div>
      {/* </div> */}



    </>

  )
}

export default Search;