import { useHistoryContext } from '../../hooks/useHistoryContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import IconButton from '@mui/material/IconButton';
import styles from '../../pages/History/History.module.css';
import React, { useRef } from 'react';


const HistoryDetails = ({ history }) => {
//   const { dispatch } = useHistoryContext()
//   const { user } = useAuthContext()
  const inputs=history.input

//   const handleClick = async () => {
//     if (!user) {
//       return
//     }

//     const response = await fetch('/api/workouts/' + workout._id, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       }
//     })
//     const json = await response.json()

//     if (response.ok) {
//       dispatch({type: 'DELETE_WORKOUT', payload: json})
//     }
//   }

const textareaRef = useRef(null);

const handleCopy = () => {
  if (textareaRef.current) {
    textareaRef.current.select();
    document.execCommand('copy');
  }
};

function getFirstFiveWords(text) {
    const words = text.split(' ');
    return words.slice(0, 5).join(' ');
  }

  return (
<div className="accordion-item border border-secondary rounded p-1">
          <h2 className="accordion-header" id={`flush-heading${history._id}`}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#flush-collapse${history._id}`}
              aria-expanded="false"
              aria-controls={`flush-collapse${history._id}`}
            >
              <div className="d-flex flex-column">
                <div className={styles.date}>{history.date}</div>
                <div className={styles.title}>{getFirstFiveWords(history.output)}</div>
              </div>
            </button>
          </h2>
          <div
            id={`flush-collapse${history._id}`}
            className="accordion-collapse collapse"
            aria-labelledby={`flush-heading${history._id}`}
            data-bs-parent="#accordionFlushExample"
          >
           
            <div className="accordion-body ">
            {
              inputs[0] && inputs.map((input,index)=>(
                <div>
                     <div className={styles.fieldHeading}>Input-{index}</div>
              <textarea
                
                className="ms-5 mt-2 p-3 p-3"
                style={{ width: '90%', height: 120 }}
                readOnly
              >
                {input}
              </textarea>
                </div>
              ))
            }
              <div className="d-flex">
                <div className={styles.fieldHeading}>Output</div>
                <IconButton onClick={handleCopy} aria-label="copy">
                  <FileCopyIcon />
                </IconButton>
              </div>

              <textarea
                className="ms-5 mt-2 p-3"
                readOnly
                style={{ width: '90%', height: 120 }}
                ref={textareaRef}
              >
                {history.output}
              </textarea>
            </div>
          </div>
        </div>
  )
}

export default HistoryDetails