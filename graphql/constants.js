// Number of decimals used for fees
export const FEE_PRECISION = "10";

// Number of decimals used for gauge weight
export const GAUGE_WEIGHT_PRECISION = "18";

// Number of decimals used for total weight
export const GAUGE_TOTAL_WEIGHT_PRECISION = (BigInt(GAUGE_WEIGHT_PRECISION) * BigInt(2)).toString();