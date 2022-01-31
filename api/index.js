const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const formData = require('express-form-data')
const routes = require('./src/routes')
const { get_Current_User, user_Disconnect, join_User } = require("./socketUsers");

const app = express()
app.use('*', cors())

const PORT = process.env.PORT || 5000

const http = require('http');

const server = http.createServer(app);
//const { Server } = require("socket.io");
//const io = new Server(server);

//const io = require("socket.io")(server)


//new code
const users = {};

const io = require("socket.io")(server, {
    cors: {
       origin:  '*',
    },
 });

io.on('connection', (socket) => {


    //new code
    /*
    if (!users[socket.id]) {
        users[socket.id] = socket.id;
    }
    */




    console.log('a user connected');
    socket.on("join room", ({userid, conversationid}) => {
        const p_user = join_User(socket.id, userid, conversationid);
        socket.join(p_user.conversationid)
    })
    socket.on('chat', (msg) => {
        const p_user = get_Current_User(socket.id);
        io.to(p_user.conversationid).emit("message", {
            id: p_user.id,
            userid: p_user.userid,
            text: msg,
            date: new Date().toISOString()
        });
    });
    
    socket.on("callUser", (data) => {
        const p_user = get_Current_User(socket.id);
        io.to(p_user.conversationid).emit('callReceived', {signal: data.signalData, from: data.from});
    })
    socket.on("acceptCall", (data) => {
        const p_user = get_Current_User(socket.id);
        io.to(p_user.conversationid).emit('callAccepted', data.signal);
    })


    /*
    socket.emit("yourID", socket.id);
    io.sockets.emit("allUsers", users);
    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('callReceived', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
*/
    //end of new code

    socket.on("disconnect", () => {
        user_Disconnect(socket.id);
        console.log(socket.id)
        console.log("user disconnected");
     });
});

app.use(formData.parse({}))
app.use(formData.format())
app.use(formData.stream())
app.use(formData.union())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()
app.use(router)

server.listen(PORT, (err) => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`)
    return console.log(`Server is Listening on: http://localhost:${PORT}/`)
})

routes(router)

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(404).send("Sorry can't find that!")
})