import styles from "./TransactionCard.module.css";
import { IoMdCloseCircularOutline } from "react-icon/io";
import { PiPizza, PiGift } from "react-icons/pi";
import { BsSuitcase2 } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";

function TransactionCard({ details, handleDelete, handleEdit }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIn}>
        <div className={styles.cardIcon}>
          {details.category == "food" && <PiPizza />}
          {details.category == "entertainment" && <PiGift />}
          {details.category == "travel" && <BsSuitcase2 />}
        </div>
        <div className={styles.cardInfo}>
          <h5>{details.title}</h5>
          <p>{details.date}</p>
        </div>
      </div>

      <div className={styles.cardInner}>
        <p className={styles.cardPrice}>{`₹${details.price}`}</p>
        <div className={styles.cardButtonWrapper}>
          <button className={styles.cardDelete} onClick={handleDelete}>
            <IoMdCloseCircularOutline />
          </button>
          <button className={styles.cardEdit} onClick={handleEdit}>
            <MdOutlineModeEdit />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;
