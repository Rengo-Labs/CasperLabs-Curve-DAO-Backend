const Account = require("../../models/account");

async function getOrRegisterAccount(address) {
  let account = Account.findOne({ id: address });

  if (account === null) {
    let newData = new Account({
      id: address,
      address: address,
    });
    await Account.create (newData);
  }

  return account;
}

module.exports = {
  getOrRegisterAccount,
};
