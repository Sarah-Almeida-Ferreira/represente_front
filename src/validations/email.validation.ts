const validateEmail = (email: string) => {
  const regex1 = /^[^\s@]+@[^\s@]/;
  const regex2 = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const domain = email.match(/@([^\.]+)/);
  if (!!domain && !!regex1.test(email) && !regex2.test(email)) {
    throw new Error(
      `Inclua o domínio do e-mail após "${domain[1]}".`
    );
  }
  return "";
};

const emailMask = (email: string | undefined) =>
  email?.normalize('NFD').replace(/[^\w.%+-@]/g, "").replace(/,/g, "");

export { validateEmail, emailMask };
