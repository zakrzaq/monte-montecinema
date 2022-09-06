export const validateEmail = (email: string) => {
  const regexExpression =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexExpression.test(email);
};

export const validateDateOfBirth = (dob: string) => {
  const today = new Date();
  const dateOfBirth = new Date(dob);
  const age = (today.getTime() - dateOfBirth.getTime()) / 31536000000;
  return age >= 18 ? true : false;
};
