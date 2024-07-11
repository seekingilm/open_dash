import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import Charts from './Charts'
import World from '../components/World'
import Dash from '../components/Dash'
import Ipchart from "./Ipchart"

function helpLoop(ajson, nameOfColumn) {
  let cleanedUpList = [];
  for (let key in ajson) {
    key = ajson[key][nameOfColumn]
    cleanedUpList.push(key)
  }

  return cleanedUpList;
}


function Sheet() {
  const [excelFile, setExcelFile] = useState(null);
  const [dataJSON, setDataJSON] = useState(null);
  const [typeError, setTypeError] = useState(null);

  const [excelData, setExcelData] = useState(null);
  let apiKey = '9caf023f75484c2315dc7cac2fa8f980e2728d1a0f69ccdc679f722c694185349e82b4be5e20c76c'

  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        }
      }
      else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else {
      console.log('Please select your file');
    }
  }

  useEffect(() => {
    fetch('http://127.0.0.1:5000/data', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataJSON)
    })
  }, [dataJSON])

  const handleFileSubmit = (e) => {
    e.preventDefault();

    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setDataJSON(data)
      
      setExcelData(data.slice(0, 10));
    }
  }

  return (
    <div>
      <div>
        <h3>Upload & View Excel Sheets</h3>
        <form onSubmit={handleFileSubmit}>
          <input type="file" required onChange={handleFile} />
          <button type="submit">UPLOAD</button>
          {typeError && (
            <div role="alert">{typeError}</div>
          )}
        </form>

        {/* view data */}

        <div className="viewer">
          {excelData ? (
            <div>
              <table>
                <thead>
                  <tr>
                    {Object.keys(excelData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {excelData.map((individualExcelData, index) => (
                    <tr key={index}>
                      {Object.keys(individualExcelData).map((key) => (
                        <td key={key}>{individualExcelData[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No File is uploaded yet!</div>
          )}
        </div>

        <div>
          {dataJSON ? (
            <h1>All IPs</h1>
          ) :
            <h6>no data</h6>
          }
        </div>
      </div>
    </div>
  );
}

export default Sheet;
