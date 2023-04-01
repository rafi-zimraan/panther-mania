const useCurrencyFormat = price => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  return formatter.format(price).replace(/(\.\d{2})$/g, '');
};

export default useCurrencyFormat;
