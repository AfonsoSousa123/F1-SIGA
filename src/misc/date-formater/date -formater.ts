export function dateFormater(input: string): string {
  const date = new Date(input);
  /* Date format you have */
  /* Date converted to MM-DD-YYYY format */
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export function timeFormater(input: string): string {
  const date = new Date(input);
  /* Date format you have */
  /* Date converted to MM-DD-YYYY format */
  return `${date.getHours()}:${date.getMinutes()}`;
}

export function fullTimeFormater(input: string): string {
  const date = new Date(input);
  /* Date format you have */
  /* Date converted to MM-DD-YYYY format */
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
