const Account = require("../../models/account");

async function getOrRegisterAccount(address) {
  let account = await Account.findOne({ id: address });

  if (account  === null) {
    account  = new Account({
      id: address,
      address: address,
    });
  }

  return account;
}

module.exports = {
  getOrRegisterAccount,
};
