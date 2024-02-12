"use client"

import styles from "@/app/ui/search/search.module.css";
import { useState, useEffect } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [playersID, setPlayerID] = useState("");
  const [playersData, setPlayerData] = useState(null);
  
  useEffect(() => {
    const fetchPlayerID = async () => {
        try {
            const res = await fetch(`https://statsapi.mlb.com/api/v1/people/search?names=${encodeURIComponent(input)}`);
            if (!res.ok) {
                throw new Error("Something went wrong");
            }
            const data = await res.json();
            
            if (data.people && data.people.length > 0) {
                const firstPlayerId = data.people[0].id;
                setPlayerID(firstPlayerId);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchPlayerID();
}, [input]);

  //const playersID = 594798;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (playersID) {
          const res = await fetch(`https://statsapi.mlb.com/api/v1/people/${playersID}?hydrate=stats(group=[pitching],type=[byDateRange],startDate=01/01/2023,endDate=06/01/2023,season=2023)`);
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const data = await res.json();
          setPlayerData(data);
        }
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
    // If user exists, set the name to input and display the ERA
    if (user) {
      setName(`${user.fullName}'s ERA: ${user.stats[0].splits[0].stat.era}`);
    } else {
      // If user doesn't exist, display a message
      setName("Player not found");
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
