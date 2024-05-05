import * as vscode from 'vscode';

const commandId = "Suy.hidden";

export default class HiddenContext {

    private _state: boolean = false;

    public get state() {
        return this._state;
    }

    public get statusBarHidden() {
        const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
        statusBar.command = commandId;
        statusBar.text = `$(eye) Hidden`;
        statusBar.tooltip = "Show/hide necessary things";
        statusBar.show();
        return statusBar;
    }

    public get registerstatusBarHidden() {
        return vscode.commands.registerCommand(commandId, async () => {
            const myConfig = vscode.workspace.getConfiguration("simplest");
            let obj: Record<string, boolean> = {};

            (myConfig.get("include") as string[]).forEach(value => {
                obj[value] = this._state;
            });

            this._state = !this._state;

            const filesConfig = vscode.workspace.getConfiguration("files");
            filesConfig.update("exclude", obj, vscode.ConfigurationTarget.Workspace);
        });
    }

    constructor(state: boolean) {
        this._state = state;
    }

}