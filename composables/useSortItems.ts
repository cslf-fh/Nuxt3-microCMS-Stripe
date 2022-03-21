import { PRODUCT } from '~~/server/api/products';

const useSortItems = () => {
  const sortItems = (obj: PRODUCT[], type: string) => {
    switch (type) {
      case 'price':
        return obj.sort((a, b) => a.price.unit_amount - b.price.unit_amount);
      case 'star':
        return obj.sort((a, b) => b.star - a.star);
      case 'reverse':
        return obj.reverse();
      default:
        return obj;
    }
  };

  return { sortItems };
};

export default useSortItems;
