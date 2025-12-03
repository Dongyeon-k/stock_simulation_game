export const INITIAL_CASH = 10_000_000;
export const DEFAULT_VISIBLE_TICKERS = 6;

export const PRICES_BY_DAY = {
  0: {
    AAA: 90,
    BBB: 70,
    CCC: 90,
    DDD: 10,
    EEE: 130,
    FFF: 80,
    GGG: 50,
    HHH: 40,
    III: 60,
    JJJ: 170,
  },
  1: {
    AAA: 100,
    BBB: 80,
    CCC: 60,
    DDD: 40,
    EEE: 120,
    FFF: 95,
    GGG: 55,
    HHH: 70,
    III: 30,
    JJJ: 150,
  },
  2: {
    AAA: 110,
    BBB: 75,
    CCC: 65,
    DDD: 38,
    EEE: 125,
    FFF: 90,
    GGG: 60,
    HHH: 68,
    III: 28,
    JJJ: 160,
  },
  3: {
    AAA: 115,
    BBB: 70,
    CCC: 72,
    DDD: 42,
    EEE: 118,
    FFF: 100,
    GGG: 58,
    HHH: 80,
    III: 35,
    JJJ: 170,
  },
  4: {
    AAA: 105,
    BBB: 85,
    CCC: 68,
    DDD: 48,
    EEE: 130,
    FFF: 92,
    GGG: 65,
    HHH: 75,
    III: 33,
    JJJ: 165,
  },
  5: {
    AAA: 120,
    BBB: 90,
    CCC: 75,
    DDD: 50,
    EEE: 140,
    FFF: 88,
    GGG: 70,
    HHH: 85,
    III: 40,
    JJJ: 180,
  },
};

export const LAST_AVAILABLE_DAY = Math.max(...Object.keys(PRICES_BY_DAY).map(Number));

export function getVisiblePrices(day, visibleCount = DEFAULT_VISIBLE_TICKERS) {
  const priceMap = PRICES_BY_DAY[day];
  if (!priceMap) {
    throw new Error(`Day ${day} price data is not available.`);
  }
  return Object.fromEntries(Object.entries(priceMap).slice(0, visibleCount));
}

