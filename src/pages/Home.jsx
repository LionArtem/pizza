import React from 'react';

import Categories from '.././components/Categories';
import Sort from '.././components/Sort';
import PizzaBlock from '.././components/pizzablock';
import MyLoader from '.././components/pizzablock/sceleton'; //скелетон
// import pizzas from '.././assetc/pizze.json';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://63c844465c0760f69ac8e732.mockapi.io/items')
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      }).catch((res)=>alert(res));
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* {pizzas.map((obj, i) => (
          <PizzaBlock {...obj} key={obj.id} />
        ))} */}
        {isLoading
          ? [...new Array(6)].map((_, i) => <MyLoader key={i} />)
          : items.map((obj, i) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
    </>
  );
};

export default Home;
