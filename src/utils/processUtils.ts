import { invoke } from "@tauri-apps/api/core";
import { logger } from "./logger";

export async function executeWithArgs(exePath: string, args: string[]): Promise<string> {
	try {
		const result = await invoke<string>("execute_with_args", { 
			exePath: exePath, 
			args: args 
		});
		//logger.log(`Successfully executed: ${exePath} with args:`, args);
		return result;
	} catch (error) {
		logger.error(`Failed to execute ${exePath}:`, error);
		throw error;
	}
}
export async function executeWWMI(
	exePath: string, 
	useNoGui: boolean = true, 
	useXxmi: boolean = true
): Promise<string> {
	const args: string[] = [];
	
	if (useNoGui) {
		args.push("--nogui");
	}
	
	if (useXxmi) {
		args.push("--xxmi", "WWMI");
	}
	
	return executeWithArgs(exePath, args);
}