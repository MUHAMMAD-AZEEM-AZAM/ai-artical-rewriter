import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InfoIcon from '@mui/icons-material/Info';
import RemoveIcon from '@mui/icons-material/Remove';
import ReplayIcon from '@mui/icons-material/Replay';
import { Button, Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import TextEditor from '../../components/TextEditor/TextEditor';
import { articleType, size } from '../../constants';
import styles from './Home.module.css';
const Home = () => {
  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
    input3: '',
  });

  const [showInput3, setShowInput3] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [combinedData, setCombinedData] = useState('');

  // const handleInputChange = (event, fieldName) => {
  //   if (isEditable) {
  //     setInputValues({
  //       ...inputValues,
  //       [fieldName]: event.target.value,
  //     });
  //   }
  // };
  const handleInputChange = (event, fieldName) => {
    if (isEditable) {
      let value = event.target.value;
      // Truncate the input if it exceeds 1000 words
      if (value.split(/\s+/).length > 1000) {
        value = value.split(/\s+/).slice(0, 1000).join(' ');
      }
      setInputValues({
        ...inputValues,
        [fieldName]: value,
      });
    }
  };

  const combineInputValues = async () => {
    if (isEditable) {
      const inputData = {
        input1: inputValues.input1 || '',
        input2: inputValues.input2 || '',
        input3: showInput3 ? inputValues.input3 || '' : '',
      };


      try {
        const response = await fetch('https://demo.sohailca.com/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputData),
        });

        const data = await response.json();
        if (response.ok) {
          setCombinedData(data.generated_text); // Set generated text in state
        } else {
          // Handle errors if needed
          console.error('Error:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }

      setIsEditable(false); // Disable editability after submission
    }

    setIsButtonClicked(true); // Set the button clicked state
    setIsEditable(false); // Disable editability after submission
  };

  const toggleInput3 = () => {
    setShowInput3(!showInput3);
  };

  const addAgain = () => {
    setIsEditable(true);
    setInputValues({
      input1: '',
      input2: '',
      input3: '',
    });
  };

  return (
    <div>
      <div className="container mt-4 ">
        <div className={styles.heading}>AI Text Merger</div>
        <div className={styles.description}>
          For Content Creators and Bloggers
        </div>
        <div className="d-flex flex-column flex-md-row flex-column-reverse border border-2 shadow p-4 mb-5 bg-body rounded my-4">
          <div className="d-none d-md-block d-flex flex-row flex-wrap flex-md-column gap-4 col col-md-2 p-4 ">
            <div className="d-flex gap-1 align-items-center w-100">
              <TextField
                id="outlined-select-post-type"
                select
                label="Select Type"
                // defaultValue="Blog"
                // helperText="Please select your Post type"
                size="small"
                className="w-100"
                defaultValue={articleType[3].value}
              >
                {articleType.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    // defaultValue={articleType[3].value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Tooltip title="Post type" placement="top-start">
                <InfoIcon fontSize="10px" />
              </Tooltip>
            </div>

            <div className="d-flex gap-1 align-items-center w-100 mt-3">
              <TextField
                id="outlined-select-Length"
                select
                label="Select Length"
                size="small"
                className="w-100"
                defaultValue={size[1].value}
              >
                {size.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Tooltip title="Select Your Action" placement="top-start">
                <InfoIcon fontSize="10px" />
              </Tooltip>
            </div>

            <div className="d-flex flex-row flex-md-column">
              <FormControlLabel
                control={<Checkbox />}
                label="Add Heading"
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 20 },
                  '& .MuiFormControlLabel-label': { fontSize: 14 },
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Add List"
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 20 },
                  '& .MuiFormControlLabel-label': { fontSize: 14 },
                }}
              />
            </div>
          </div>

          <div className="accordion d-md-none" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Advanced Options
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className=" d-flex flex-row flex-wrap flex-md-column gap-4 col col-md-2 p-4 ">
                    <div className="d-flex gap-1 align-items-center w-100">
                      <TextField
                        id="outlined-select-post-type"
                        select
                        label="Select Type"
                        defaultValue={articleType[3].value}
                        // helperText="Please select your Post type"
                        size="small"
                        className="w-100"
                      >
                        {articleType.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <Tooltip title="Post type" placement="top-start">
                        <InfoIcon fontSize="10px" />
                      </Tooltip>
                    </div>

                    <div className="d-flex gap-1 align-items-center w-100 mt-3">
                      <TextField
                        id="outlined-select-Length"
                        select
                        label="Select Length"
                        defaultValue={size[1].value}
                        // helperText="Please select your Length"
                        size="small"
                        className="w-100"
                      >
                        {size.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <Tooltip title="Select Your Action" placement="top-start">
                        <InfoIcon fontSize="10px" />
                      </Tooltip>
                    </div>

                    <div className="d-flex flex-row flex-md-column">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Add Heading"
                        sx={{
                          '& .MuiSvgIcon-root': { fontSize: 20 },
                          '& .MuiFormControlLabel-label': { fontSize: 14 },
                        }}
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Add List"
                        sx={{
                          '& .MuiSvgIcon-root': { fontSize: 20 },
                          '& .MuiFormControlLabel-label': { fontSize: 14 },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input fields */}
          <div className="col col-md-10  p-3   ">
            <div>
              <div className="d-flex flex-column flex-md-row align-items-center">
                <TextField
                  label="Text 1"
                  multiline
                  rows={4}
                  value={inputValues.input1}
                  className="w-100"
                  // className="col-12 col-md-12"
                  onChange={(event) => handleInputChange(event, 'input1')}
                  disabled={!isEditable} // Disable input if not editable
                />
                <div className="d-none d-md-block">
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: 30,
                      paddingInline: 25,
                      paddingTop: 10,
                      paddingBottom: 10,
                      backgroundColor: 'black',
                      fontSize: 15,
                      marginBottom: 20,
                      marginLeft: 10,
                      height: 50,
                    }}
                    startIcon={<CloudUploadIcon />}
                  >
                    PDF
                  </Button>
                </div>
              </div>
              <div className={styles.wordCount}>
                Word Limit :{' '}
                {
                  inputValues.input1
                    .trim()
                    .split(/\s+/)
                    .filter((word) => word !== '').length
                }
                /1000
              </div>
            </div>

            <div>
              <div className="d-flex align-items-center">
                <TextField
                  label="Text 2"
                  multiline
                  rows={4}
                  value={inputValues.input2}
                  className="w-100 mt-4"
                  onChange={(event) => handleInputChange(event, 'input2')}
                  disabled={!isEditable} // Disable input if not editable
                />
                <div className="d-none d-md-block">
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: 30,
                      paddingInline: 25,
                      paddingTop: 10,
                      paddingBottom: 10,
                      backgroundColor: 'black',
                      fontSize: 15,
                      marginBottom: 20,
                      marginLeft: 10,
                      height: 50,
                    }}
                    startIcon={<CloudUploadIcon />}
                  >
                    PDF
                  </Button>
                </div>
              </div>
              <div className={styles.wordCount}>
                Word Limit :{' '}
                {
                  inputValues.input2
                    .trim()
                    .split(/\s+/)
                    .filter((word) => word !== '').length
                }
                /1000
              </div>
            </div>

            {showInput3 && (
              <div>
                <div className="d-flex align-items-center">
                  <TextField
                    label="Text 3"
                    multiline
                    rows={4}
                    value={inputValues.input3}
                    className="w-100 mt-4"
                    onChange={(event) => handleInputChange(event, 'input3')}
                    disabled={!isEditable} // Disable input if not editable
                  />
                  <div className="d-none d-md-block">
                    <Button
                      variant="contained"
                      style={{
                        borderRadius: 30,
                        paddingInline: 25,
                        paddingTop: 10,
                        paddingBottom: 10,
                        backgroundColor: 'black',
                        fontSize: 15,
                        marginBottom: 20,
                        marginLeft: 10,
                        height: 50,
                      }}
                      startIcon={<CloudUploadIcon />}
                    >
                      PDF
                    </Button>
                  </div>
                </div>
                <div className={styles.wordCount}>
                  Word Limit :{' '}
                  {
                    inputValues.input3
                      .trim()
                      .split(/\s+/)
                      .filter((word) => word !== '').length
                  }
                  /1000
                </div>
              </div>
            )}

            <div className="d-flex flex-column flex-md-row mt-4 mt-md-0 gap-3 justify-content-center ">
              <Button
                variant="contained"
                onClick={combineInputValues}
                style={{
                  borderRadius: 30,
                  paddingInline: 25,
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: 'black',
                  fontSize: 15,
                  opacity: isButtonClicked ? 0.25 : 1,
                }}
              >
                Submit
              </Button>

              <Button
                variant="contained"
                onClick={toggleInput3}
                startIcon={showInput3 ? <RemoveIcon /> : <AddIcon />}
                style={{
                  borderRadius: 30,
                  paddingInline: 25,
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: 'black',
                  fontSize: 15,
                }}
              >
                {showInput3 ? 'remove' : 'Add More'}
              </Button>

              <Button
                variant="contained"
                style={{
                  borderRadius: 30,
                  paddingInline: 25,
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: 'black',
                  fontSize: 15,
                }}
                startIcon={<ReplayIcon />}
                onClick={addAgain}
              >
                Add Again
              </Button>
            </div>
          </div>
        </div>
        {/* Input fields */}

        {<TextEditor combinedData={combinedData} inputs={inputValues} />}
        {/* <TextEditor /> */}
      </div>
    </div>
  );
};

export default Home;
