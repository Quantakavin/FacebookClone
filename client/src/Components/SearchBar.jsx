import React, {useState} from "react";

function Search({placeholder, data}){
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setShownData([]);
        }
        else { 
            setShownData(newShown)
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };
    
}