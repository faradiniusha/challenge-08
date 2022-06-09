const ApplicationError = require("./ApplicationError");

class EmailAlreadyTakenError extends ApplicationError {
  constructor(email) {
    super(`${email} email already taken!`);
    this.email = email;
  }

  get details() {
    return { email: this.email };
  }
}

module.exports = EmailAlreadyTakenError;
