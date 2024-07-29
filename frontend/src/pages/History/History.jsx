import {React ,useEffect}from 'react';
import styles from './History.module.css';
import { useHistoryContext } from "../../hooks/useHistoryContext";
import { useAuthContext } from '../../hooks/useAuthContext';
import HistoryDetails from '../../components/HistoryDetail/HistoryDetail';

const History = () => {

  const {history, dispatch} = useHistoryContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch('/history', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_HISTORY', payload: json})
      }
    }

    if (user) {
      fetchHistory()
    }
  }, [dispatch, user])

  
  return (
    <div className="container mt-3 ">
      <div className={styles.heading}>AI Text Merger</div>
      <div className={styles.description}></div>
      <div
    className="accordion accordion-flush w-75"
    id="accordionFlushExample"
  >
     {
          history && history.map((history)=>(
          <HistoryDetails key={history._id} history={history}/>)
          )
        }
  </div>
     
     
    </div>
  );
};

export default History;
