const DEFAULT_PAGE = "main.html";
const LOGIN_PAGE = "login.html";

let rewritePage = (req, res, next) => {
  let { method, headers } = req;
  if (method === "POST") {
    next();
    return;
  }
  if (!headers.accept || headers.accept.indexOf("text/html") === -1) {
    next();
    return;
  }

  if (req.url === "/login") {
    req._rewritePage = LOGIN_PAGE;
  } else {
    req._rewritePage = DEFAULT_PAGE;
  }

  next();
};

module.exports = rewritePage;
