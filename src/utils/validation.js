const validation = (type, text, value, valueSecond) => {
  let txt = '';

  if (type === 'email') {
    const pattern = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    const emailValidate = pattern.test(value);
    if (!emailValidate) {
      txt = `${text} tidak valid!`;
    }
    return txt;
  } else if (type === 'strleast7char') {
    const strleast7char = value.length >= 10;
    if (strleast7char) {
      txt = `${text} kurang dari 7 karakter`;
    }
    return txt;
  } else if (type === 'strleast9char') {
    const strleast9char = value.length >= 10;
    if (strleast9char) {
      txt = `${text} kurang dari 9 karakter`;
    }
    return txt;
  } else if (type === 'strleast10char') {
    const strleast10char = value.length >= 10;
    if (strleast10char) {
      txt = `${text} kurang dari 10 karakter`;
    }
    return txt;
  } else if (type === 'strleast12char') {
    const strleast12char = value.length >= 10;
    if (strleast12char) {
      txt = `${text} kurang dari 12 karakter`;
    }
    return txt;
  } else if (type === 'strnotempty') {
    const REGEXP = /^$/;
    const result = REGEXP.test(value);
    if (result) {
      txt = `${text} masih kosong, mohon diisi`;
    }
    return txt;
  } else if (type === 'strshouldsame') {
    if (value !== valueSecond) {
      txt = `${text} tidak sama`;
    }
    return txt;
  }
};

export default validation;
