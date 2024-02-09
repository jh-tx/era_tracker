import styles from "@/app/ui/search/search.module.css"
import {pushId, submitId} from "../lib/actions";



const Search = async () => {
  const pitcherName = pushId(4)
  return (
       <div className={styles.container}>
            <form action={submitId} className={styles.form}>
                <h1>ERA Lookup Tool</h1>
                <p>{pitcherName}</p>
                <input type="text" placeholder="search by pitcher name.." className={styles.input} name="id"/>
                <button className={styles.button}>Search</button>
            </form>
        </div>
  );
}

export default Search;
