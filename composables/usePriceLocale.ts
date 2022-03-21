const usePriceLocale = () => {
  const priceLocale = (num: number) => {
    return num.toLocaleString('en-US', {
      style: 'currency', // "decimal", "currency", "percent"
      currency: 'USD', // ISO 4217
    });
  };

  return { priceLocale };
};

export default usePriceLocale;
