import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redax/slices/filterSlice';

import Categories from '.././components/Categories';
import Sort from '.././components/Sort';
import PizzaBlock from '.././components/pizzablock';
import MyLoader from '.././components/pizzablock/sceleton'; //скелетон
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
// import pizzas from '.././assetc/pizze.json';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const order = sort.sort.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63c844465c0760f69ac8e732.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sort.replace(
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
  }, [categoryId, sort, searchValue, currentPage]);

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
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
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
