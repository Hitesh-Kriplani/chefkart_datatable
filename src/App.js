import React, { useEffect, useState } from 'react';
import './App.css';
import Papa from 'papaparse';
import { DataGrid } from '@mui/x-data-grid';
import { Box, darken, lighten } from '@mui/material';

async function GetData() {
  const data = Papa.parse(await fetchCsv());
  let x = data.data;
  return x;
}

async function fetchCsv() {
  const response = await fetch('data/MOCK_DATA (1).csv');
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder('utf-8');
  const csv = await decoder.decode(result.value);
  return csv;
}

function App() {
  const [collection, setCollection] = useState([]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'first_name', headerName: 'First Name', width: 90 },
    { field: 'last_name', headerName: 'Last Name', width: 90 },
    { field: 'email', headerName: 'Email', width: 260 },
    { field: 'gender', headerName: 'Gender', width: 110 },
    { field: 'ip_address', headerName: 'IP Address', width: 140 },
    { field: 'airport code', headerName: 'Airport Code', width: 100 },
    { field: 'time', headerName: 'Time', width: 100 },
    { field: 'status', headerName: 'Status', width: 65 },
    { field: 'mobile', headerName: 'Contact Number', width: 120 },
    { field: 'area', headerName: 'Area', width: 200 },
    { field: 'show', headerName: 'Show', width: 65 },
    { field: 'edit', headerName: 'Edit', width: 65 },
  ];
  useEffect(() => {
    GetData().then((res) => {
      getCollection(res);
    });
  }, []);
  const getCollection = (rec) => {
    const len = rec.length;
    const temp = [];
    if (rec) {
      let header = rec[0];
      for (let i = 1; i < len; i++) {
        let curr = {};
        rec[i].forEach((el, index) => {
          let key = header[index];
          curr[key] = ['status', 'show', 'edit'].includes(key)
            ? rec[i][index].toUpperCase()
            : rec[i][index];
        });
        if (curr['id'] !== '') temp.push(curr);
      }
      setCollection(temp);
    }
  };
  const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

  const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        '& .super-app-theme--TRUE': {
          bgcolor: (theme) =>
            getBackgroundColor(theme.palette.success.main, theme.palette.mode),
          '&:hover': {
            bgcolor: (theme) =>
              getHoverBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode
              ),
          },
        },
        '& .super-app-theme--FALSE': {
          bgcolor: (theme) =>
            getBackgroundColor(theme.palette.warning.main, theme.palette.mode),
          '&:hover': {
            bgcolor: (theme) =>
              getHoverBackgroundColor(
                theme.palette.warning.main,
                theme.palette.mode
              ),
          },
        },
      }}
    >
      {collection && (
        <DataGrid
          rows={collection}
          columns={columns}
          pageSize={10}
          autoHeight={true}
          checkboxSelection
          getRowClassName={(params) => `super-app-theme--${params.row.status}`}
        />
      )}
    </Box>
  );
}

export default App;
