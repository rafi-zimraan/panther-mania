// const useCurrencyFormat = price => {
// const formatter = new Intl.NumberFormat('id-ID', {
// style: 'currency',
// currency: 'IDR',
// });
// return formatter.format(price).replace(/(\.\d{2})$/g, '');
// };
//
// export default useCurrencyFormat;

const useCurrencyFormat = angka => {
  const rupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka || 0);
  return `${rupiah},-`;
};

export default useCurrencyFormat;
