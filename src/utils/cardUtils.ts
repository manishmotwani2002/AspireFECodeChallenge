
export const generateRandomCardNumber = (): string => {
  return Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10000).toString().padStart(4, '0'))
    .join(' ');
};

export const generateRandomExpiry = (): string => {
  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = (today.getFullYear() + 3).toString().slice(-2);
  return `${month}/${year}`;
};

export const generateRandomCVV = (): string => {
  return Math.floor(Math.random() * 900 + 100).toString();
};
