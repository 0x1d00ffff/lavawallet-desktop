

    var path = require("path"),
        express = require("express");

    var DIST_DIR = path.join(__dirname, "../public"),
        PORT = 3000,
        app = express();



const storage = require('electron-json-storage');



module.exports =  class WebServer {
  constructor( ){

  }

  async init(){

    console.log('hosting server ')

    //Serving the files on the dist folder
    app.use(express.static(DIST_DIR));

    //Send index.html when the user access the web
    app.get("*", function (req, res) {
      res.sendFile(path.join(DIST_DIR, "index.html"));
    });

    app.listen(PORT);
    console.log('Express dev server listening on port ', PORT, "!")


    console.log(storage.getDataPath() ) //show this in settings 



  await this.storeFile('foobar',{foo:'bar'});

  var response = await this.readFile('foobar');

  console.log(response)


  }



  async storeFile(key,json)
  {
    var response = await new Promise((resolve, reject) => {
      storage.set(key,json, function(error) {
        if (error) reject(error);

        var msg = 'Stored '+JSON.stringify(json)+ ' at '+ key.toString();
        resolve(msg);
      })
    });

    return response;
  }

  async readFile(key)
  {
    var response = await new Promise((resolve, reject) => {

      storage.get(key,function(error,data) {
        if (error) reject(error);
          resolve(data);
      });

    });

    return response;
  }

}