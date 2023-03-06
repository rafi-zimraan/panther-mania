import * as yup from 'yup';

export const daftarKegiatanValidation = yup.object().shape({
  namaMember: yup.string().required('Form ini harus diisi!'),
  noPung: yup.string().required('Form ini harus diisi!'),
  dewasa: yup.string().required('Form ini harus diisi!'),
  anakAnak: yup.string().required('Form ini harus diisi!'),
});
