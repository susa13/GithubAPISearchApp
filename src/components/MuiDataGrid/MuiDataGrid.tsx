import { Paper, Box, Avatar } from "@mui/material";
import {
  DataGrid,
  GridCell,
  type GridCellProps,
  type GridColDef,
  type GridDataSource,
} from "@mui/x-data-grid";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useMemo } from "react";
import { enUS as locale } from "date-fns/locale";
import { format } from "date-fns/format";

import { searchRepos } from "../../services/octokit";
import { type SearchReposParams } from "../../types/searchReposParams";

interface MuiDataGridProps {
  searchQuery: string;
}

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 70 },
  // {
  //   field: "avatar_url",
  //   headerName: "Avatar",
  //   renderCell: (params) => <Avatar alt="Avatar" src={params.value} />,
  // },
  {
    field: "login",
    headerName: "Owner",
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
        }}
      >
        {/* Changing the rows to data source seemed to have changed the way you custom access params */}
        {/* <Avatar alt="Avatar" src={params.row.avatar_url} />
          {params.value} */}
        <Avatar alt="Avatar" src={params.row.owner.avatar_url} />
        {params.row.owner.login}
      </Box>
    ),
    sortable: false,
    width: 150,
  },
  {
    field: "full_name",
    headerName: "Repo",
    sortable: false,
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    width: 300,
  },
  // { field: "watchers_count", headerName: "Watchers Count", width: 150 },
  {
    field: "stargazers_count",
    headerName: "Stars",
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
        }}
      >
        <StarBorderIcon />
        {params.value}
      </Box>
    ),
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    valueFormatter: (value) => {
      if (value) {
        return format(value, "MM/dd/yyyy", { locale });
      }
      return "";
    },
    width: 150,
  },
  {
    field: "created_at",
    headerName: "Created At",
    valueFormatter: (value) => {
      if (value) {
        return format(value, "MM/dd/yyyy", { locale });
      }
      return "";
    },
    sortable: false,
    width: 150,
  },
];

function renderRowHeaderCell(props: GridCellProps) {
  return <GridCell {...props} />;
}

// const paginationModel = { page: 0, pageSize: 10 };

const MuiDataGrid = ({ searchQuery }: MuiDataGridProps) => {
  // // This part isn't needed after fixing some errors with rendering. Best to keep pagination model uncontrolled
  // const [paginationModel, setPaginationModel] = useState({
  //   page: 0,
  //   pageSize: 5,
  // });

  // useEffect(() => {
  //   setPaginationModel((currentModel) => ({ ...currentModel, page: 0 }));
  // }, [searchQuery]);

  // const handlePaginationModelChange = (
  //   newModel: GridPaginationModel,
  //   // details: GridCallbackDetails,
  // ) => {
  //   // Log the new model and trigger details to the console
  //   console.log("New model:", newModel);

  //   setPaginationModel(newModel);
  // };

  const dataSource: GridDataSource = useMemo(
    () => ({
      getRows: async (params) => {
        if (!searchQuery) {
          return { rows: [], rowCount: 0 };
        }

        const { page, pageSize } = params.paginationModel ?? {
          page: 0,
          pageSize: 10,
        };
        // console.log("sort model:", params.sortModel);

        const searchReposParams: SearchReposParams = {
          searchQuery,
          page: page + 1, // github API starts at page 1
          pageSize,
        };

        if (params.sortModel && params.sortModel.length > 0) {
          const sort = params.sortModel[0].field;
          const order = params.sortModel[0].sort;
          if (sort === "stargazers_count") {
            searchReposParams.sort = "stars";
          } else if (sort === "updated_at") {
            searchReposParams.sort = "updated";
          }
          searchReposParams.order = order as "asc" | "desc";
        }

        const getNewRows = await searchRepos(searchReposParams);

        console.log("page data:", getNewRows);

        return {
          rows: getNewRows.items,
          rowCount: getNewRows.total_count,
        };
      },
    }),
    [searchQuery],
  );

  return (
    <Paper sx={{ my: 1, width: "100%" }}>
      <DataGrid
        // key={searchQuery}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        disableColumnFilter={true}
        paginationMode="server"
        dataSource={dataSource}
        dataSourceKeepPreviousData
        pageSizeOptions={[5, 10, 20]}
        slots={{ cell: renderRowHeaderCell }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default MuiDataGrid;
