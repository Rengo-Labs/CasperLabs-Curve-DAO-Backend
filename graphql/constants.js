var bigdecimal = require("bigdecimal");
// Number of decimals used for fees
const FEE_PRECISION = "10";

// Number of decimals used for gauge weight
const GAUGE_WEIGHT_PRECISION = "18";

// Number of decimals used for total weight
const GAUGE_TOTAL_WEIGHT_PRECISION = ((new bigdecimal.BigDecimal(GAUGE_WEIGHT_PRECISION)).multiply(new bigdecimal.BigDecimal(2))).toString();

module.exports = {
    FEE_PRECISION,
    GAUGE_WEIGHT_PRECISION,
    GAUGE_TOTAL_WEIGHT_PRECISION
};
  