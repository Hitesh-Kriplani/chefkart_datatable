import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, darken, lighten } from '@mui/material';

const DataTable = ({ collection, columns }) => {
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
};

export default DataTable;
