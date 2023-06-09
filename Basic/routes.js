const fs = require("fs");

const reqHandler = (req,res) =>{
    const url = req.url;
    const method = req.method;
    if (req.url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write(
          '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>'
        );
        res.write("</html>");
        return res.end();
      }
      if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
          console.log("chunk is", chunk);
          body.push(chunk);
        });
        req.on("end", () => {
          const parsedBody = Buffer.concat(body).toString().split("=");
          console.log(parsedBody);
          const message = parsedBody[1];
          fs.writeFileSync("message.txt", message);
          
        });
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      }
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>Node</title></head>");
      res.write("<body><h1>Welcome to node page.</h1></body>");
      res.write("</html>");
      res.end();
}

module.exports = reqHandler;