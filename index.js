var express = require("express"); //Adding Expess
var http = require("http"); //Adding http
var jsforce = require("jsforce"); //Adding JsForce

var fs = require("fs");

var app = express();
app.set("port", process.env.PORT || 3000);
app.get("/", function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', 'https://catdealer--devpoc.my.salesforce.com');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization,X-Authorization'); 
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	res.setHeader('Access-Control-Max-Age', '1000');

  var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: "https://test.salesforce.com",
  });
  var username = "ben.chaichinda@perficient.com.devpoc";
  var password = "Spring@020";
  conn.login(username, password, function (err, userInfo) {
    if (err) {
      return console.error(err);
    }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    res.send("heySalesforce : JSForce Connect Successed!");
  });

  fs.readFile("test.html", function (error, pgResp) {
    if (error) {
      res.writeHead(404);
      res.write("Contents you are looking are Not Found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(pgResp);
    }

    res.end();
  });
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});
