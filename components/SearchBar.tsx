import { useRef, useEffect, KeyboardEvent } from 'react';

// Redux
// import { useDispatch, useSelector } from 'react-redux';

// Typescript
// import { App, Category } from '../../interfaces';

// CSS
import classes from '../styles/SearchBar.module.css';

// Utils
import { searchParser, urlParser, redirectUrl } from '../utility';
// import { State } from '../../store/reducers';
import { bindActionCreators } from 'redux';
// import { actionCreators } from '../../store';

interface Props {
  setLocalSearch: (query: string) => void;
  appSearchResult: any[] | null;
  bookmarkSearchResult: any[] | null;
}

export const SearchBar = (props: Props): JSX.Element => {
//   const { config, loading } = useSelector((state: State) => state.config);

//   const dispatch = useDispatch();
//   const { createNotification } = bindActionCreators(actionCreators, dispatch);

  const { setLocalSearch, appSearchResult, bookmarkSearchResult } = props;

  const inputRef = useRef<HTMLInputElement>(document.createElement('input'));

  // Search bar autofocus
//   useEffect(() => {
//     if (!loading && !config.disableAutofocus) {
//       inputRef.current.focus();
//     }
//   }, [config]);

  // Listen for keyboard events outside of search bar
  useEffect(() => {
    const keyOutsideFocus = (e: any) => {
      const { key } = e as KeyboardEvent;

      if (key === 'Escape') {
        clearSearch();
      } else if (document.activeElement !== inputRef.current) {
        if (key === '`') {
          inputRef.current.focus();
          clearSearch();
        }
      }
    };

    window.addEventListener('keyup', keyOutsideFocus);

    return () => window.removeEventListener('keyup', keyOutsideFocus);
  }, []);

  const clearSearch = () => {
    inputRef.current.value = '';
    setLocalSearch('');
  };

  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const { isLocal, search, query, isURL, sameTab } = searchParser(
      inputRef.current.value
    );

    if (isLocal) {
      setLocalSearch(search);
    }

    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (!query.prefix) {
        // Prefix not found -> emit notification
        // createNotification({
        //   title: 'Error',
        //   message: 'Prefix not found',
        // });
      } else if (isURL) {
        // URL or IP passed -> redirect
        const url = urlParser(inputRef.current.value)[1];
        redirectUrl(url, sameTab);
      } else if (isLocal) {
        // Local query -> redirect if at least 1 result found
        if (appSearchResult?.length) {
          redirectUrl(appSearchResult[0].url, sameTab);
        } else if (bookmarkSearchResult?.[0]?.bookmarks?.length) {
          redirectUrl(bookmarkSearchResult[0].bookmarks[0].url, sameTab);
        } else {
          // no local results -> search the internet with the default search provider
          let template = query.template;

          if (query.prefix === 'l') {
            template = 'https://duckduckgo.com/?q=';
          }

          const url = `${template}${search}`;
          redirectUrl(url, sameTab);
        }
      } else {
        // Valid query -> redirect to search results
        const url = `${query.template}${search}`;
        redirectUrl(url, sameTab);
      }
    } else if (e.code === 'Escape') {
      clearSearch();
    }
  };

  return (
    <div className={classes.SearchContainer}>
      <input
        ref={inputRef}
        type="text"
        className={classes.SearchBar}
        onKeyUp={(e) => searchHandler(e)}
        onDoubleClick={clearSearch}
      />
    </div>
  );
};
