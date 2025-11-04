import { path } from "@tauri-apps/api";
import { check, type Update } from "@tauri-apps/plugin-updater";
import { exists, writeTextFile, readTextFile } from "@tauri-apps/plugin-fs";
import * as defConfig from "../default.json";
import { currentMonitor, PhysicalSize } from "@tauri-apps/api/window";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { getDirResructurePlan, saveConfig, setRoot, updateIni } from "./fsUtils";
import {
	categoryListAtom,
	firstLoadAtom,
	languageAtom,
	localDataAtom,
	localPresetListAtom,
	modRootDirAtom,
	onlineTypeAtom,
	settingsDataAtom,
	store,
	updateInfo,
	updaterOpenAtom,
	updateWWMMAtom,
} from "./vars";
import { setupImageServerListeners } from "./imageServer";
import { isGameProcessRunning, setHotreload } from "./hotreload";
import { registerGlobalHotkeys } from "./hotkeyUtils";
import { invoke } from "@tauri-apps/api/core";
import { executeWWMI } from "./processUtils";
import { Settings, OnlineMod } from "./types";
import { HEALTH_CHECK, TEMP_CAT, VERSION } from "./consts";
export const window = getCurrentWebviewWindow();
invoke("get_username");
export const RESTORE = "DISABLED_RESTORE";
export const IGNORE = "IGNORE";
export const UNCATEGORIZED = "Uncategorized";
export function setWindowType(type: number) {
	if (type == 0) {
		window.setFullscreen(false);
		window.setDecorations(true);
		currentMonitor().then((x) => {
			if (x?.size) window.setSize(new PhysicalSize(x.size.width * 0.8, x.size.height * 0.8));
		});
	} else if (type == 1) {
		window.setFullscreen(false);
		window.setDecorations(false);
		currentMonitor().then((x) => {
			if (x?.size) window.setSize(new PhysicalSize(x.size.width * 0.8, x.size.height * 0.8));
		});
	} else if (type == 2) {
		window.setFullscreen(true);
	}
}
let firstLoad = false;
let config = { ...defConfig };

export async function main() {
	updateInfo("Fetching categories...");

	const fetchWithRetry = async (url: string, timeouts: number[] = [2000, 5000]): Promise<any> => {
		for (let i = 0; i < timeouts.length; i++) {
			try {
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), timeouts[i]);

				const response = await fetch(url, { signal: controller.signal });
				clearTimeout(timeoutId);

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}`);
				}

				return await response.json();
			} catch (error) {
				if (i === timeouts.length - 1) {
					return TEMP_CAT
				}

				updateInfo(`Connection timeout, retrying...`);
			}
		}
	};
	try {
		const data = await fetchWithRetry(
			"https://gamebanana.com/apiv11/Mod/Categories?_idCategoryRow=29524&_sSort=a_to_z&_bShowEmpty=true"
		);

		store.set(categoryListAtom, [
			...data.filter((x: OnlineMod) => x._idRow !== 31838),
			{
				_idRow: 31838,
				_sName: "NPCs & Entities",
				_nItemCount: 12,
				_nCategoryCount: 0,
				_sUrl: "https://gamebanana.com/mods/cats/31838",
				_sIconUrl: "https://images.gamebanana.com/img/ico/ModCategory/66e0d90771ac5.png",
			},
			{
				_special: true,
				_idRow: 29493,
				_sName: "Other",
				_nItemCount: 75,
				_nCategoryCount: 0,
				_sUrl: "https://gamebanana.com/mods/cats/29493",
				_sIconUrl: "https://images.gamebanana.com/img/ico/ModCategory/6692c90cba314.png",
			},
			{
				_special: true,
				_idRow: 29496,
				_sName: "UI",
				_nItemCount: 55,
				_nCategoryCount: 0,
				_sUrl: "https://gamebanana.com/mods/cats/29496",
				_sIconUrl: "https://images.gamebanana.com/img/ico/ModCategory/6692c913ddf00.png",
			},
		]);
		updateInfo("Categories loaded successfully.");
	} catch (error: any) {
		updateInfo("Network error, refresh to try again.", -1);
		return;
	}
	const apd = (await path.dataDir()) + "\\XXMI Launcher\\WWMI\\Mods";
	const epd = apd.replace("WWMI\\Mods", "Resources\\Bin\\XXMI Launcher.exe");
	updateInfo("Checking configuration...");
	if (await exists("config.json")) config = JSON.parse(await readTextFile("config.json"));
	else {
		updateInfo("Config file not found, creating default config.");

		writeTextFile("config.json", JSON.stringify(defConfig, null, 2));
		firstLoad = true;
		config = { ...defConfig };
	}
	updateInfo("Applying configuration...");
	setWindowType(config.settings.type);
	const bg = document.querySelector("body");
	if (bg)
		bg.style.backgroundColor =
			"color-mix(in oklab, var(--background) " + config.settings.opacity * 100 + "%, transparent)";
	if (config.dir == "") {
		firstLoad = true;
		if (await exists(apd)) {
			config.dir = apd;
		}
		if (await exists(epd)) {
			config.settings.appDir = epd;
		}
	}
	if (config.settings.launch && config.settings.appDir) {
		(async () => {
			if (!(await isGameProcessRunning())) {
				executeWWMI(config.settings.appDir);
			}
		})();
	}
	store.set(firstLoadAtom, firstLoad);
	store.set(modRootDirAtom, config.dir);
	setRoot(config.dir);
	store.set(localPresetListAtom, config.presets);
	store.set(localDataAtom, config.data);

	// Check for updates with 2-second timeout
	let update: Update | null = null;
	try {
		const timeoutPromise = new Promise<never>((_, reject) =>
			setTimeout(() => reject(new Error("Update check timeout")), 2000)
		);
		update = await Promise.race([check(), timeoutPromise]);
	} catch (error) {
		// If check fails or times out, update remains null
		update = null;
	}

	if (update) {
		let lang = config.settings.lang;
		let parsedBody = {};
		if (update.body) {
			try {
				parsedBody = JSON.parse(update.body);
				parsedBody = parsedBody[lang as keyof typeof parsedBody] || parsedBody;
			} catch (e) {
				parsedBody = {};
			}
		}
		store.set(updateWWMMAtom, {
			version: update.version,
			date: update.date || "",
			body: JSON.stringify(parsedBody) || "{}",
			status: "available",
			raw: update,
		});
		if (update.version > config.settings.ignore) {
			store.set(updaterOpenAtom, true);
			config.settings.ignore = update.version;
		}
	}
	
	// Validate and merge settings with defaults
	const defaultSettings = defConfig.settings as Settings;
	const mergedSettings = { ...defaultSettings };
	
	// Merge existing settings, ensuring all required keys exist
	if (config.settings) {
		Object.keys(defaultSettings).forEach(key => {
			if (config.settings.hasOwnProperty(key)) {
				(mergedSettings as any)[key] = config.settings[key as keyof Settings];
			}
		});
		
		// Handle nested hotKeys object
		if (config.settings.hotKeys && typeof config.settings.hotKeys === 'object') {
			mergedSettings.hotKeys = { ...defaultSettings.hotKeys, ...config.settings.hotKeys };
		}
	}
	
	// Update config with merged settings
	config.settings = mergedSettings;
	
	store.set(settingsDataAtom, config.settings as Settings);
	store.set(languageAtom, config.settings.lang as any);
	if (config.settings.hotReload == 1) {
		updateIni(0);
	} else {
		updateIni(1);
	}

	store.set(onlineTypeAtom, config.settings.onlineType ?? "Mod");
	if (!firstLoad) {
		if (config.settings.clientDate) fetch(`${HEALTH_CHECK}/${VERSION||"2.0.1"}/${config.settings.clientDate}`);
		else {
			fetch(`${HEALTH_CHECK}/${VERSION||"2.0.1"}/_${Date.now()}`)
				.then((res) => res.json())
				.then((data) => {
					if (data.client) {
						config.settings.clientDate = data.client;
						store.set(settingsDataAtom, config.settings as Settings);
						saveConfig();
					}
				});
		}
	}
	updateInfo("Getting directory info...");
	if (!firstLoad) {
		getDirResructurePlan();
	}
	updateInfo("Initialization complete.", 2000);

	setupImageServerListeners();

	setHotreload(config.settings.hotReload as 0 | 1 | 2);

	await registerGlobalHotkeys();
}
