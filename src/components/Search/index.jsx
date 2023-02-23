import React, { useContext } from 'react';
import style from './Search.module.scss';

import Close from '../../assetc/img/close.svg';
import { SearchContext } from '../../App';

export default function Search() {
  const {searchValue, setSearchValue}=useContext(SearchContext)
  return (
    <div className={style.contener}>
      <input
      value={searchValue}
        onChange={(evt) => setSearchValue(evt.target.value)}
        className={style.root}
        placeholder="Поиск пиццы.."
      />
      {searchValue && <img onClick={()=>setSearchValue('')} src={Close} alt="крестик" />}
    </div>
  );
}
