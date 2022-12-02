export const imageCheck = (url: string | undefined) => {
  if (url?.includes('https://')) {
    return url;
  } else {
    return url?.replace('http://', 'https://');
  }
};
