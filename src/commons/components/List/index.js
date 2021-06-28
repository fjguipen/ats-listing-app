import * as React from 'react';
import { matches } from '../../../utils';
import { useRestoreScroll } from '../../hooks/useRestoreScroll';
import { useDebounce } from '../../hooks/useDebounce';
import { usePaginator } from '../../hooks/usePaginator';

export const List = ({ filter, items, keyName, children, pageSize }) => {
  useRestoreScroll('product-list-scroll');
  const [entries, setEntries] = React.useState(items);
  const [firstRender, setFirstRender] = React.useState(true);
  const paginator = pageSize
    ? usePaginator(1, pageSize, entries, 'product-list-page')
    : null;

  React.useEffect(() => {
    setEntries(items);
  }, [items]);

  const triggerFilter = (term) => {
    const filterFunc = (item) => {
      const compareString = filter.searchValues.reduce((acumulator, value) => {
        return acumulator + ' ' + item[value];
      }, '');

      return matches(compareString, term);
    };
    setEntries(items.filter(filterFunc));
  };

  const debouncedTerm = useDebounce(filter.term, 300);

  React.useEffect(() => {
    triggerFilter(debouncedTerm);
    if (!firstRender) {
      scrollTo({
        top: 0
      });
      paginator.setPage(1);
    }

    setFirstRender(false);
  }, [debouncedTerm]);

  const paginate = (arr) => {
    if (paginator?.selector) {
      return arr.slice(paginator.selector[0], paginator.selector[1]);
    }
    return arr;
  };

  return (
    <>
      <ul>
        {paginate(entries).map((item) => (
          <li key={item[keyName || 'id']} className="item">
            {React.Children.map(children, (child) =>
              React.cloneElement(child, { item })
            )}
          </li>
        ))}
      </ul>
      {paginator && (
        <div className="paginator">
          {Array.from('i'.repeat(paginator.totalPages)).map((page, i) => {
            const nextPage = i + 1;
            return (
              <div
                className={
                  'page ' + (paginator.page === nextPage ? 'active' : '')
                }
                onClick={() => {
                  if (paginator.page !== nextPage) {
                    scrollTo({
                      top: 0
                    });
                    paginator.setPage(nextPage);
                  }
                }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
