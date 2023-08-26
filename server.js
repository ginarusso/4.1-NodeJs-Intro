// use the http library
const http = require('http');
// use the url library
const url = require('url');
// create a port
const port = 8080;

//create a server by using the http library
const server = http.createServer(productSearch)

function productSearch(req, res) {
    // req - request from client/browser
    const myURL = req.url
    // console.log(myURL) // gives the url that was provided in the browser
    // res - response from server
  const parsedURL = url.parse(myURL, true);
//   const parsedURL = url.parse(myURL, true).query;
//   res.write(JSON.stringify(parsedURL.query))
//   res.end()
//   console.log(parsedURL) below is in the console
//   search: '?search=eggs',
//   query: [Object: null prototype] { search: 'eggs' },
//   pathname: '/products',
//   path: '/products?search=eggs',
//   href: '/products?search=eggs'
  const path = parsedURL.pathname;
  const query = parsedURL.query

  if (path === '/profile') {
    // send back the status code and what type of content
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`This is the ${path} page`);
    res.end()
  } else if (path === '/products') {
    const searchQuery = query.search;
    // console.log("search query: " + searchQuery)
    const productList = ['Milk', 'Eggs', 'Cheese', 'Pork', 'Shrimp', 'Chicken'];

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      const found = productList.some(product => product.toLowerCase() === lowercaseQuery);
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      if (found) {
        res.write(`Product "${searchQuery}" found.`);
      } else {
        res.write(`Product "${searchQuery}" not found.`);
      }
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`This is the ${path} page`);
    }
    res.end();
  }  else if (path === '/cart' || path === '/register' || path === '/login') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`This is the ${path} page`);
    res.end();
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Page not found');
    res.end();
  }
}
//connect to the port
server.listen(port);
