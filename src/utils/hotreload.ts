import { invoke } from "@tauri-apps/api/core";
import { logger } from "./logger";

/**
 * Sets the hotreload functionality for the mod manager.
 * @param enabled - 0 = disabled, 1 = enabled (mod manager), 2 = enabled (target game)
 * @throws {Error} If the hotreload operation fails
 */
export async function setHotreload(enabled: 0 | 1 | 2): Promise<void> {
	try {
		await invoke("set_hotreload", { enabled: enabled ? true : false });
		if (enabled) {
			await invoke("set_window_target", { targetGame: enabled == 2 });
			await startWindowMonitoring();
		} else await stopWindowMonitoring();
	} catch (error) {
		logger.error("Failed to set hotreload:", error);
		throw error;
	}
}

/**
 * Starts monitoring the target window for hotreload functionality.
 * @throws {Error} If window monitoring fails to start
 */
export async function startWindowMonitoring(): Promise<void> {
	try {
		await invoke("start_window_monitoring");
	} catch (error) {
		logger.error("Failed to start window monitoring:", error);
		throw error;
	}
}
export async function stopWindowMonitoring(): Promise<void> {
	try {
		await invoke("stop_window_monitoring");
	} catch (error) {
		logger.error("Failed to stop window monitoring:", error);
		throw error;
	}
}

export async function setChange(trigger = true): Promise<void> {
	try {
		await invoke("set_change", { trigger });
	} catch (error) {
		logger.error("Failed to set change trigger:", error);
		throw error;
	}
}
export async function enableHotreload(target_game:boolean): Promise<void> {
	try {
		await setHotreload(target_game ? 2 : 1);
		await startWindowMonitoring();
	} catch (error) {
		logger.error("Failed to enable hotreload:", error);
		throw error;
	}
}
export async function disableHotreload(): Promise<void> {
	try {
		await setHotreload(0);
		await stopWindowMonitoring();
	} catch (error) {
		logger.error("Failed to disable hotreload:", error);
		throw error;
	}
}

export function useHotreload() {
	return {
		setHotreload,
		startWindowMonitoring,
		stopWindowMonitoring,
		enableHotreload,
		disableHotreload,
	};
}
export async function isGameProcessRunning(): Promise<boolean> {
	try {
		const isRunning = await invoke<boolean>("is_game_process_running");
		//logger.log(`Game process running: ${isRunning}`);
		return isRunning;
	} catch (error) {
		logger.error("Failed to check if game process is running:", error);
		return false;
	}
}
