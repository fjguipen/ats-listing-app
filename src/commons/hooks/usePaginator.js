import * as React from 'react';

const calcSelectors = (page, perPage) => {
  return [perPage * (page - 1), perPage * page];
};

export const usePaginator = (initialPage, perPage, items, storeName) => {
  const [current, setCurrentPage] = React.useState(() => {
    if (storeName) {
      const stored = sessionStorage.getItem(storeName);
      return (stored && parseInt(stored, 10)) || initialPage;
    } else {
      return initialPage;
    }
  });
  const [totalPages, setTotalPages] = React.useState(
    Math.ceil(items.length / perPage)
  );
  const [selector, setSelector] = React.useState(
    calcSelectors(current, perPage)
  );

  React.useEffect(() => {
    setTotalPages(Math.ceil(items.length / perPage));
  }, [items, perPage]);

  const handleOnChange = (page) => {
    setCurrentPage((prev) => {
      if (page !== prev && page >= 1 && page <= totalPages) {
        setSelector(calcSelectors(page, perPage));
        if (storeName) {
          sessionStorage.setItem(storeName, page);
        }
        return parseInt(page, 10);
      }
      return prev;
    });
  };

  return {
    page: current,
    setPage: handleOnChange,
    totalPages,
    totalItems: items.length,
    selector
  };
};
