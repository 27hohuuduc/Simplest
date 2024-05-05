import * as vscode from 'vscode';
import HiddenContext from './hidden';

let save: Function;

export function activate({ subscriptions, workspaceState }: vscode.ExtensionContext) {

	const state = workspaceState.get<boolean>("state", false);
	const hiddenContext = new HiddenContext(state);
	save = () => {
		workspaceState.update("state", hiddenContext.state);
	};

	vscode.window.showInformationMessage("Watch more on Github", "Click here").then(item => {
		vscode.env.openExternal(vscode.Uri.parse(
			'https://github.com/27hohuuduc'));
	});

	vscode.workspace.onDidChangeTextDocument(event => {
		vscode.commands.executeCommand('setContext', 'isFileModified', true);
	});

	subscriptions.concat([
		hiddenContext.registerstatusBarHidden,
		hiddenContext.statusBarHidden
	]);

}

export function deactivate() {
	save();
}