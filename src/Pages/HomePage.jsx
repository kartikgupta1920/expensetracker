import React, { useEffect, useState } from "react";
import  Card  from "../component/Card/Card";
import styles from "./Homepage.module.css";
import TransactionList from "../component/TransactionList/TransactionList";
import ExpenseForm from "../component/ExpenseForm/ExpenseForm";
import Modal from "../component/Modal/Modal";
import AddBalanceFrom from "../component/AddBalanceForm/AddBalanceForm";
import PieChart from "../component/Charts/PieChartComponent";
import BarChart from "../component/Charts/BarChart";

export default function HomePage() {
  const [mon, setMon] = useState(0);
  const [spent, setSpent] = useState(0);
  const [spentList, setSpentList] = useState([]);
  const [isVolume, setIsVolume] = useState(false);

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

  useEffect(() => {
    const localMoney = localStorage.getItem("balance");

    if(localMoney){
      setMon(Number(localMoney));
    }else {
      setMon(5000);
      localStorage.setItem("mon", 5000);
    }

    const items = JSON.parse(localStorage.getItem("expenses"));

    setSpentList(items || []);
    setIsVolume(true)
  }, []);

  useEffect(() => {
    if(spentList.length > 0 || isVolume) {
      localStorage.setItem("spent", JSON.stringify(spentList))
    }
    if(spentList.length > 0){
      setSpent(
        spentList.reduce(
          (accumulator, currentValue) => 
            accumulator + Number(currentValue.price),
          0
        )
      );
    } else {
      setSpent(0);
    }

    let foodSpends = 0,
        entertainmentSpends = 0,
        travelSpends = 0;
    
        let foodCount = 0,
        entertainmentCount = 0,
        travelCount = 0;

        spentList.forEach((item) => {
          if(item.category == "food"){
            foodSpends += Number(item.price);
            foodCount++;
          }else if(item.category == "entertainment"){
            entertainmentSpends += Number(item.price);
            entertainmentCount++;
          }else if(item.category == "travel"){
            travelSpends += Number(item.price);
            travelCount++;
          }
        });

        setCategory({
          food: foodSpends,
          travel: travelSpends,
          entertainment: entertainmentSpends,
        }); 
        setCountOfCategory({
          food: foodCount,
          travel: travelCount,
          entertainment: entertainmentCount,
        });
  }, [spentList]);

  useEffect(() => {
    if(isVolume){
      localStorage.setItem("balance", mon);
    }
  }, [mon]);

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

      <Modal isOpen={isOpenSpent} setIsOpen={setIsOpenSpent}>
        <ExpenseForm
          setIsOpen={setIsOpenSpent}
          spentList={spentList}
          setSpentList={setSpentList}
          setMon={setMon}
          mon={mon}
          />
      </Modal>

      <Modal isOpen={isOpenMoney} setIsOpen={setIsOpenMoney}>
        <AddBalanceFrom
           setIsOpen={setIsOpenMoney} setMon={setMon}
          />
      </Modal>

    
    </div>
  );
}
