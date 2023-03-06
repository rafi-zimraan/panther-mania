import * as yup from 'yup';

export const registerValidation = yup.object().shape({
  namaLengkap: yup.string().required('Form ini harus diisi!'),
  email: yup
    .string()
    .email('Email tidak valid!')
    .required('Form ini harus diisi!'),
  password: yup
    .string()
    .required('Form ini harus diisi!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Password harus mempunyai 8 karakter, 1 huruf besar, 1 huruf kecil, 1 angka dan 1 karakter spesial',
    ),
  passwordKonfirmasi: yup
    .string()
    .required('Form ini harus diisi!')
    .oneOf(
      [yup.ref('password'), null],
      'Konfirmasi password harus sama dengan password',
    ),
  jenisKelamin: yup.string().required('Form ini harus diisi!'),
  ukuranBaju: yup.string().required('Form ini harus diisi!'),
  tempatLahir: yup.string().required('Form ini harus diisi!'),
  tanggalLahir: yup.string().required('Form ini harus diisi!'),
  agama: yup.string().required('Form ini harus diisi!'),
  statusMenikah: yup.string().required('Form ini harus diisi!'),
  jenisKelamin: yup.string().required('Form ini harus diisi!'),
  alamatLengkap: yup
    .string()
    .min(10, 'Harus 10 karakter atau lebih!')
    .required('Form ini harus diisi!'),
  kelurahan: yup.string().required('Form ini harus diisi!'),
  kecamatan: yup.string().required('Form ini harus diisi!'),
  provinsi: yup.string().required('Form ini harus diisi!'),
  kabupatenKota: yup.string().required('Form ini harus diisi!'),
  noTelp: yup.string().required('Form ini harus diisi!'),
  noWa: yup.string().required('Form ini harus diisi!'),
  kontakDarurat: yup.string(),
  pekerjaan: yup.string(),
  namaPerusahaan: yup.string(),
  alamatPerusahaan: yup.string(),
  noKtp: yup
    .string()
    .min(16, 'Harus 16 karakter')
    .required('Form ini harus diisi!'),
  noSim: yup.string().required('Form ini harus diisi!'),
  typeKendaraan: yup.string().required('Form ini harus diisi!'),
  tahunKendaraan: yup.string().required('Form ini harus diisi!'),
  noPolisi: yup.string().required('Form ini harus diisi!'),
  warnaKendaraan: yup.string().required('Form ini harus diisi!'),
  noChasis: yup.string().required('Form ini harus diisi!'),
  noEngine: yup.string().required('Form ini harus diisi!'),
  tanggalPajak: yup.string().required('Form ini harus diisi!'),
});
