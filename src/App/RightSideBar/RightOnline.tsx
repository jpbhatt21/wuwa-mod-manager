import {
	apiRoutes,
	getTimeDifference,
	localDataAtom,
	localModListAtom,
	onlineDownloadListAtom,
	onlineModeAtom,
	onlineSelectedItemAtom,
	rightSidebarOpenAtom,
	textDataAtom,
} from "@/utils/vars";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Disc, Download, EllipsisVerticalIcon, Loader2, Redo2, Upload } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import { useInstalledItems } from "@/utils/commonHooks";
import { modRouteFromURL, refreshRootDir, saveConfig } from "@/utils/fsUtils";
import { DownloadItem, LocalData, OnlineMod } from "@/utils/types";

interface ModFile {
	_idRow: number;
	_sFile: string;
	_nFilesize: number;
	_sDescription: string;
	_tsDateAdded: number;
	_nDownloadCount: number;
	_sDownloadUrl: string;
	_sMd5Checksum: string;
}

interface ModUpdateChangeLog {
	_sTitle: string;
	text: string;
	cat: string;
}

interface ModUpdate {
	_sText: string;
	_sTitle: string;
	_tsDateAdded: number;
	_sVersion: string;
	_aChangeLog?: ModUpdateChangeLog[];
}

interface ModItemState extends Partial<OnlineMod> {
	status?: string;
	loaded?: boolean;
	_aFiles?: ModFile[];
	_aCategory?: { _sName: string };
	_sText?: string;
	_eUpdate?: ModUpdate;
	_sUpdateName?: string;
	_sUpdateVersion?: string;
	_sUpdateDate?: number;
	_aUpdateChangeLog?: ModUpdateChangeLog[];
	_sUpdateText?: string;
}

let now = Math.round(Date.now() / 1000);
let cache = new Map<string, ModItemState>();
let cur: string;

function RightOnline() {
	const textData = useAtomValue(textDataAtom);
	const setOnlineDownloadList = useSetAtom(onlineDownloadListAtom);
	const onlineSelectedItem = useAtomValue(onlineSelectedItemAtom);
	const online = useAtomValue(onlineModeAtom);
	const installedItems = useInstalledItems();
	const type = (() => {
		const installedItem = installedItems.installed.find(
			(item) => item.source && onlineSelectedItem.includes(modRouteFromURL(item.source))
		);
		return installedItem
			? installedItem.modStatus
				? textData.generic.Update
				: textData._RightSideBar._RightOnline.Reinstall
			: textData.generic.Install;
	})();
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [specialPopoverOpen, setSpecialPopoverOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const [aboutOpen, setAboutOpen] = useState(true);
	const [item, setItem] = useState<ModItemState>({});
	const setRightSidebarOpen = useSetAtom(rightSidebarOpenAtom);
	const setLocalData = useSetAtom(localDataAtom);
	const setLocalModList = useSetAtom(localModListAtom);
	cur = onlineSelectedItem.split("/").slice(-1)[0];
	useEffect(() => {
		const controller = new AbortController();
		now = Math.round(Date.now() / 1000);
		if (onlineSelectedItem != "-1" && online) {
			setRightSidebarOpen(true);
			if (cache.has(cur)) {
				const cachedItem = cache.get(cur);
				if (cachedItem) {
					setItem(cachedItem);
				}
				setAboutOpen(true);
				setUpdateOpen(false);
				setPopoverOpen(false);
				setSpecialPopoverOpen(false);
			} else setItem((prev) => ({ ...prev, status: "Loading", loaded: false }));
			fetch(apiRoutes.modUpdates(onlineSelectedItem), { signal: controller.signal })
				.then((res) => res.json())
				.then((data) => {
					fetch(apiRoutes.mod(onlineSelectedItem), { signal: controller.signal })
						.then((res) => res.json())
						.then((data2) => {
							if (data._aRecords && data._aRecords.length > 0) {
								data2._eUpdate = true;
								data2._sUpdateText = data._aRecords[0]._sText;
								data2._sUpdateVersion = data._aRecords[0]._sVersion;
								data2._sUpdateDate = data._aRecords[0]._tsDateModified || data._aRecords[0]._tsDateAdded;
								data2._aUpdateChangeLog = data._aRecords[0]._aChangeLog;
								data2._sUpdateName = data._aRecords[0]._sName;
							}
							data2.loaded = true;
							data2.status = "Loaded";
							cache.set(data2._idRow, data2);
							if (data2._idRow != cur) return;
							setAboutOpen(true);
							setUpdateOpen(false);
							setItem(data2);
						});
				});
		} else {
			setItem((prev: any) => ({ ...prev, status: "Select an Item", loaded: false }));
		}
		return () => {
			controller.abort();
		};
	}, [onlineSelectedItem, online]);
	useEffect(() => {
		if (item?._sProfileUrl) {
			const installedItem = installedItems.installed.find(
				(it) => it.source && item._sProfileUrl && item._sProfileUrl.includes(it.source)
			);
			if (installedItem) {
				setLocalData((prevData: LocalData) => {
					if (installedItem.name)
						prevData[installedItem.name] = {
							...prevData[installedItem.name],
							viewedAt: now * 1000,
						};
					return { ...prevData };
				});
				(async () => {
					//console.log("stage 3");
					let items = await refreshRootDir("");
					setLocalModList(items);
					saveConfig();
				})();
			}
		}
	}, [item]);
	const popoverContent = item._aFiles?.map((file: any) => (
		<Button
			className="min-h-fit flex items-center justify-center w-full gap-1 p-2 overflow-hidden"
			onClick={() => {
				setOnlineDownloadList((prev) => {
					let temp = [...prev];
					let dlitem = {
						status: "pending",
						addon: specialPopoverOpen,
						preview:
							item._aPreviewMedia && item._aPreviewMedia._aImages && item._aPreviewMedia._aImages.length > 0
								? item._aPreviewMedia._aImages[0]._sBaseUrl + "/" + item._aPreviewMedia._aImages[0]._sFile
								: "",
						category: item._aCategory?._sName || textData._RightSideBar._RightOnline.Unknown,
						source: item._sProfileUrl || "",
						file: file._sDownloadUrl,
						updated: file._tsDateAdded,
						name: item._sName + (specialPopoverOpen ? ` - ${file._sFile}` : ""),
						fname: file._sFile,
					} as DownloadItem;
					let count = 1;
					while (temp.find((x) => x.name == dlitem.name && x.fname == dlitem.fname)) {
						dlitem.name = `${item._sName} (${count})`;
						count++;
					}
					for (let i = 0; i <= temp.length; i++) {
						if (i == temp.length) {
							temp.push(dlitem);
							return temp;
						} else if (temp[i].status == "completed" || temp[i].status == "failed") {
							temp = [...temp.slice(0, i), { ...dlitem }, ...temp.slice(i)];
							break;
						}
					}
					return temp;
				});
				setPopoverOpen(false);
			}}
		>
			<div className="w-54 text-start flex flex-col gap-1">
				<p className="w-54 text-ellipsis wrap-break-word overflow-hidden text-base resize-none">{file._sFile}</p>
				<div className="text-background flex flex-wrap w-full gap-1 text-xs">
					{file._sAnalysisResultCode == "contains_exe" ? (
						<div className=" w-12 px-1 text-center bg-red-300 rounded-lg">exe</div>
					) : (
						""
					)}
					{file._sAnalysisState == "done" ? (
						<>
							{file._sAvastAvResult == "clean" ? (
								<div className=" w-16 px-1 text-center bg-green-300 rounded-lg">AvastAV</div>
							) : (
								<div className=" w-16 px-1 text-center bg-red-300 rounded-lg">AvastAV</div>
							)}
							{file._sClamAvResult == "clean" ? (
								<div className=" w-16 px-1 text-center bg-green-300 rounded-lg">ClamAV</div>
							) : (
								<div className=" w-16 px-1 text-center bg-red-300 rounded-lg">ClamAV</div>
							)}
						</>
					) : (
						<div className=" w-12 px-1 text-center bg-yellow-300 rounded-lg">pending</div>
					)}
				</div>
				<p className="w-54 text-ellipsis brightness-75 wrap-break-word overflow-hidden text-xs resize-none">
					{file._sDescription}
				</p>
			</div>
			<div className="min-w-20 flex flex-col items-center">
				{getTimeDifference(now, file._tsDateAdded)}
				<div className=" item flex w-10 gap-1">
					{" "}
					<Download />
					{file._nDownloadCount}
				</div>
				<div className=" flex gap-1">
					{" "}
					<Disc />
					{file._nFilesize < 100
						? file._nFilesize.toFixed(2) + "B"
						: file._nFilesize < 100000
						? (file._nFilesize / 1000).toFixed(2) + "KB"
						: file._nFilesize < 100000000
						? (file._nFilesize / 1000000).toFixed(2) + "MB"
						: (file._nFilesize / 1000000000).toFixed(2) + "GB"}
				</div>
			</div>
		</Button>
	));
	return (
		<div
			className="flex flex-col items-center w-full h-full overflow-hidden duration-300"
			style={{
				opacity: online ? 1 : 0,
				transitionDelay: online ? "0.3s" : "0s",
				pointerEvents: online ? "auto" : "none",
				marginLeft: "-100%",
			}}
		>
			<div
				className="absolute flex items-center min-h-full gap-2 pointer-events-none"
				style={{
					opacity: !item.loaded ? 1 : 0,
				}}
			>
				{item.status == "Loading" ? <Loader2 className="animate-spin text-accent w-8 h-8" /> : <></>}
				<div className="text-accent text-xl">{item.status}</div>
			</div>
			<div className="text-accent min-h-16 flex items-center justify-start w-full gap-3 px-3 border-b">
				<Label key={item._sName} className="w-full text-xl text-center" style={{ opacity: !item.loaded ? 0 : 1 }}>
					{item._sName}
				</Label>
			</div>
			<div
				className="flex flex-col w-full pb-2 mb-24 overflow-hidden overflow-y-scroll"
				style={{
					opacity: !item.loaded ? 0 : 1,
				}}
			>
				{
					<div key={item._sName + "pix"} className="max-h-59 flex flex-col w-full gap-2 px-2 mt-2 mb-3">
						<Dialog>
							<DialogTrigger asChild>
								<div className=" flex flex-col items-center w-full max-h-full gap-1 overflow-hidden pointer-events-none">
									{item._aPreviewMedia && item._aPreviewMedia._aImages && item._aPreviewMedia._aImages.length > 0 && (
										<Carousel data={item._aPreviewMedia._aImages} />
									)}
								</div>
							</DialogTrigger>
							<DialogContent className="min-w-180 wuwa-ft min-h-140 bg-background/50 border-border flex flex-col items-center gap-4 p-4 overflow-hidden border-2 rounded-lg">
								<div className="min-h-fit text-accent my-6 text-3xl">{textData._RightSideBar._RightOnline.Preview}</div>
								{item._aPreviewMedia && item._aPreviewMedia._aImages && item._aPreviewMedia._aImages.length > 0 && (
									<div className="flex flex-col w-full h-full overflow-hidden gap-2 rounded-lg">
										<Carousel data={item._aPreviewMedia._aImages} big={true} />
									</div>
								)}
							</DialogContent>
						</Dialog>
					</div>
				}
				{item._sText && (
					<Collapsible
						key={item._sName + "abt"}
						className="w-full px-2 pb-3"
						open={aboutOpen}
						onOpenChange={setAboutOpen}
					>
						<CollapsibleTrigger className="text-accent flex items-center justify-between w-full h-8">
							<Button
								className={
									"w-full flex justify-between bg-accent text-background " +
									(aboutOpen ? "hover:brightness-125" : "bg-input/50 text-accent hover:text-accent hover:bg-input")
								}
							>
								{textData._RightSideBar._RightOnline.About}{" "}
								<ChevronDown
									id="deschev"
									className=" transform-[roate(180deg)] duration-200"
									style={{ transform: aboutOpen ? "rotate(180deg)" : "rotate(0deg)" }}
								/>
							</Button>
						</CollapsibleTrigger>
						<CollapsibleContent className="border-accent w-full pt-2 pl-2 mt-2">
							<div className="w-full font-sans" dangerouslySetInnerHTML={{ __html: item._sText }}></div>
						</CollapsibleContent>
					</Collapsible>
				)}
				{item._eUpdate && (
					<Collapsible
						key={item._sName + "upd"}
						className=" w-full px-2 pt-1 pb-1"
						open={updateOpen}
						onOpenChange={setUpdateOpen}
					>
						<CollapsibleTrigger className="text-accent flex items-center justify-between w-full h-8">
							<Button
								className={
									"w-full flex justify-between bg-accent text-background " +
									(updateOpen ? "hover:brightness-125" : "bg-input/50 text-accent hover:text-accent hover:bg-input")
								}
							>
								{textData._RightSideBar._RightOnline.LatestUpd}{" "}
								<ChevronDown
									id="deschev"
									className=" transform-[roate(180deg)] duration-200"
									style={{ transform: updateOpen ? "rotate(180deg)" : "rotate(0deg)" }}
								/>
							</Button>
						</CollapsibleTrigger>
						<CollapsibleContent className="border-accent flex flex-col w-full gap-4 px-2 pt-2 mt-2">
							<div className="text-accent flex items-center justify-between pb-4 border-b">
								{item._sUpdateName}
								<label className="flex flex-col text-xs text-gray-300">
									{" "}
									<label>{item._sUpdateVersion}</label>{" "}
									<label className=" text-cyan-200">{getTimeDifference(now, item._sUpdateDate || 0)}</label>
								</label>
							</div>
							<div className=" flex flex-col gap-2">
								{item._aUpdateChangeLog &&
									item._aUpdateChangeLog.map((changeItem, index: number) => (
										<div key={index} className="flex items-center gap-2">
											<div className="min-w-2 min-h-2 self-start mt-1.75 bg-accent rounded-full" />
											<label className=" text-cyan-50 text-sm font-sans">
												{changeItem.text}- [{changeItem.cat}]
											</label>
										</div>
									))}
							</div>
							{item._sUpdateText && (
								<div className="w-full font-sans" dangerouslySetInnerHTML={{ __html: item._sUpdateText }} />
							)}
						</CollapsibleContent>
					</Collapsible>
				)}
			</div>
			<div
				className="text-accent min-h-22 h-22 min-w-84 absolute bottom-0 flex items-center justify-center gap-3 px-3 border-t"
				style={{
					opacity: !item.loaded ? 0 : 1,
				}}
			>
				<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
					<PopoverTrigger
						style={{ width: `${type == "Install" ? "19.5rem" : "16.5rem"}` }}
						className="flex h-10 gap-4 overflow-hidden text-ellipsis bg-button text-accent shadow-xs hover:brightness-120  duration-300  items-center justify-center active:scale-90 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
						disabled={!item._aFiles || item._aFiles?.length == 0}
					>
						{{ Install: <Download />, Reinstall: <Redo2 />, Update: <Upload /> }[type]}
						{type}
					</PopoverTrigger>
					<PopoverContent
						className="w-80 max-h-[75vh] overflow-auto gap-1 bg-sidebar p-1 flex flex-col"
						style={{ marginLeft: type == "Install" ? "0rem" : "3rem", marginBottom: "0.5rem" }}
					>
						{popoverContent}
					</PopoverContent>
				</Popover>
				{type !== "Install" && (
					<Popover open={specialPopoverOpen} onOpenChange={setSpecialPopoverOpen}>
						<PopoverTrigger
							className="w-9 flex h-10 gap-4 overflow-hidden text-ellipsis bg-button text-accent shadow-xs hover:brightness-120  duration-300  items-center justify-center active:scale-90 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
							disabled={!item._aFiles || item._aFiles?.length == 0}
						>
							<EllipsisVerticalIcon />
						</PopoverTrigger>
						<PopoverContent className="w-80 mr-2 mb-2 max-h-[75vh] overflow-auto gap-1 bg-sidebar p-1 flex flex-col">
							<Label className=" text-accent pl-1 py-0.5">{textData._RightSideBar._RightOnline.Sep}</Label>
							{popoverContent}
						</PopoverContent>
					</Popover>
				)}
			</div>
		</div>
	);
}
export default RightOnline;
