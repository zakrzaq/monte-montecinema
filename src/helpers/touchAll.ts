export const touchAll = (obj: Record<string, boolean>) => {
  for (const key in obj) {
    obj[key] = true;
  }
};

export default touchAll;
