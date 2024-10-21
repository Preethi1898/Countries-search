import React,{useState,useEffect} from "react";
import "./Countriessearch.css";
const CountryCard=({country})=>{
    return (
     <div className="countryCard">
         <img src={country.flags.png} alt="flag"/>
         <p style={{paddingTop:"10px",textAlign:"center"}}>{country.name.common}</p>
     </div>
    )
 }
const CountriesSearch=()=>{
    const [countries,setCountries]=useState([]);
    const[filtered,setFiltered]=useState("");
    
    function handleChange(e){
        setFiltered(e.target.value);
    }
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
          .then((response) => response.json())
          .then((data) => setCountries(data))
          .catch((error) => console.error("Error fetching data: ", error));
      }, []);
      const filteredCountry=filtered ? countries.filter((country)=>country.name.common.toLowerCase().includes(filtered.toLowerCase())):null;
      
    return(
        <div>
            <input type="text" placeholder="Search for countries" onChange={handleChange}/>
        <div className="country">
           {filtered  ?
           (
                 filteredCountry.map((country)=>(
                    <CountryCard country={country}/>
                 ))
           ):
                (
                    countries.map((country)=>(
                       <CountryCard country={country}/>
                    ))
                )
            }             
            
        </div>
        </div>
    )
}
export default CountriesSearch;