import React,{useState,useEffect} from "react";
import "./Countriessearch.css";

const CountrySearch=()=>{
const[countries,setCountries]=useState([]);
const[FilteredCountries,setFilteredCountries]=useState([]);
const[searchCountry,setSearchCountry]=useState();
const handleSearch=(element)=>{
    const filteredCountry=countries.filter((country)=>country.name.common.toLowerCase().includes(searchCountry.toLowerCase()));
    const LimitedFilteredCountry =
      searchCountry.toLowerCase() === "ind"
        ? filteredCountry.filter((country) =>
            ["India", "Indonesia", "British Indian Ocean Territory"].includes(country.name.common)
          ):filteredCountry;
    
          setFilteredCountries(LimitedFilteredCountry);
}


useEffect(()=>{
    async function fetchData(){
        const response=await fetch("https://restcountries.com/v3.1/all");
        const res=await response.json();
        setCountries(res);
    }
    fetchData();
    
},[countries]);
    return(
        <div className="mainbox">
            <input type="text" placeholder="Search for countries" onChange={(e) => {
            setSearchCountry(e.target.value)
            handleSearch(e.target.value)
        }}/>
            <div className="countrybox">
                 { FilteredCountries.length>0  ?  

                    ( FilteredCountries.map((country)=>{
                        return(
                        <div className="countryCard">
                            <img src={country.flags.png} alt={country.name.common} width={100} height={100} style = {{"margin":"5px"}} />
                            <h5 style = {{"margin":"3px"}} >{country.name.common}</h5>
                        </div>
                        )
                    })
                    ):
                    (
                        countries.map((country)=>{
                            return(
                            <div className="countryCard">
                                <img src={country.flags.png} alt={country.name.common} width={100} height={100} style = {{"margin":"5px"}} />
                                <h5 style = {{"margin":"3px"}} >{country.name.common}</h5>
                            </div>
                            ) 
                        })
                    )
                 }
                    
                 
            </div>
        </div>
    )
}
export default CountrySearch;