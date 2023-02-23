import React from 'react';

import Categories from '.././components/Categories';
import Sort from '.././components/Sort';
import PizzaBlock from '.././components/pizzablock';
import MyLoader from '.././components/pizzablock/sceleton'; //скелетон
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
// import pizzas from '.././assetc/pizze.json';

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });

  const order = sortType.sort.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63c844465c0760f69ac8e732.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sort.replace(
        '-',
        ''
      )}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      })
      .catch((res) => alert(res));
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((obj, i) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort sort={sortType} onClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* {pizzas.map((obj, i) => (
          <PizzaBlock {...obj} key={obj.id} />
        ))} */}
        {isLoading
          ? [...new Array(6)].map((_, i) => <MyLoader key={i} />)
          : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
