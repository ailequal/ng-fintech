export const dateToString = (d: Date): string => {
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  return [month, day, year].join('/');
}
