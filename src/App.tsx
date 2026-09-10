import { useState } from "react";
import { Container, Box, Paper, TextField } from "@mui/material";
import "./App.css";
// import axios from "axios";
// import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import MuiDataGrid from "./components/MuiDataGrid/MuiDataGrid";

function App() {
  const [form, setForm] = useState({
    searchQuery: "",
  });
  // const [tableData, setTableData] = useState<Repo[]>([]);
  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, searchQuery: event.target.value });
  };

  // const handleSearch = (searchQuery: string) => {
  //     searchRepos(searchQuery).then((data) => {
  //       console.log("Repository details:", data);

  //       const dataRows: Repo[] = data.items.map((repo) => ({
  //         id: repo.id,
  //         full_name: repo.full_name,
  //         login: repo.owner?.login ?? "",
  //         avatar_url: repo.owner?.avatar_url ?? "",
  //         created_at: repo.created_at,
  //         watchers_count: repo.watchers_count,
  //         stargazers_count: repo.stargazers_count,
  //         updated_at: repo.updated_at,
  //         description: repo.description ?? "No description",
  //       }));

  //       setTableData(dataRows);
  //     });
  //   };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (form.searchQuery.trim() !== "") {
        setSubmittedQuery(form.searchQuery);
      }
    }
  };

  // type Post = {
  //   userId: number;
  //   id: number;
  //   title: string;
  //   body: string;
  // };

  // const testRequest = async () => {
  //   const response = await axios
  //     .get<Post>("https://jsonplaceholder.typicode.com/posts/1")
  //     .then((response) => {
  //       console.log(response);
  //       console.log(response.data.title);
  //       return response;
  //     });
  //   return response.data.title;
  // };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ marginTop: 1, width: "100%" }}>
          <TextField
            size="small"
            id="search"
            variant="filled"
            value={form.searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            fullWidth
            placeholder="Press Enter to Search Github Repos"
          />
        </Paper>
        <MuiDataGrid searchQuery={submittedQuery} />
      </Container>
    </>
  );
}

export default App;
