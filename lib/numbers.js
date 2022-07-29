export const numberPriceToString = (price = 0, quantity = 0) => {
  return Number(price.slice(1).replace(",", ".")) * quantity;
};

export const amouthToStripe = (price = "", decimals = 2) => {
  if (isNaN(price) || typeof decimals !== "number") {
    return 0;
  }

  const [part1, part2] = price?.split(/\./gm) || [0, 0];
  if (part1 === 0 || part2 === 0) {
    return 0;
  } else {
    return Number(`${part1}.${part2.slice(0, decimals)}`);
  }
};
