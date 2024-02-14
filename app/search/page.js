"use client"

import styles from "@/app/ui/search/search.module.css";
import { useState, useEffect } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [playersID, setPlayerID] = useState("");
  const [playersData, setPlayerData] = useState(null);

  // fetch players ID # based on user input
  useEffect(() => {
    const fetchPlayerID = async () => {
        try {
            const res = await fetch(`https://statsapi.mlb.com/api/v1/people/search?names=${input}`);
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

  // fetch specific pitcher ERA based on data range provided
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (playersID) {
          const res = await fetch(`https://statsapi.mlb.com/api/v1/people/${playersID}?hydrate=stats(group=[pitching],type=[byDateRange],startDate=${startDate},endDate=${endDate})`);
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

  const onStartDateChangeHandler = (event) => {
    setStartDate(event.target.value);
  };

  const onEndDateChangeHandler = (event) => {
    setEndDate(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Find pitcher with the input name
    const pitcher = playersData.people.find((playerData) => playerData.fullName.toLowerCase() === input.toLowerCase());
    // If pitcher exists, set the name to input and display the ERA
    try {
      setName(pitcher ? `${pitcher.fullName}'s ERA: ${pitcher.stats[0].splits[0].stat.era}` : "Player not found");
    } catch(error) {
      setName("No ERA Data Available For This Date Range");
    }
    setInput("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h1>ERA Lookup Tool</h1>
        <label htmlFor="startDate" className={styles.label}>Start Date:</label>
        <input type="date" value={startDate} id="startDate" className={styles.dates} name="startDate" min="1900-01-01" onChange={onStartDateChangeHandler} max="2024-12-31" required/>
        <label htmlFor="endDate" className={styles.label}>End Date:</label>
        <input type="date" value={endDate} id="endDate"  className={styles.dates} name="endDate" min="1900-01-01" onChange={onEndDateChangeHandler} max="2024-12-31" required/>
        <input type="text" placeholder="pitchers name.." value={input} name="pitcherName" onChange={onChangeHandler} className={styles.input} required/>
        <button type="submit" className={styles.button}>Search</button>
        <h2>{name}</h2>
      </form>
    </div>
  );
};

export default Search;
