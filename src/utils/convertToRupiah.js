const convertToRupiah = bilangan => {
  let reverse = bilangan.split('').reverse().join(''),
    ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan.join('.').split('').reverse().join('');
  return ribuan;
};

export default convertToRupiah;
