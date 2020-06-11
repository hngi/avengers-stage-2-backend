
const redirectowww = process.env.REDIRECT_TO_WWW;
const redirectohttps = process.env.REDIRECT_TO_HTTPS;
const wwwredirecto = process.env.WWW_REDIRECT_TO

module.exports = function(req, res, next) {
    // check if it is a secure (https) request
    // if not redirect to the equivalent https url
    if (redirectohttps == true && req.headers['x-forwarded-proto'] !== 'https' && req.hostname !== 'localhost') {
      // special for robots.txt
      if (req.url === '/robots.txt') {
        next();
        return;
      }
      res.redirect(301, 'https://' + req.hostname + req.url);
    }
  
    // www or not
    if (redirectowww == true && !req.hostname.startsWith('www.')) {
      res.redirect(301, 'https://www.' + req.hostname + req.url);
    }
  
    // www or not
    if (wwwredirecto == true && req.hostname.startsWith('www.')) {
      const host = req.hostname.slice(4, req.hostname.length);
      res.redirect(301, 'https://' + host + req.url);
    }
  
    next();
}