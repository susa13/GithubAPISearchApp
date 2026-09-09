import { Octokit } from "octokit";

// // Not using authorization for now but here if needed
// const octokit = new Octokit({
//   auth: 'YOUR-TOKEN'
// });

const octokit = new Octokit({});

export const searchRepos = async (
  repo: string,
  page: number = 1,
  pageSize: number = 20,
) => {
  try {
    // const { data } = await octokit.rest.repos.get({
    //   owner,
    //   repo,
    // });
    const { data } = await octokit.rest.search.repos({
      q: repo,
      page: page,
      per_page: pageSize,
    });
    // const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    //   owner,
    //   repo,
    // });
    return data;
  } catch (error) {
    console.error("Error fetching repository details:", error);
    throw error;
  }
};

export default octokit;
