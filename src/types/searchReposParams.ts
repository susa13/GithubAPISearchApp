export interface SearchReposParams {
  searchQuery: string;
  page?: number;
  pageSize?: number;
  sort?: "stars" | "updated";
  order?: "asc" | "desc";
}
