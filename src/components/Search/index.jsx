import React, { useContext } from 'react';
import debounce from 'lodash.debounce';

import style from './Search.module.scss';

import Close from '../../assetc/img/close.svg';
import { SearchContext } from '../../App';

export default function Search() {
  const [value, setValue] = React.useState('');
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue('');
    // document.querySelector('input').focus();
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  React.useEffect(() => {
    //console.log(document.querySelector('input'));
    document.querySelector('input');
  }, []);

  return (
    <div className={style.contener}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={style.root}
        placeholder="Поиск пиццы.."
      />
      {searchValue && <img onClick={onClickClear} src={Close} alt="крестик" />}
    </div>
  );
}
