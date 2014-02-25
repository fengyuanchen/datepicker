var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), uri);

    fs.readFile(filename, "binary", function(err, file) {
        if (err) {
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });
            response.write(err + "\n");
            response.end();
            return;
        }

        response.writeHead(200, filename.match(/\.js$/) ? {
            "Content-Type": "text/javascript"
        } : {});
        response.write(file, "utf-8");
        response.end();
    });
}).listen(8090, "127.0.0.1");

console.log("Server running at http://127.0.0.1:8090/tests/index.html");