import * as React from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box } from "@mui/system";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}

const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer >
    <QuickSearchToolbar />
    <GridToolbarColumnsButton ref={setFilterButtonEl} sx={{ color: "black", fontWeight: 800,marginLeft:'auto' }} />
    <GridToolbarFilterButton /> 
    <GridToolbarExport sx={{ color: "black", fontWeight: 800 }} />
    {/* <GridToolbar  ref={setFilterButtonEl}/> */}
    {/* <GridToolbarFilterButton ref={setFilterButtonEl} /> */}
    <input type="date" />
  </GridToolbarContainer>
);

CustomToolbar.propTypes = {
  setFilterButtonEl: PropTypes.func.isRequired,
};

export default function BasicExampleDataGrid() {
  const columns = [
    {
      field: "createdAt",
      headerName: "CREATED AT",
      headerClassName: "super-app-theme--header",
      width: 130,
    },
    {
      field: "CustomerId",
      headerName: "CUSTOMER ID",
      headerClassName: "super-app-theme--header",
      width: 130,
    },
    {
      field: "name",
      headerName: "NAME",
      headerClassName: "super-app-theme--header",
      width: 160,
    }, //   valueGetter: getFullName,
  ];

  const rows = [
    { id: 1, createdAt: "17-08-2022", CustomerId: 100, name: "pavan" },
    { id: 2, createdAt: "15-08-2022", CustomerId: 101, name: "kuchana" },
    { id: 3, createdAt: "12-08-2022", CustomerId: 102, name: "shades" },
  ];

  const [filterButtonEl, setFilterButtonEl] = React.useState(null);

  return (
    <Box
      style={{ height: 500, width: "80%" }}
      sx={{
        "& .super-app-theme--header": {
          backgroundColor: "grey",
          color: "black",
          fontWeight: 600,
        },
      }}
    >
      {/* <DataGrid components={{ Toolbar: GridToolbar }} /> */}
      <DataGrid
        rows={rows}
        columns={columns}
        // components={{ Toolbar: GridToolbar }}
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          panel: {
            anchorEl: filterButtonEl,
          },

          toolbar: {
            setFilterButtonEl,
          },
        }}
        sx={{ backgroundColor: "white", border: "2px solid red" }}
      />
    </Box>
  );
}
