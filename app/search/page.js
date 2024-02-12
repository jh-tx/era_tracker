"use client"

import styles from "@/app/ui/search/search.module.css";
import { useState, useEffect } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [playersID, setPlayerID] = useState([]);
  const [playersData, setPlayerData] = useState([]);
  
  useEffect(() => {
    const fetchPlayerID = async () => {
      try {
        const res = await fetch("https://statsapi.mlb.com/api/v1/sports/1/players?season=2023");
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        setPlayerID(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlayerID();
  }, []);

  //const playersID = 594798;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://statsapi.mlb.com/api/v1/people/${playersID}?hydrate=stats(group=[pitching],type=[byDateRange],startDate=01/01/2023,endDate=06/01/2023,season=2023)`);
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        setPlayerData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [playersID]);


  const onChangeHandler = (event) => {
    setInput(event.target.value);
  };


  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Find user with the input name
    const user = playersData.people.find((playerData) => playerData.fullName.toLowerCase() === input.toLowerCase());
    console.log(user)
    // If user exists, set the name to input and display the ERA
    if (user) {
      setName(`ERA: ${user.stats[0].splits[0].stat.era}`);
    } else {
      // If user doesn't exist, display a message
      setName("User not found");
    }

    setInput("");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h1>ERA Lookup Tool</h1>
        <input type="text" placeholder="pitchers name.." value={input} name="pitcherName" onChange={onChangeHandler} className={styles.input} />
        <button type="submit" className={styles.button}>Search</button>
        <h2>{name}</h2>
      </form>
    </div>
  );
};

export default Search;
