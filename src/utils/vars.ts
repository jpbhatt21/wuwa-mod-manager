import { FocusEvent, FocusEventHandler } from "react";
import { atom, createStore } from "jotai";
import type {
	TimeoutOrNull,
	Settings,
	DirRestructureItem,
	LocalData,
	Preset,
	LocalMod,
	Category,
	DownloadItem,
	OnlineData,
	InstalledListItem,
	UpdateInfo,
} from "./types";
import { TEXT } from "./consts";

function dontFocus(e: FocusEvent<HTMLInputElement, Element>): FocusEventHandler<HTMLInputElement> {
	e.preventDefault();
	e.stopPropagation();
	e.currentTarget.blur();
	return () => {};
}
const previewUri = "http://127.0.0.1:5000/preview/";
const store = createStore();
export const languageAtom = atom("en" as "en" | "cn" | "ru" | "jp" | "kr");
export const textDataAtom = atom(TEXT["jp"]);
const firstLoadAtom = atom(false);
const onlineModeAtom = atom(false);
const leftSidebarOpenAtom = atom(true);
const rightSidebarOpenAtom = atom(true);
const introOpenAtom = atom(true);
const tutorialPageAtom = atom(0);
const refreshAppIdAtom = atom(0);
const modRootDirAtom = atom("");
const settingsDataAtom = atom({} as Settings);
const categoryListAtom = atom([] as Category[]);
const progressOverlayDataAtom = atom({ title: "", open: false, finished: false });
const consentOverlayDataAtom = atom({
	title: "",
	from: [] as DirRestructureItem[],
	to: [] as DirRestructureItem[],
	next: false,
});
const localModListAtom = atom([] as LocalMod[]);
const localFilteredModListAtom = atom([] as LocalMod[]);
const localSearchTermAtom = atom("");
const localPresetListAtom = atom([] as Preset[]);
const localFilterNameAtom = atom("All");
const localCategoryNameAtom = atom("All");
const localSelectedModAtom = atom(0);
const localSelectedPresetAtom = atom(-1);
const localPathAtom = atom("");
const localDataAtom = atom({} as LocalData);
const installedItemsAtom = atom([] as InstalledListItem[]);
const updateCacheAtom = atom({} as { [key: string]: number });
const sortedInstalledItemsAtom = atom((get) => {
	const items = get(installedItemsAtom);
	return [...items].sort((a: InstalledListItem, b: InstalledListItem) => {
		const flagDiff = b.modStatus - a.modStatus;
		if (flagDiff !== 0) return flagDiff;
		return a.name
			.toLocaleLowerCase()
			.split("\\")
			.slice(-1)[0]
			.localeCompare(b.name.toLocaleLowerCase().split("\\").slice(-1)[0]);
	});
});
const onlinePathAtom = atom("home&type=Mod");
export const apiRoutes = {
	getCategoryList: () =>
		"https://gamebanana.com/apiv11/Mod/Categories?_idCategoryRow=29524&_sSort=a_to_z&_bShowEmpty=true",
	getGenericCategoryList: () =>
		"https://gamebanana.com/apiv11/Mod/Categories?_idGameRow=20357&_sSort=a_to_z&_bShowEmpty=true",
	home: ({ sort = "default", page = 1, type = "" }) =>
		`https://gamebanana.com/apiv11/Game/20357/Subfeed?${
			type && `_csvModelInclusions=${type}&`
		}_sSort=${sort}&_nPage=${page}`,
	category: ({ cat = "Skins", sort = "", page = 1 }) =>
		`https://gamebanana.com/apiv11/Mod/Index?_nPerpage=15&_aFilters%5BGeneric_Category%5D=${
			(cat.split("/").length > 1
				? store.get(categoryListAtom).find((x) => x._sName == cat.split("/")[1])?._idRow
				: genericCategories.find((x) => x._sName == cat.split("/")[0])?._idRow) || 0
		}&_sSort=${sort}&_nPage=${page}`,
	banner: () => "https://gamebanana.com/apiv11/Game/20357/TopSubs",
	mod: (modTitle = "Mod/0") => `https://gamebanana.com/apiv11/${modTitle}/ProfilePage`,
	modUpdates: (modTitle = "Mod/0") => `https://gamebanana.com/apiv11/${modTitle}/Updates?_nPage=1&_nPerpage=1`,
	search: ({ term, page = 1, type = "" }: { term: string; page?: number; type?: string }) =>
		`https://gamebanana.com/apiv11/Util/Search/Results?_sModelName=${type}&_sOrder=best_match&_idGameRow=20357&_sSearchString=${encodeURIComponent(
			term
		)}&_nPage=${page}`,
};
const onlineTypeAtom = atom("Mod");
const onlineSortAtom = atom("");
const onlineDataAtom = atom({ banner: [] } as OnlineData);
const onlineDownloadListAtom = atom([] as DownloadItem[]);
const onlineSelectedItemAtom = atom("-1");
const tutorialModeAtom = atom(false);
export const updaterOpenAtom = atom(false);
const genericCategories = [
	{
		_idRow: 29524,
		_sName: "Skins",
		_nItemCount: 1483,
		_nCategoryCount: 34,
		_sUrl: "https://gamebanana.com/mods/cats/29524",
		_sIconUrl: "https://images.gamebanana.com/img/ico/ModCategory/6654b6596ba11.png",
	},
	{
		_idRow: 29496,
		_sName: "UI",
		_nItemCount: 57,
		_nCategoryCount: 0,
		_sUrl: "https://gamebanana.com/mods/cats/29496",
		_sIconUrl: "https://images.gamebanana.com/img/ico/ModCategory/6692c913ddf00.png",
	},
	{
		_idRow: 29493,
		_sName: "Other",
		_nItemCount: 75,
		_nCategoryCount: 0,
		_sUrl: "https://gamebanana.com/mods/cats/29493",
		_sIconUrl: "https://images.gamebanana.com/img/ico/ModCategory/6692c90cba314.png",
	},
];
function getTimeDifference(startTimestamp: number, endTimestamp: number) {
	const secInMinute = 60;
	const secInHour = secInMinute * 60;
	const secInDay = secInHour * 24;
	const secInYear = secInDay * 365;
	const diff = Math.abs(endTimestamp - startTimestamp);
	if (diff < secInMinute) {
		return "now";
	} else if (diff < secInHour) {
		const minutes = Math.floor(diff / secInMinute);
		return minutes + "m";
	} else if (diff < secInDay) {
		const hours = Math.floor(diff / secInHour);
		return hours + "h";
	} else if (diff < secInYear) {
		const days = Math.floor(diff / secInDay);
		return days + "d";
	} else {
		const years = Math.floor(diff / secInYear);
		return years + "y";
	}
}
let infoBox = null as HTMLDivElement | null;
let hideTimeout: TimeoutOrNull = null;
function hideUpdateInfo() {
	if (!infoBox) return;
	infoBox.style.marginBottom = "-1.75rem";
}

export const updateWWMMAtom = atom(null as null | UpdateInfo);

export function updateInfo(text: string, duration = 5000) {
	if (!infoBox) infoBox = document.getElementById("update-info") as HTMLDivElement;
	if (!infoBox) return;
	infoBox.innerText = text;
	infoBox.style.marginBottom = "0";
	if (hideTimeout) clearTimeout(hideTimeout);
	if (duration > 0) hideTimeout = setTimeout(hideUpdateInfo, duration);
}
export {
	tutorialModeAtom,
	localSearchTermAtom,
	onlineTypeAtom,
	onlineSortAtom,
	dontFocus,
	previewUri,
	store,
	firstLoadAtom,
	onlineModeAtom,
	leftSidebarOpenAtom,
	rightSidebarOpenAtom,
	introOpenAtom,
	tutorialPageAtom,
	refreshAppIdAtom,
	modRootDirAtom,
	settingsDataAtom,
	categoryListAtom,
	progressOverlayDataAtom,
	consentOverlayDataAtom,
	localModListAtom,
	localFilteredModListAtom,
	localPresetListAtom,
	localFilterNameAtom,
	localCategoryNameAtom,
	localSelectedModAtom,
	localSelectedPresetAtom,
	localPathAtom,
	localDataAtom,
	installedItemsAtom,
	updateCacheAtom,
	sortedInstalledItemsAtom,
	onlinePathAtom,
	onlineDataAtom,
	onlineDownloadListAtom,
	onlineSelectedItemAtom,
	genericCategories,
	getTimeDifference,
};
