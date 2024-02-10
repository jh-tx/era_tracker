"use client"

import styles from "@/app/ui/search/search.module.css"
//import {pushId, submitId} from "../lib/actions";
import { useState } from "react";



const Search = () => {
  const [input, setInput] = useState("")
  const [name,setName] = useState("")
  //pushId(2)
  const changeName = (event,newName) =>{
    event.preventDefault()
    setName(newName)
  }

  const onChangeHandler = (event) => {
    console.log({event:event.target.value})
    setInput(event.target.value)
  }

  const onSubmitHandler = (event) => {
    changeName(event, input)
    setInput("")
  }

  return (
       <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmitHandler}>
                <h1>ERA Lookup Tool</h1>
                <label for="slider">ERA Calculation Window:</label>
                <input type="range" id="slider" name="slider" min="1" max="20" value= "5"></input>
                <input type="text" placeholder="search by pitcher name.." value={input} name="pitcherName" onChange={onChangeHandler} className={styles.input}/>
                <button type="submit" className={styles.button}>Search</button>
                <h2>ERA: {name}</h2>
            </form>
        </div>
  );
}

export default Search;