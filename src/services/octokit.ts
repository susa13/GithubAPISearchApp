import { Octokit } from "octokit";
import { type SearchReposParams } from "../types/searchReposParams";

// // Not using authorization for now but here if needed
// const octokit = new Octokit({
//   auth: 'YOUR-TOKEN'
// });

const octokit = new Octokit({});

export const searchRepos = async ({
  searchQuery,
  page = 1,
  pageSize = 20,
  sort = undefined,
  order = undefined,
}: SearchReposParams) => {
  try {
    // console.log("sort", sort);
    // console.log("order", order);

    // // Method 1
    const { data } = await octokit.rest.search.repos({
      q: searchQuery,
      page: page,
      per_page: pageSize,
      sort,
      order,
    });

    // // Method 2
    // const { data } = await octokit.request("GET /search/repositories", {
    //   q: searchQuery,
    //   page: page,
    //   per_page: pageSize,
    //   sort,
    //   order,
    // });
    return data;
  } catch (error) {
    console.error("Error fetching repository details:", error);
    throw error;
  }
};

export default octokit;
