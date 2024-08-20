import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

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
  const [returnData, setReturnData] = useState(null);
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
        <h3>Upload</h3>
        <form onSubmit={handleFileSubmit}>
          <input type="file" required onChange={handleFile} />
          <button type="submit">UPLOAD</button>
          {typeError && (
            <div role="alert">{typeError}</div>
          )}
        </form>

        {/* view data */}
        <div>
          {dataJSON ? (
            <h1>Uploaded</h1>
          ) :
            <h6>Submit By Clicking Upload</h6>
          }
        </div>
      </div>
    </div>
  );
}

export default Sheet;
