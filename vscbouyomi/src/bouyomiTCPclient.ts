"use strict";

import * as net from "net";
import { Disposable } from "vscode";

export module Bouyomi {
    export class BouyomiTCPClientWrapper{
        private client: Client;
        private disposable: Disposable;

        constructor(host: string="127.0.0.1",port: number=50001){
            this.client=new Client(host, port);
            
            const sub: Disposable[] = [];
            this.disposable=Disposable.from(...sub);
        }

        dispose(){
            this.disposable.dispose();
        }

        talk(text: string, code: string = "utf-8", speed: number = -1, interval: number = -1, volume: number = -1, voice: number = 0) {
            this.client.talk(text,code,speed,interval,volume,voice);
        }
        pause = () => this.client.pause();
        resume = () => this.client.resume();
        skip = () => this.client.skip();
        clear = () => this.client.clear();
    }


    export class Client {
        private host: string;
        private port: number;

        constructor(host: string="127.0.0.1", port: number=50001) {
            this.host = host;
            this.port = port;
        }

        talk(text: string, code: string = "utf-8", speed: number = -1, interval: number = -1, volume: number = -1, voice: number = 0) {

            if (!(volume === -1 || 0 <= volume && volume <= 100)) {
                throw new Error("volume must be -1 or 0~100");
            }

            if (!(interval === -1 || 50 <= interval && interval <= 200)) {
                throw new Error("interval must be -1 or 50~300");
            }

            if (!(speed === -1 || 50 <= speed && speed <= 300)) {
                throw new Error("speed must be -1 or 50~300");
            }

            if (!(0 <= voice && voice <= 8 || 10001 <= voice)) {
                throw new Error("voice must be 0~8 or 10001~");
            }

            const c = this.getCode(code);
            if (c === -1) {
                throw new Error("code must be utf-8,unicode or shift-jis");
            }


            var length = this.getTextLength(text, code);

            if(length<0) {
                text="文字列が長すぎました";
                length=this.getTextLength(text,code);
            }

            const inst = new Buffer(15 + length);
            inst.writeInt16LE(1, 0);
            inst.writeInt16LE(speed, 2);
            inst.writeInt16LE(interval, 4);
            inst.writeInt16LE(volume, 6);


            inst.writeInt16LE(voice, 8);
            inst.writeInt8(c, 10);
            inst.writeInt32LE(length, 11);
            inst.write(text, 15);

            this.send(inst);
        }

        pause() {
            this.send(new Buffer([0x10, 0x00]));
        }

        resume() {
            this.send(new Buffer([0x20, 0x00]));
        }

        skip() {
            this.send(new Buffer([0x30, 0x00]));
        }

        clear() {
            this.send(new Buffer([0x40, 0x00]));
        }

        private getCode(code: string) {
            return code === "utf-8" ? 0 : code === "unicode" ? 1 : code === "shift-jis" ? 2 : -1;
        }

        private getTextLength(text: string, code: string) {
            return new Buffer(text, code).length;
        }

        private send(inst: Buffer) {
            const client = new net.Socket();
            client.connect(this.port,
                this.host,
                () => {
                    console.log("Connect");
                    console.log(inst);
                    client.write(inst);
                });
        }
    }
}
