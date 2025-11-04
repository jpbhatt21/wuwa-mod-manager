import { PRIORITY_KEYS } from "./consts";
import { register, unregisterAll } from "@tauri-apps/plugin-global-shortcut";
import { store, localPresetListAtom, localSelectedPresetAtom, localModListAtom, modRootDirAtom } from "./vars";
import { applyPreset, refreshRootDir } from "./fsUtils";
import { invoke } from "@tauri-apps/api/core";
import { logger } from "./logger";
export function processHotkeyCode(code: string): string {
	return (
		code
			.toLowerCase()
			
			.replaceAll("key", "")
			.replaceAll("digit", "")
			.replaceAll("numpad", "")
			
			.replaceAll("plus", "+")
			.replaceAll("minus", "-")
			.replaceAll("multiply", "*")
			.replaceAll("divide", "/")
			.replaceAll("decimal", ".")
			.replaceAll("enter", "↵")
			
			.replaceAll("altright", "alt")
			.replaceAll("ctrlright", "ctrl")
			.replaceAll("shiftright", "shift")
			.replaceAll("altleft", "alt")
			.replaceAll("ctrlleft", "ctrl")
			.replaceAll("shiftleft", "shift")
			
			.replaceAll("arrow", "")
			
			.replaceAll("backquote", "`")
			.replaceAll("backslash", "\\")
			.replaceAll("bracketleft", "[")
			.replaceAll("bracketright", "]")
			.replaceAll("semicolon", ";")
			.replaceAll("quote", "'")
			.replaceAll("comma", ",")
			.replaceAll("period", ".")
			.replaceAll("slash", "/")
			.replaceAll("equal", "=")
			
			.replace(/^f(\d+)$/, "F$1")
			
			.replaceAll("space", "Space")
	);
}
export function formatHotkeyDisplay(hotkey: string): string {
	return hotkey.replaceAll("+", "xx+xx").replaceAll("comma", ",").replaceAll("space", "Space").replaceAll("plus", "+").replaceAll("minus", "-").replaceAll("multiply", "*").replaceAll("divide", "/").replaceAll("decimal", ".").replaceAll("enter", "↵").replaceAll("backquote", "`").replaceAll("backslash", "\\").replaceAll("bracketleft", "[").replaceAll("bracketright", "]").replaceAll("semicolon", ";").replaceAll("quote", "'").replaceAll("period", ".").replaceAll("slash", "/").replaceAll("equal", "=").replaceAll("xx+xx", " ﹢ ");
}
export function encodeHotkeyForStorage(displayString: string): string {
	return displayString.replaceAll(" ﹢ ", "xxplusxx").replaceAll(",", "comma").replaceAll("Space", "space").replaceAll("+", "plus").replaceAll("-", "minus").replaceAll("*", "multiply").replaceAll("/", "divide").replaceAll(".", "decimal").replaceAll("↵", "enter").replaceAll("`", "backquote").replaceAll("\\", "backslash").replaceAll("[", "bracketleft").replaceAll("]", "bracketright").replaceAll(";", "semicolon").replaceAll("'", "quote").replaceAll("=", "equal").replaceAll("xxplusxx", "+");
}
export function sortHotkeys(keys: string[]): string[] {
	const prioritySet = new Set<string>(PRIORITY_KEYS);
	const regularKeys = keys.filter((key) => !prioritySet.has(key));
	
	regularKeys.sort((a, b) => {
		if (a.length !== b.length) {
			return a.length - b.length;
		}
		return a.localeCompare(b);
	});
	
	const inputKeysSet = new Set(keys);
	const presentPriorityKeys = PRIORITY_KEYS.filter((key) => inputKeysSet.has(key));
	return [...presentPriorityKeys, ...regularKeys];
}
export function normalizeHotkey(hotkey: string): string {
	return hotkey.toLowerCase().replaceAll("alt", "Alt").replaceAll("control", "Ctrl").replaceAll("shift", "Shift").replaceAll("key", "").replaceAll("digit", "").replaceAll("numpad", "");
}
export async function registerGlobalHotkeys(): Promise<void> {
	try {
		await unregisterAll();
	} catch (error) {
		//logger.log("Error unregistering hotkeys:", error);
	}
	
	const currentPresets = store.get(localPresetListAtom);
	const validHotkeys = currentPresets.filter((preset) => preset.hotkey && preset.hotkey.trim() !== "").map((preset) => preset.hotkey);
	if (validHotkeys.length === 0) {
		//logger.log("No valid hotkeys found to register");
		return;
	}
	//logger.log("Registering hotkeys:", validHotkeys);
	await register(validHotkeys, (event) => {
		//logger.log("Hotkey pressed:", event);
		if (event.state === "Pressed") {
			
			const freshPresets = store.get(localPresetListAtom).filter(
				preset => preset.hotkey && preset.hotkey.trim() !== ""
			);
			
			let normalizedShortcut = event.shortcut
				.toLowerCase()
				.replaceAll("alt", "Alt")
				.replaceAll("control", "Ctrl")
				.replaceAll("shift", "Shift")
				.replaceAll("key", "")
				.replaceAll("digit", "")
				.replaceAll("numpad", "");
			normalizedShortcut = sortHotkeys(normalizedShortcut.split("+")).join("+").toLowerCase();
			
			const matchedPreset = freshPresets.find((preset) => {
				logger.debug("Comparing:", preset.hotkey, "vs", normalizedShortcut);
				return preset.hotkey.toLowerCase() === normalizedShortcut;
			});
			if (matchedPreset) {
				//logger.log("Matched preset:", matchedPreset);
				
				
				(async () => {
					try {
						
						const allPresets = store.get(localPresetListAtom);
						const presetIndex = allPresets.findIndex(p => p === matchedPreset);
						
						
						store.set(localSelectedPresetAtom, presetIndex);
						
						
						const rootDir = store.get(modRootDirAtom);
						
						
						await applyPreset(rootDir, matchedPreset);
						
						
						const updatedModList = await refreshRootDir("");
						store.set(localModListAtom, updatedModList);
						invoke('focus_mod_manager_send_f10_return_to_game')
						//logger.log("Preset applied successfully:", matchedPreset.name);
					} catch (error) {
						logger.error("Error applying preset:", error);
					}
				})();
			} else {
				//logger.log("No matching preset found for hotkey:", normalizedShortcut);
			}
		}
	});
}
