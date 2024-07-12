import { useEffect, useState } from "react";
import TransactionCard from "../component/TransactionCard";
import styles from "../component/TransactionList.module.css";
import Modal from "../component/Modal";
import ExpenseForm from "../component/ExpenseForm";
import Pagination from "../component/Pagination";

function TransactionList({
  transactions,
  title,
  editTransactions,
  mon,
  setMon,
}) {
  const [editId, setEditId] = useState(0);
  const [isDisplayEditor, setIsDisplayEditor] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const maxRecords = 3;
  const [totalPages, setTotalPages] = useState(0);

  const handleDelete = (id) => {
    const item = transactions.find((i) => i.id == id);
    const price = Number(item.price);
    setMon((prev) => prev + price);

    editTransactions((prev) => prev.filter((item) => item.id != id));
  };

  const handleEdit = (id) => {
    setEditId(id);
    setIsDisplayEditor(true);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * maxRecords;
    const endIndex = Math.min(currentPage * maxRecords, transactions.length);

    setCurrentTransaction([...transactions].slice(startIndex, endIndex));
    setTotalPages(Math.ceil(transactions.length / maxRecords));
  }, [currentPage, transactions]);

  useEffect(() => {
    if (totalPages < currentPage && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [totalPages]);

  return (
    <div className={styles.transactionWrapper}>
      {title && <h2>{title}</h2>}

      {transactions.length > 0 ? (
        <div className={styles.list}>
          <div>
            {currentTransaction.map((transaction) => (
              <TransactionCard
                details={transaction}
                key={transaction.id}
                handleDelete={handleDelete(transaction.id)}
                handleEdit={handleEdit(transaction.id)}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              updatePage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className={styles.emptyTransactionWrapper}>
          <p>No transactions!</p>
        </div>
      )}

      <Modal isOpen={isDisplayEditor}  setIsOpen={setIsDisplayEditor}>
        <ExpenseForm
            editId={editId}
            expenseList={transactions}
            setExpenseList={editTransactions}
            setIsOpen={setIsDisplayEditor}
            mon={mon}
            setMon={setMon}
            />
      </Modal>
    </div>
  );
}

export default TransactionList;
