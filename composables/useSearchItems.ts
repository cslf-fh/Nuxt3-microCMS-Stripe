import { PRODUCT } from '~~/server/api/products';

const useSearchItems = () => {
  const searchItems = (obj: PRODUCT[], search: string) => {
    return obj.filter((elm) => {
      if (elm.name.includes(search) && search !== '') return elm;
    });
  };

  return { searchItems };
};

export default useSearchItems;
