const DEFAULT_LIMIT = 0;
const DEFAULT_PAGE = 1;
export const getPagination = (query) => {
    const _page = Math.abs(query.page || DEFAULT_PAGE);
    const _limit = Math.abs(query.limit || DEFAULT_LIMIT);
    const skip = _limit * (_page - 1);
    console.log(query.page, query.limit);
    console.log(query);
    return {
        skip,
        limit: _limit,
    };
};
//# sourceMappingURL=query.js.map