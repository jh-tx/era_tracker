"use client"

import styles from "@/app/ui/search/search.module.css";
import { useState, useEffect } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [sliderValue, setSliderValue] = useState(5);
  const [playersData, setPlayerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://statsapi.mlb.com/api/v1/people/594798");
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        console.log(data)
        setPlayerData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const onChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Find user with the input name
    const user = playersData.people.find((playerData) => playerData.firstName.toLowerCase() === input.toLowerCase());

    // If user exists, set the name to input and display the ERA
    if (user) {
      setName(`ERA: ${user.lastName}`);
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
        <label htmlFor="eraWindowSlider">Calculation Window(days): {sliderValue}</label>
        <input type="range" id="eraWindowSlider" name="eraWindowSlider" min="1" max="20" value={sliderValue} onChange={handleSliderChange} list="markers" />
        <datalist className={styles.datalist} id="markers">
          <option className={styles.option} value="1" label="1"></option>
          <option className={styles.option} value="5" label="5"></option>
          <option className={styles.option} value="10" label="10"></option>
          <option className={styles.option} value="15" label="15"></option>
          <option className={styles.option} value="20" label="20"></option>
        </datalist>
        <input type="text" placeholder="pitchers name.." value={input} name="pitcherName" onChange={onChangeHandler} className={styles.input} />
        <button type="submit" className={styles.button}>Search</button>
        <h2>{name}</h2>
      </form>
    </div>
  );
};

export default Search;
