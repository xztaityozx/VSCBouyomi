'use strict';
import * as vscode from 'vscode';
import * as bouyomitcp from "./bouyomiTCPclient";
import {textUtils} from "./textUtil";

const prefixMsg: string = "VSCBouyomi: ";

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "vscbouyomi" is now active!');
    const client = new bouyomitcp.Bouyomi.BouyomiTCPClientWrapper("localhost",50001);
    const config = vscode.workspace.getConfiguration("vscbouyomi");

    const skipCommand = vscode.commands.registerCommand("vscbouyomi.skip",()=>{
        client.skip();
        vscode.window.showInformationMessage(`${prefixMsg}Skip`);
    });

    const pauseCommand = vscode.commands.registerCommand("vscbouyomi.pause",()=>{
        client.pause();
        vscode.window.showInformationMessage(`${prefixMsg}Pause`);
    });

    const resumeCommand=vscode.commands.registerCommand("vscbouyomi.resume",()=>{
        client.resume();
        vscode.window.showInformationMessage(`${prefixMsg}Resume`);
    });

    const clearCommand=vscode.commands.registerCommand("vscbouyomi.clear",()=>{
        client.clear();
        vscode.window.showInformationMessage(`${prefixMsg}Clear`);
    });

    let talkCommand = vscode.commands.registerCommand('vscbouyomi.talk', () => {

        const voice = config.get("voice",0);
        const tone = config.get("tone",-1);
        const speed= config.get("speed",-1);
        const volume= config.get("volume",-1);
        const code = config.get("encoding","utf-8");

        const editor = vscode.window.activeTextEditor;
        if(!editor) {
            return;
        }

        const doc = editor.document;
        const delim=config.get("delimitor",[doc.eol.toString()]);

        const text = editor.selection.isEmpty ? doc.getText() : doc.getText(editor.selection);
        

        textUtils.getTextArray(text,delim).forEach((item: string )=>{
            if(text.length===0) { return; }
            client.talk(item,code,speed,tone,volume,voice);
        });
        vscode.window.showInformationMessage(`${prefixMsg}Talk Task had send`);
    });

    context.subscriptions.push(client);
    context.subscriptions.push(talkCommand);
    context.subscriptions.push(skipCommand);
    context.subscriptions.push(pauseCommand);
    context.subscriptions.push(resumeCommand);
    context.subscriptions.push(clearCommand);
}


export function deactivate() {
}