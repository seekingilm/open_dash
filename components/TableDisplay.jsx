import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';

function TableDisplay({ tableData }) {
  const [apiData, setApiData] = useState([])

  const columns = [
    { field: 'abuse', headerName: 'Abuse Score', width: 130 },
    { field: 'ip', headerName: 'IP', width: 200 },
    { field: 'country', headerName: 'Country', type: 'number', width: 90, },
    { field: 'category', headerName: 'Category Of Abuse', width: 200 },
    { field: 'total', headerName: 'Total Reports', width: 130 },
    
  ];

  useEffect(() => {
    fetch('http://127.0.0.1:5000/table', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableData)
    }).then(res => res.json()).
      then(res => {
        if (res.constructor === Array) {
          setApiData(res)
        }
      })
  }, [tableData])



  return (
    <DataGrid
      rows={apiData}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
}

export default TableDisplay;
