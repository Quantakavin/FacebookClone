import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from 'axios';
import config from '../config/config';


function Search({ placeholder }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        let searchWord = event.target.value;
        axios.get(`${config.baseURL}/searchUser/${searchWord}`)
            .then(response => {
                setFilteredData(response.data)
                //console.log("you are user " + localStorage.getItem('user_id'))
                //console.log(response.data)
                //setUserProfile(response.data)
                //if (localStorage.getItem("user_id") == match.params.id) {
                //    setInput({ name: response.data.name, bio: response.data.bio })
                //}
            }
            ).catch(error => {
                console.log("error in frontend")
                console.log(searchWord)
                console.log(error);
            })
        // setWordEntered(searchWord);
        const newFilter = filteredData.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        }
        else {
            setFilteredData(newFilter)
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter} />
                <div className="searchIcon">
                    {filteredData.length === 0 ? (<SearchIcon />
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />)}
                </div>
            </div>
            {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.map((searchedWord => {
                        return (
                            <div>{searchedWord.name}</div>

                        );
                    }))}
                </div>

            )}
        </div>
    )

}

export default Search;