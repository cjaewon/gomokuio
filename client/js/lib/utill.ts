export const bind = (name: string, data: any) => {
  return JSON.stringify({
    name,
    data,
  });
};