import FileCopyIcon from '@mui/icons-material/FileCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MUIRichTextEditor from 'mui-rte';
import React, { useEffect, useState } from 'react';
import styles from './TextEditor.module.css';
import { useHistoryContext } from "../../hooks/useHistoryContext"
import { useAuthContext } from '../../hooks/useAuthContext'

const TextEditor = React.memo(({ combinedData ,inputs}) => {
  const [data, setData] = useState();
  const [headingLevel, setHeadingLevel] = useState('header-six'); // Default heading level is h1
  const [checkPlagrisam, setcheckPlagrisam] = useState(false);
  const [checkSEO, setcheckSEO] = useState(false);
  const [keyword, setkeyword] = useState('');

  const { dispatch } = useHistoryContext()
  const { user } = useAuthContext()
  const [error, setError] = useState(null)

  useEffect(() => {
    setData({
      blocks: [
        {
          key: 'heading',
          text: 'Your Heading Here',
          type: headingLevel,
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: 'content',
          text: combinedData,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    });
  }, [combinedData, headingLevel]);

  // const save = (data) => {

  //   console.log(data);
  //   console.log('This 3 Fields data' + combinedData,inputs);
  // };


  const save = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }
    const inputValues = Object.values(inputs);

    //if third value is empty remove from array
    if(inputValues[2]===''){
      inputValues.pop()
    }
  const output = data.blocks.map((block) => block.text).join('\n');

    const history = {input:inputValues, output}

    const response = await fetch('http://localhost:4000/history', {
      method: 'POST',
      body: JSON.stringify(history),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      console.log(json.error)
      // setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      // setTitle('')
      // setLoad('')
      // setReps('')
      setError(null)
      // setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }


  const handleHeadingChange = (event) => {
    setHeadingLevel(event.target.value);
  };

  const myTheme = createTheme();
  Object.assign(myTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          display: 'inline-block',
          flexDirection: 'row',
          alignItems: 'center', // Align items in the center of the row
          marginTop: 5,
          width: '100%',
        },
        editor: {
          borderColor: 'lightgray',
          borderWidth: '2px',
          borderStyle: 'solid',
          padding: '20px',
          borderRadius: '10px',
        },
      },
    },
  });

  const handelCheckPlagiarism = () => {
    setcheckPlagrisam(true);
  };
  const handelCheckSEO = () => {
    setcheckSEO(true);
  };

  const handleCopy = () => {
    const emptyValue = {
      blocks: [
        {
          key: 'newBlock',
          text: 'sdas',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    };
    emptyValue.blocks = data.blocks;
    const textToCopy = JSON.stringify(emptyValue);
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <div className="d-flex flex-column flex-md-row mb-2">
      <div className="col col-md-9 border border-1  shadow-sm rounded-start">
        <div className={styles.editorBox}>
          <Select
            value={headingLevel}
            onChange={handleHeadingChange}
            style={{ height: 30, marginTop: 23, borderColor: 'none' }}
          >
            <MenuItem value="header-one">h1</MenuItem>
            <MenuItem value="header-two">h2</MenuItem>
            <MenuItem value="header-three">h3</MenuItem>
            <MenuItem value="header-four">h4</MenuItem>
            <MenuItem value="header-five">h5</MenuItem>
            <MenuItem value="header-six">h6</MenuItem>
          </Select>
          <ThemeProvider theme={myTheme}>
            <MUIRichTextEditor
              value={JSON.stringify(data)}
              label="Type something here..."
              onSave={save}
              inlineToolbar={false}
              controls={[
                'title',
                'copy',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'highlight',
                'undo',
                'redo',
                'link',
                'media',
                'numberList',
                'bulletList',
                'quote',
                'copy',
              ]}
              height="500px"
              className="w-100 bg-danger"
              customControls={[
                // Define a custom copy button for the toolbar
                {
                  name: 'copy',
                  icon: (
                    <FileCopyIcon
                      icon="file_copy"
                      tooltip="Copy"
                      onClick={handleCopy}
                    />
                  ),
                },
              ]}
            />
          </ThemeProvider>
        </div>

        <div className="d-flex justify-content-center gap-2 my-3">
          <Button
            variant="contained"
            onClick={save}
            style={{
              borderRadius: 30,
              paddingInline: 25,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: 'black',
              fontSize: 15,
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="col col-md-3 border border-1  shadow-sm rounded-end border-start-0 p-3">
        <div className="my-3">
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
            }}
            startIcon={checkPlagrisam && <ReplayIcon />}
            onClick={handelCheckPlagiarism}
          >
            Check Plagiarism
          </Button>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: '10%' }}
              aria-valuenow={10}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <h1 className="text-center">10 %</h1>
        </div>
        <div className="mt-4 pt-3 border-top">
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
              marginLeft: 50,
            }}
            startIcon={checkSEO && <ReplayIcon />}
            onClick={handelCheckSEO}
          >
            Check SEO
          </Button>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: '10%' }}
              aria-valuenow={10}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <h1 className="text-center">10 %</h1>

          {keyword.length < 4 && (
            <div style={{ fontSize: 12 }} className=" text-danger">
              Add keyword of at least 4 character
            </div>
          )}
        </div>

        <TextField
          label="Add Keyword"
          multiline
          value={keyword}
          className="w-100"
          onChange={(e) => setkeyword(e.target.value)}
        />

        <div className="shadow mt-3 fw-bold p-3  bg-body rounded">
          <div>Keyword Density = 10%</div>
        </div>
        <div className="shadow-sm  fw-bold p-3 mt-3 bg-body rounded">
          <div>Add More Keywords </div>
        </div>
        <div className="shadow-sm  fw-bold p-3 mt-3 bg-body rounded">
          <div>Add Keyword in Introduction</div>
        </div>
        <div className="shadow-sm  fw-bold p-3 mt-3 bg-body rounded">
          <div>Use keyword in headings</div>
        </div>
      </div>
    </div>
  );
});

export default TextEditor;
