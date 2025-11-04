
import { Update } from "@tauri-apps/plugin-updater";
import { MouseEvent, UIEvent } from "react";
export interface CardLocalProps {
	root: string;
	item: LocalMod;
	selectedItem: number;
	setSelectedItem: (index: number) => void;
	index: number;
	lastUpdated: number;
	settings: Settings;
	deleteItem: (item: any) => void;
}
export interface CardOnlineProps extends OnlineMod {
	now: number;
	onModClick: (data: OnlineMod) => void;
	selected?: boolean;
	position?: number;
	index?: number;
	wwmm?: string;
	blur?: boolean;
}
export interface ProgressElements {
	bar: HTMLElement | null;
	percent: HTMLElement | null;
	message: HTMLElement | null;
}
export interface HotkeyProcessingOptions {
	includePriority?: boolean;
	caseSensitive?: boolean;
}
export interface ApiRouteParams {
	sort?: string;
	page?: number;
	category?: string;
}
export interface AtomState<T> {
	value: T;
	setValue: (value: T | ((prev: T) => T)) => void;
}
export interface LocalModState {
	list: LocalMod[];
	filtered: LocalMod[];
	selected: number;
	filter: string;
	category: string;
}
export interface OnlineModState {
	data: OnlineData;
	selected: string;
	downloads: DownloadItem[];
	path: string;
}
export interface FileOperationOptions {
	recursive?: boolean;
	overwrite?: boolean;
	createDirs?: boolean;
}
export interface DirectoryEntry {
	name: string;
	isDirectory: boolean;
	path: string;
}
export interface MainOnlineProps {
  max: number;
  count: number;
  online: boolean;
  loadMore: (e: MouseEvent<HTMLDivElement, MouseEvent> | UIEvent<HTMLDivElement>) => void;
}
export interface SanitizeOptions {
	replacement?: string;
	defaultName?: string;
	maxLength?: number;
}

export interface WWMMHotkey {
	name: string;
	type: string;
	value: string;
}
export interface ModHotkey {
	key: string;
	type: string;
	target: string;
	name: string;
}
export interface Settings {
	hotKeys: { [key: string]: WWMMHotkey };
	launch:0|1;
	appDir:string;
	hotReload: 0|1|2;
	toggle: 0 | 2;
	open: 0;
	opacity: number;
	type: 0 | 1 | 2;
	bgType: 0 | 1 | 2;
	listType: 0 | 1;
	onlineType: string;
	nsfw: 0 | 1 | 2;
	ignore: string;
	clientDate: string;
	lang: "en" | "cn" | "ru" | "jp" | "kr";
}
export interface DirRestructureItem {
	name: string;
	isDirectory?: boolean;
	icon?: string;
	children?: DirRestructureItem[];
}
export interface LocalDataContent {
	source?: string;
	updatedAt?: number;
	note?: string;
	viewedAt?: number;
}
export interface LocalData {
	[path: string]: LocalDataContent;
}
export interface Preset {
	name: string;
	data: string[];
	hotkey: string;
}
export interface InstalledListItem {
	name: string;
	source: string;
	updated: number;
	viewed: number;
	modStatus: number;
}
export interface LocalMod {
	name: string;
	isDir: boolean;
	path: string;
	truePath: string;
	parent: string;
	trueParent: string;
	preview: string;
	keys: ModHotkey[];
	enabled: boolean;
	children: LocalMod[];
	depth: number;
	source?: string;
	updatedAt?: number;
	note?: string;
	icon?: string;
}
export interface Category {
	_idRow: number;
	_sName: string;
	_nItemCount: number;
	_nCategoryCount: number;
	_sUrl: string;
	_sIconUrl: string;
	_special?: boolean;
}
export interface DownloadItem {
	status: "pending" | "downloading" | "completed" | "failed";
	preview: string;
	category: string;
	source: string;
	file: string;
	updated: number;
	name: string;
	fname: string;
	addon:boolean;
}
export interface OnlineModImage {
	_sType: string;
	_sBaseUrl: string;
	_sFile: string;
	_sFile220?: string;
	_hFile220?: number;
	_wFile220?: number;
	_sFile530?: string;
	_hFile530?: number;
	_wFile530?: number;
	_sFile100: string;
	_hFile100: number;
	_wFile100: number;
}
export interface OnlineModPreviewMedia {
	_aImages: OnlineModImage[];
}
export interface OnlineModSubmitter {
	_idRow: number;
	_sName: string;
	_bIsOnline: boolean;
	_bHasRipe?: boolean;
	_sProfileUrl: string;
	_sAvatarUrl: string;
	_sHdAvatarUrl: string;
	_sUpicUrl?: string;
	_sMoreByUrl?: string;
}
export interface OnlineModCategory {
	_sName: string;
	_sProfileUrl: string;
	_sIconUrl: string;
}
export interface OnlineMod {
	_idRow: number;
	_sModelName: string;
	_sSingularTitle?: string;
	_sIconClasses?: string;
	_sName: string;
	_sProfileUrl: string;
	_tsDateAdded?: number;
	_tsDateModified?: number;
	_tsDateUpdated?: number;
	_bHasFiles?: boolean;
	_aTags?: any[];
	_aPreviewMedia?: OnlineModPreviewMedia;
	_aSubmitter: OnlineModSubmitter;
	_aRootCategory: OnlineModCategory;
	_sVersion?: string;
	_bIsObsolete?: boolean;
	_sInitialVisibility: string;
	_bHasContentRatings?: boolean;
	_nLikeCount: number;
	_nPostCount: number;
	_bWasFeatured?: boolean;
	_nViewCount?: number;
	_bIsOwnedByAccessor?: boolean;
	_sImageUrl?: string;
	_sPeriod?: "today" | "yesterday" | "week" | "month" | "3month" | "6month" | "year" | "alltime";
}
export interface OnlineData {
	banner: OnlineMod[];
	[key: string]: OnlineMod[];
}
export type TimeoutOrNull = ReturnType<typeof setTimeout> | null;
export interface UpdateInfo {
	version: string;
	status: "available" | "downloading" | "ready" | "error" | "installed";
	date: string;
	body: string;
	raw:Update|null;
}