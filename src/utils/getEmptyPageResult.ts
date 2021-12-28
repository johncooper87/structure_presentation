function getEmptyPageResult<T>(): PageResult<T> {
  return {
    pageNumber: 1,
    pageSize: 0,
    totalPages: 0,
    totalRecords: 0,
    data: [],
  };
}

export default getEmptyPageResult;
