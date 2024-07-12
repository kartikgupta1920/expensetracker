import React, { useState } from "react";
import Card from "../component/Card";
import styles from "./Homepage.module.css";
import TransactionList from "../component/TransactionList";
import ExpenseForm from "../component/ExpenseForm";
import Modal from "../component/Modal";
import AddmonFrom from "../component/AddmonForm";
import PieChart from "../component/PieChartComponent";
import BarChart from "../component/BarChart";

export default function HomePage() {
  const [mon, setMon] = useState(0);
  const [spent, setSpent] = useState(0);
  const [spentList, setSpentList] = useState([]);
  const [volume, setVolume] = useState(false);

  const [isOpenSpent, setIsOpenSpent] = useState(false);
  const [isOpenMoney, setIsOpenMoney] = useState(false);

  const [category, setCategory] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  const [countOfcategory, setCountOfCategory] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  return (
    <div className={styles.container}>
      <hi>Expence Tracker</hi>

      <div className={styles.cardWrap}>
        <Card
          title="Wallet Balance"
          money={mon}
          buttonTest="+ Add income"
          buttonType="success"
          handleClick={() => {
            setIsOpenMoney(true);
          }}
        />

        <Card
          title="Expences"
          money={spent}
          buttonTest="+ Add Expence"
          buttonType="failure"
          handleClick={() => {
            setIsOpenSpent(true);
          }}
        />

        <PieChart 
            data={[
                {name: "Food", value: category.food},
                {name: "Entertainment", value: category.entertainment},
                {name: "Travel", value: category.travel},
            ]}
        />
      </div>

      <div className={styles.transactionWrap}>
        <TransactionList
            transactions={spentList}
            editTransactions={setSpentList}
            title="Recent Transactions"
            mon={mon}
            setmon={setMon}
        />

        <BarChart 
           data={[
            {name: "Food", value: category.food},
            {name: "Entertainment", value: category.entertainment},
            {name: "Travel", value: category.travel},
        ]}
        />
      </div>
    </div>
  );
}
