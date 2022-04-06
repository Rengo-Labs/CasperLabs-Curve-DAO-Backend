// Number of decimals used for fees
const FEE_PRECISION = "10";

// Number of decimals used for gauge weight
const GAUGE_WEIGHT_PRECISION = "18";

// Number of decimals used for total weight
const GAUGE_TOTAL_WEIGHT_PRECISION = (BigInt(GAUGE_WEIGHT_PRECISION) * BigInt(2)).toString();

module.exports = {
    FEE_PRECISION,
    GAUGE_WEIGHT_PRECISION,
    GAUGE_TOTAL_WEIGHT_PRECISION
};
  