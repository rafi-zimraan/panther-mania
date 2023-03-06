import * as yup from 'yup';

export const updateProfileValidation = yup.object().shape({
  email: yup.string().email('Email tidak valid!'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Password harus mempunyai 8 karakter, 1 huruf besar, 1 huruf kecil, 1 angka dan 1 karakter spesial',
    ),
  passwordKonfirmasi: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Konfirmasi password harus sama dengan password',
    ),
  noKtp: yup.string().min(16, 'Harus 16 karakter'),
});
