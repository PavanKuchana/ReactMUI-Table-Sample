import * as React from "react";
import {
  DataGrid,
  getGridStringOperators,
  GridFilterPanel,
  GridLinkOperator,
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

import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Button } from "@mui/material";

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

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <QuickSearchToolbar />
    <GridToolbarColumnsButton
      ref={setFilterButtonEl}
      sx={{ color: "black", fontWeight: 800, marginLeft: "auto" }}
    />
    <GridToolbarFilterButton  />
    {/* <GridFilterPanel linkOperators={[GridLinkOperator.And, GridLinkOperator.Or]}/> */}
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
  const renderDetailsButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            alert("dkjnfvkn");
          }}
        >
          MORE
        </Button>
      </strong>
    );
  };
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
    },
    {
      field: "status",
      headerName: "STATUS",
      headerClassName: "super-app-theme--header",
      width: 160,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      headerClassName: "super-app-theme--header",
      width: 160,
      renderCell: renderDetailsButton,
    },
  ];

  const rows = [
    {
      id: 1,
      createdAt: "17-08-2022",
      CustomerId: 100,
      name: "pavan",
      status: "Open",
    },
    {
      id: 2,
      createdAt: "15-08-2022",
      CustomerId: 101,
      name: "kuchana",
      status: "Open",
    },
    {
      id: 3,
      createdAt: "12-08-2022",
      CustomerId: 102,
      name: "shades",
      status: "Open",
    },
    {
      id: 4,
      createdAt: "13-08-2022",
      CustomerId: 103,
      name: "gajini",
      status: "Open",
    },
    {
      id: 5,
      createdAt: "01-08-2022",
      CustomerId: 106,
      name: "Zink",
      status: "Open",
    },
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
        "& .super-app-theme--Open": {
          bgcolor: "red",
        },
      }}
    >
      {/* <DataGrid components={{ Toolbar: GridToolbar }} /> */}
      <DataGrid
        checkboxSelection
        disableColumnMenu={true}
        // autoPageSize={true}
        rows={rows}
        columns={columns}
        // components={{ Toolbar: GridToolbar }}
        components={{
          Toolbar: CustomToolbar,
          Pagination: CustomPagination,
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
        getRowClassName={(params) => `super-app-theme--${params.row.status}`}
      />
    </Box>
  );
}

//       pageSize={5}
//       rowsPerPageOptions={[5]}
