const http = require("http");
const url = require("url");
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');

const Cart = require("./models/cart")

// Define a porta do server
const port = 3000;

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
// Define as rotas do server
const requestListener = async (req, res) => {
  //Faz o parse da URL e separa as query strings
  const parsedUrl = url.parse(req.url, true);
  //Define o header para todas as respostas em formato JSON
  res.setHeader("Content-Type", "application/json");

  //Verifica as rotas permitidas
  if(parsedUrl.pathname === "/cart"){ //Retorna todas as orders
    if(req.method === "POST"){
      console.log("Metodo POST em /cart")
      try {
        const cart = await Cart.create({ id: uuidv4() });
        console.log("Cart:", cart);

        res.writeHead(200);
        res.end(JSON.stringify({id: cart.id, items: cart?.items, user: cart?.user}));
      } catch (error) {
        console.log("Error", error);
        res.writeHead(400);
        res.end(JSON.stringify(error));
      }
    }else if(req.method === "PUT"){
      console.log("Metodo PUT em /cart");
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', async () => {
        body = JSON.parse(Buffer.concat(body).toString());
        // at this point, `body` has the entire request body stored in it as a string
        console.log("Body received in PUT /cart", body);
        try {
          await Cart.updateOne({ id: body.id }, { user: body?.user, items: body?.items });
          const response = await Cart.findOne({ id: body.id });
          res.writeHead(200);
          res.end(JSON.stringify({id: response.id, items: response?.items, user: response?.user}));
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify(error));
        }
      });
    }
  }else if(parsedUrl.pathname.startsWith("/cart/")){ //Verifica se está selecionando uma order específica
      console.log("Metodo GET em /cart/...")
      // console.log("Params:", params);
    //Define um regex para a url
    const regex = new RegExp('\/cart\/(.+)');
    //Verifica se a URL bate com o Regex
    const matches = regex.exec(parsedUrl.pathname);
    // console.log("Matches:", matches);

    //Se nao houver parametros, retorna 404
    if(!matches || !matches[1]){
      res.writeHead(404);
      res.end(JSON.stringify({error: "Not Found"}));
    }

    //Caso hajam parametros, faz o split na / para separar o ideitificador do verbo
    const params = matches[1].split("/");
    console.log("Params:", params);

    //se o tamanho do array de parametros for maior que 1, foi enviado um verbo em conjunto
    if(params.length >= 1){
      //espera que o segundo argumento seja o verbo (edit) ou o verbo (delete)
      
      //Verifica se recebeu o verbo edit e o metodo POST ou PUT
      if(params.length === 1 && req.method === "GET"){
        try {
          const cart = await Cart.findOne({ id: params[0] });
          console.log("Cart:", cart);
          
          res.writeHead(200);
          res.end(JSON.stringify({id: cart.id, items: cart?.items, user: cart?.user}));
        } catch (error) {
          console.log("Error", error);
          res.writeHead(400);
          res.end(JSON.stringify(error));
        }
      }else if(params.length === 1 && req.method === "PUT"){
        console.log("Metodo PUT em /cart/...");
        let body = [];
        req.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', async () => {
          body = JSON.parse(Buffer.concat(body).toString());
          // at this point, `body` has the entire request body stored in it as a string
          console.log("Body received in PUT /cart", body);
          try {
            const cart = await Cart.updateOne({ id: params[0] }, { user: body?.user, items: body?.items });
            const response = await Cart.findOne({ id: params[0] });
            let total = 0.0
            if(body?.items){
              body?.items.forEach(item => {
                total += item.price;
              });
            }
            res.writeHead(200);
            res.end(JSON.stringify({id: response._doc.id, items: response._doc?.items, user: response._doc?.user, total, totalCurrency: formatCurrency(total)}));
          } catch (error) {
            res.writeHead(400);
            res.end(JSON.stringify(error));
          }
        });
      }else if(params[1] === "checkout" && req.method === "GET"){
        try {
          const cart = await Cart.findOne({ id: params[0] });
          console.log("Cart:", cart);
          let total = 0.0
          if(cart.items){
            cart.items.forEach(item => {
              total += item.price;
            });
          }
          
          res.writeHead(200);
          res.end(JSON.stringify({id: cart.id, items: cart?.items, user: cart?.user, total, totalCurrency: formatCurrency(total)}));

        } catch (error) {
          console.log("Error", error);
          res.writeHead(400);
          res.end(JSON.stringify(error));
        }
      }else if(params.length === 1 && req.method === "DELETE"){ //Verifica se recebeu o verbo delete e o metodo DELETE 
        try {
          const cart = await Cart.deleteOne({ id: params[0] });
          console.log("Cart:", cart);          
          res.writeHead(200);
          res.end(JSON.stringify({id: params[0], deleted: cart.deletedCount === 1 ? true : false}));
        } catch (error) {
          console.log("Error", error);
          res.writeHead(400);
          res.end(JSON.stringify(error));
        }
      }
    }else{
      //Se o tamanho do array de paramentros for 1, verifica se o metodo enviado foi GET
      if(req.method === "GET"){
        res.writeHead(200);
        res.end(JSON.stringify({id: matches[1]}));
      }else{ //Caso contrario, retorna 404
        res.writeHead(404);
        res.end(JSON.stringify({error: "Not Found"}));
      }
    }
  }else{ // Retorna 404
    res.writeHead(404);
    res.end(JSON.stringify({error: "Not Found"}));
  }
}

// Define o server
const server = http.createServer(requestListener);

//Escuta as requisições de acordo com o definido em host e port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});