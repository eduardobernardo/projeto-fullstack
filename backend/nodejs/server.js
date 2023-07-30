const http = require("http");
const url = require("url");

// Define a porta do server
const port = 3000;


// Define as rotas do server
const requestListener = (req, res) => {
  //Faz o parse da URL e separa as query strings
  const parsedUrl = url.parse(req.url, true);
  //Define o header para todas as respostas em formato JSON
  res.setHeader("Content-Type", "application/json");

  //Verifica as rotas permitidas
  if(parsedUrl.pathname.startsWith("/orders")){ //Retorna todas as orders
    res.writeHead(200);
    res.end(JSON.stringify([{id:1},{id:2},{id:3}]));
  }else if(parsedUrl.pathname.startsWith("/order/")){ //Verifica se está selecionando uma order específica
    //Define um regex para a url
    const regex = new RegExp('\/order\/(.+)');
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

    //se o tamanho do array de parametros for maior que 1, foi enviado um verbo em conjunto
    if(params.length > 1){
      //espera que o segundo argumento seja o verbo (edit) ou o verbo (delete)
      // console.log("Params:", params);
      
      //Verifica se recebeu o verbo edit e o metodo POST ou PUT
      if(params[1] === "edit" && (req.method === "POST" || req.method === "PUT")){
        //Edita a order
        res.writeHead(200);
        res.end(JSON.stringify({order: params[0], message: "Order updated!"}));
      }else if(params[1] === "delete" && req.method === "DELETE"){ //Verifica se recebeu o verbo delete e o metodo DELETE 
        console.log("Metodo", req.method);
        //Deleta a order
        res.writeHead(200);
        res.end(JSON.stringify({order: params[0], message: "Order deleted!"}));
      }else{
        res.writeHead(404);
        res.end(JSON.stringify({error: "Not Found"}));
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