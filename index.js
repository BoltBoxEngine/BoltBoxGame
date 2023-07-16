//Helper library that will handle connections to the BoltBox server as well as basic interface tools and whatnot

import ip from "ip";
import WebSocket from "ws";

export class BoltBoxGame{
    serverws = null;
    url = null;

    constructor(address, messageCallback) {
        console.log("BoltBoxGame constructor");
        this.url = address;
        console.log(this.url);
        this.url = new URL(this.url);
        this.messageCallback = messageCallback;
    }
    
    connectToServer() {
        //lets ws work over localhost and ipv4 (an in theory dedicated dns but that will require more work)
        //this.url = new URL(ip.address().toString());
        this.url.port = "8080";
        this.url.protocol = "ws";
        console.log(this.url.href);
        this.serverws = new WebSocket(this.url.href);
            
        this.serverws.onopen = () => {
            console.log("Connected to server");
        };
    
        this.serverws.onmessage = (message) => {
            //console.log(`Received message: ${message.data}`);
            this.handleData(message.data);
            this.messageCallback(message);
        };
    
        this.serverws.onclose = () => {
            console.log("server closed");
        }
    }

    handleData(data) {
        data = JSON.parse(data);
        //handle data from server
        if (data.type == "text") {
            console.log(data.data);
        }

        switch(data.type) {
            case "text":
                console.log(data.data);
                break;
            case "interface":
                console.log("Cannot process interface data yet");
                break;
            default:
                console.log("Unknown data type");
        }
    }
    
    messageFormater(type, data){
        return JSON.stringify({
            type:type,
            data:data
        });
    }

    defineCallback(messageCallback, userMessageCallback){
        this.messageCallback = messageCallback;
        this.userMessageCallback = userMessageCallback;
    }

}


