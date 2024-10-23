// import React,{useState,useEffect} from "react";
 import "./Countriessearch.css";

// const CountrySearch=()=>{
// const[countries,setCountries]=useState([]);
// const[FilteredCountries,setFilteredCountries]=useState([]);
// const[searchCountry,setSearchCountry]=useState();

//     const filteredCountry= searchCountry ? countries.filter((country)=>country.name.common.toLowerCase().includes(searchCountry.toLowerCase())):null;
//     setFilteredCountries(filteredCountry);



// useEffect(()=>{
//     async function fetchData(){
//         const response=await fetch("https://restcountries.com/v3.1/all");
//         const res=await response.json();
//         setCountries(res);
//         setFilteredCountries(res);
//     }
//     fetchData();
    
// },[countries]);
//     return(
//         <div className="mainbox">
//             <input type="text" placeholder="Search for countries" onChange={(e) => {
//             setSearchCountry(e.target.value)
            
//         }}/>
//             <div className="countrybox">
//                  { FilteredCountries.length ?  

//                     ( FilteredCountries.map((country)=>{
//                         return(
//                         <div className="countryCard">
//                             <img src={country.flags.png} alt={country.name.common} width={100} height={100} style = {{"margin":"5px"}} />
//                             <h5 style = {{"margin":"3px"}} >{country.name.common}</h5>
//                         </div>
//                         )
//                     })
//                     ):
//                     (
//                         countries.map((country)=>{
//                             return(
//                             <div className="countryCard">
//                                 <img src={country.flags.png} alt={country.name.common} width={100} height={100} style = {{"margin":"5px"}} />
//                                 <h5 style = {{"margin":"3px"}} >{country.name.common}</h5>
//                             </div>
//                             ) 
//                         })
//                     )
//                  }
                    
                 
//             </div>
//         </div>
//     )
// }
// export default CountrySearch;

import React, {useEffect, useState} from 'react';

const CountrySearch = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchQuery, setSearchQuery] = useState("");
    const countriesStyle = {
        "display": "flex",
        "flexWrap": "wrap",
        "justifyContent": "center",
        "alignItems": "center",
    }
    const countryStyle = {
        "textAlign" : "center",
        "border": "1px solid grey",
        "margin": "10px",
        "flexBasis": "10%"
    };
    const searchStyle = {
        "margin": "20px",
        "width": "50%",
        "padding": "10px",
        "position": "relative",
        "left": "20%",
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [countries, setCountries]= useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
    const handleSearch = (searchQuery) => {
        
        const filtered = countries.filter((country) => {
            return country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setCountries(filtered);
    }
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchData = async() =>{
            try{
                const response = await fetch("https://restcountries.com/v3.1/all");
                const data = await response.json();
                setCountries(data);
            }
            catch (error){
                console.log("Failed to fetch country")
                console.error("Failed to fetch countries",error);
            }
        };
         fetchData();
    }, []);

    return (
        <>
        <input style={searchStyle} type="search" name="search" placeholder="Search for countries" onChange={(e) => {
            setSearchQuery(e.target.value)
            handleSearch(e.target.value)
        }}
        />
        <div style={countriesStyle}>
            {countries.map((country)=>{
                return (
                    // <Country name={country.name} flags={country.flags}/>

                        <div style={countryStyle} className="countryCard">
                            <img src={country.flags.png} alt={country.name.common} width={100} height={100} style = {{"margin":"5px"}} />
                            <h5 style = {{"margin":"3px"}} >{country.name.common}</h5>
                        </div>

                )
            })}
        </div>
        </>
    )

}

export default CountrySearch;