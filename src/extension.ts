import * as vscode from 'vscode';
import HiddenContext from './hidden';

const helpBtn = "Here";

let save: Function;

export function activate({ subscriptions, workspaceState }: vscode.ExtensionContext) {

	const state = workspaceState.get<boolean>("state", false);
	const hiddenContext = new HiddenContext(state);
	save = () => {
		workspaceState.update("state", hiddenContext.state);
	};

	vscode.window.showInformationMessage("Watch more on my Github.", helpBtn).then(item => {
		if (item === helpBtn) {
			vscode.env.openExternal(vscode.Uri.parse(
				'https://github.com/27hohuuduc'));
		}
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