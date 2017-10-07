var express=require("express")
var app =express();
var parser= require("body-parser")
var ExpressPeerServer = require('peer').ExpressPeerServer;
var path=  require('path')
var port=process.env.PORT||5500

app.use(parser.urlencoded({extended:true}))
app.use(parser.json())


var server=app.listen(port,()=>{
    console.log("ready")
})
var peerServer=ExpressPeerServer(server)
var io=require('./io')(server);


app.use("/peer",peerServer)

//if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
//}
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
  });
peerServer.on("connection",(id)=>{
    console.log('====================================');
    console.log(id);
    console.log('====================================');
})

