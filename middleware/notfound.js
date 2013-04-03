exports.notfound = function(req, res, next) {
  /*Create your 404.html
  * Use it with:
  * res.send('404')
  */
  res.send({message : "Page not available"});
}