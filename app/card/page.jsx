import PitcherScorecard from "../ui/pitcherScorecard/pitcherScorecard";
import styles from "@/app/ui/scorecard/scorecard.module.css"

const scorecard = () => {
    return (
        <div className={styles.container}>
            <PitcherScorecard/>
        </div>
    );
};

export default scorecard;
