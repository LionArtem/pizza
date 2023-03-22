import React from 'react';

//import { useNavigation } from 'react-router-dom';

import axios from 'axios';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redax/slices/filterSlice';

import Categories from '.././components/Categories';
import Sort from '.././components/Sort';
import PizzaBlock from '.././components/pizzablock';
import MyLoader from '.././components/pizzablock/sceleton'; //скелетон
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
// import pizzas from '.././assetc/pizze.json';

const Home = () => {
  //const navigate = useNavigation();

  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const order = sort.sort.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    // fetch(
    //   `https://63c844465c0760f69ac8e732.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sort.replace(
    //     '-',
    //     ''
    //   )}&order=${order}${search}`
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setItems(res);
    //     setIsLoading(false);
    //   })
    //   .catch((res) => alert(res));
    axios
      .get(
        `https://63c844465c0760f69ac8e732.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sort.replace(
          '-',
          ''
        )}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((res) => alert(res));

    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  // React.useEffect(() => {
  //   const queryString = qs.stringify({
  //     sortProperty: sort.sort,
  //     categoryId,
  //     currentPage,
  //   });

  //   //navigate(`?${queryString}`);
  // }, [categoryId, sort, currentPage]);

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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
