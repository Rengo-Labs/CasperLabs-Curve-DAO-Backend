const Account = require("../../models/account");

async function getOrRegisterAccount(address,session) {
  let account = await Account.findOne({ id: address });

  if (account  === null) {
    account  = new Account({
      id: address,
      address: address,
    });
    await Account.create ([account],{session} );
  }

  return account;
}

module.exports = {
  getOrRegisterAccount,
};
