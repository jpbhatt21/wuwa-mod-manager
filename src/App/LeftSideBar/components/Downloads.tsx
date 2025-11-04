import { onlineDownloadListAtom, modRootDirAtom, localDataAtom, localModListAtom, leftSidebarOpenAtom, textDataAtom } from "@/utils/vars";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Check, Clock, FileQuestionIcon, Loader2, X } from "lucide-react";
import { createModDownloadDir, sanitizeFileName, saveConfig, validateModDownload, refreshRootDir } from "@/utils/fsUtils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";
import { DownloadItem, LocalData } from "@/utils/types";
let path = "";
let downloadElement: any = null;
let prev = 0;
const Icons = {
	pending: <Clock className="min-h-4 min-w-4" />,
	downloading: <Loader2 className="min-h-4 min-w-4 animate-spin" />,
	completed: <Check className="min-h-4 min-w-4" />,
	failed: <X className="min-h-4 min-w-4 text-red-300" />,
};
function Downloads() {
	const textData = useAtomValue(textDataAtom);
	const [onlineDownloadList, setOnlineDownloadList] = useAtom(onlineDownloadListAtom);
	const [localData, setLocalData] = useAtom(localDataAtom);
	const [dialogOpen, setDialogOpen] = useState(false);
	const leftSidebarOpen = useAtomValue(leftSidebarOpenAtom);
	const rootDir = useAtomValue(modRootDirAtom);
	const setLocalModList = useSetAtom(localModListAtom);
	const downloadRef = useRef<HTMLDivElement>(null);
	const downloadRef2 = useRef<HTMLDivElement>(null);
	const downloadRef3 = useRef<HTMLDivElement>(null);
	const downloadFile = async (root: string, item: DownloadItem) => {
		if (item.category == "Other/Misc") item.category = "Other";
		item.name = sanitizeFileName(item.name);
		item.name = (await createModDownloadDir(item.category, item.name)) ? "DISABLED_" + item.name : item.name;
		path = root + "\\" + item.category + "\\" + item.name;
		downloadElement = {
			name: item.name.replaceAll("DISABLED_", ""),
			path: "\\" + item.category + "\\" + item.name.replaceAll("DISABLED_", ""),
			source: item.source,
			updatedAt: item.updated * 1000,
		};
		setLocalData((prevData: LocalData) => {
			if (downloadElement.path)
				prevData[downloadElement.path] = {
					source: downloadElement.source,
					updatedAt: prevData[downloadElement.path]?.updatedAt || 0,
				};
			return { ...prevData };
		});
		let items = await refreshRootDir("");
		setLocalModList(items);
		saveConfig();
		invoke("download_and_unzip", {
			fileName: item.name,
			downloadUrl: item.file,
			savePath: path,
			emit: true,
		});
		invoke("download_and_unzip", {
			fileName: "preview",
			downloadUrl: item.preview,
			savePath: path,
			emit: false,
		});
	};
	useEffect(() => {
		listen("download-progress", (event) => {
			prev = event.payload as number;
			if (downloadRef.current) downloadRef.current.style.width = event.payload + "%";
			if (downloadRef2.current) downloadRef2.current.style.width = event.payload + "%";
			if (downloadRef3.current) {
				downloadRef3.current.style.background = "conic-gradient( var(--accent) 0% " + event.payload + "%, var(--button) 0% 100%)";
				downloadRef3.current.style.minHeight = event.payload == 0 ? "0rem" : "";
				downloadRef3.current.style.marginBottom = event.payload == 0 ? "-0.5rem" : "";
			}
		});
		listen("fin", async () => {
			await validateModDownload(path);
			if (downloadRef.current) downloadRef.current.style.width = "0%";
			if (downloadRef2.current) downloadRef2.current.style.width = "0%";
			if (downloadRef3.current) {
				downloadRef3.current.style.background = "conic-gradient( var(--accent) 0% 0%, var(--button) 0% 100%)";
				downloadRef3.current.style.minHeight = "0rem";
				downloadRef3.current.style.marginBottom = "-0.5rem";
			}
			prev = 0;
			setLocalData((prevData: LocalData) => {
				if (downloadElement.path)
					prevData[downloadElement.path] = {
						source: downloadElement.source,
						updatedAt: downloadElement.updatedAt || Date.now(),
						viewedAt: Date.now()
					};
				return { ...prevData };
			});
			setOnlineDownloadList((prev) => {
				let cur = prev.shift();
				if (!cur) return prev;
				cur.status = "completed";
				path = "";
				return [...prev, cur];
			});
			let items = await refreshRootDir("");
			setLocalModList(items);
			saveConfig();
		});
	}, []);
	useEffect(() => {
		if (onlineDownloadList && onlineDownloadList.length < 1) return;
		if (path !== "") return;
		if (onlineDownloadList[0].status == "pending" && path != rootDir + "\\" + onlineDownloadList[0].category + "\\" + onlineDownloadList[0].name) {
			let name = onlineDownloadList[0].name;
			let count = 0;
			for (let key in localData) {
				if (localData[key].source == onlineDownloadList[0].source) {
					count++;
					name = key.split("\\").slice(-1)[0];
				}
			}
			if (count == 1 && !onlineDownloadList[0].addon) {
				onlineDownloadList[0].name = name;
			}
			setOnlineDownloadList((prev) => {
				prev[0].status = "downloading";
				prev[0] = { ...prev[0] };
				downloadFile(rootDir, prev[0]);
				return [...prev];
			});
		}
	}, [onlineDownloadList]);
	const clearCompleted = () => {
		setOnlineDownloadList((prev) => prev.filter((item) => item.status !== "completed" && item.status !== "failed"));
	};
	const cancelDownload = (index: number) => {
		setOnlineDownloadList((prev) => {
			const newList = [...prev];
			if (newList[index].status === "downloading") {
				path = "";
			}
			newList.splice(index, 1);
			return newList;
		});
	};
	let done = onlineDownloadList.filter((item) => item.status == "completed").length;
	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				{onlineDownloadList.length > 0 ? (
					<Button className="text-ellipsis min-h-12 bg-white/0 flex flex-col items-center w-full h-full p-0 overflow-hidden" style={{ width: leftSidebarOpen ? "" : "3rem" }}>
						
						{leftSidebarOpen ? (
							<>
								<div ref={downloadRef} key={"down" + JSON.stringify(onlineDownloadList[0])} className="min-h-12 -mb-14 height-in bg-accent text-background hover:brightness-125 z-10 flex flex-col self-start justify-center overflow-hidden rounded-lg" style={{ width: prev + "%" }}>
									<div className="min-w-79 fade-in flex items-center justify-center gap-1 pl-2 pointer-events-none">
										{Icons[onlineDownloadList[0].status] || <FileQuestionIcon className="min-h-4 min-w-4" />}
										<Label className="min-w-2 max-w-71.5 w-fit py-2 pr-2" style={{ backgroundColor: "#fff0" }}>
											{onlineDownloadList[0].status == "downloading" ? `${textData._LeftSideBar._components._Downloads.Downloading} ${done + 1} of ${onlineDownloadList.length}` : `${textData._LeftSideBar._components._Downloads.Downloaded} ${done}/${onlineDownloadList.length}`}
										</Label>
									</div>
								</div>
								<div key={"down2" + JSON.stringify(onlineDownloadList[0])} className="fade-in bg-button min-h-12 text-accent flex items-center justify-center w-full gap-1 pl-2 pointer-events-none">
									{Icons[onlineDownloadList[0].status] || <FileQuestionIcon className="min-h-4 min-w-4" />}
									<Label className=" w-fit max-w-72 pr-2 pointer-events-none">{onlineDownloadList[0].status == "downloading" ? `${textData._LeftSideBar._components._Downloads.Downloading} ${done + 1} of ${onlineDownloadList.length}` : `${textData._LeftSideBar._components._Downloads.Downloaded} ${done}/${onlineDownloadList.length}`}</Label>
								</div>
							</>
						) : (
							<>
								<div
									ref={downloadRef3}
									className="bg-accent min-h-12 min-w-12 flex items-center justify-center rounded-lg"
									style={{
										background: "conic-gradient( var(--accent) 0% " + prev + "%, var(--button) 0% 100%)",
										minHeight: prev == 0 ? "0rem" : "",
										marginBottom: prev == 0 ? "-0.5rem" : "",
										transition: "minHeight 0.3s, margin-bottom 0.3s, height 0.3s",
									}}></div>
								<Label className=" w-fit max-w-12 pointer-events-none">{ `${done + (onlineDownloadList[0].status == "downloading" ? 1 : 0)}/${onlineDownloadList.length}`}</Label>
							</>
						)}
					</Button>
				) : (
					<>
						<div key="loner" className="text-foreground/50 flex items-center justify-center w-64 h-full duration-200 ease-linear">
							{leftSidebarOpen ? textData._LeftSideBar._components._Downloads.NoQ : "-"}
						</div>
					</>
				)}
			</DialogTrigger>
			<DialogContent className="min-w-180 wuwa-ft min-h-150 bg-background/50 border-border flex flex-col items-center gap-4 p-4 overflow-hidden border-2 rounded-lg">
				<div className="min-h-fit text-accent my-6 text-3xl">{textData.generic.Downloads}</div>
				<div className="h-100 flex flex-col items-center w-full gap-4 p-0">
					<div className="flex justify-between w-full">
						<div className="text-accent text-lg">{`${textData._LeftSideBar._components._Downloads.Queue} (${onlineDownloadList.length})`}</div>
						<Button variant="outline" size="sm" onClick={clearCompleted} disabled={!onlineDownloadList.some((item) => item.status === "completed" || item.status === "failed")}>
							{textData._LeftSideBar._components._Downloads.Clear}
						</Button>
					</div>
					<div className="flex flex-col w-full h-full overflow-y-auto text-gray-300 border rounded-sm">
						{onlineDownloadList.length > 0 ? (
							<>
								{<div key={"cur" + JSON.stringify(onlineDownloadList[0])} ref={downloadRef2} className="bg-accent/50 duration-0 flex items-center w-0 h-16 min-w-0 -mb-16 border-b" style={{ width: prev + "%" }}></div>}
								{onlineDownloadList.map((item, index) => (
									<div key={item.name.replaceAll("DISABLED_", "") + index} className="hover:bg-background/20 flex items-center w-full h-16 px-4 border-b" style={{ backgroundColor: index % 2 == 0 ? "#1b1b1b50" : "#31313150" }}>
										<div className="flex items-center flex-1 gap-3">
											{Icons[item.status] || <FileQuestionIcon className="min-h-4 min-w-4" />}
											<div className="flex flex-col flex-1">
												<Label className="focus:border-0 border-border/0 text-ellipsis w-full h-8 overflow-hidden text-white rounded-none cursor-default pointer-events-none" style={{ backgroundColor: "#fff0" }}>
													{item.name.replaceAll("DISABLED_", "")}
												</Label>
												<div className="text-xs text-gray-400 capitalize">
													{item.status} • {item.category}
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2">
											{item.status === "pending" && (
												<Button variant="ghost" size="sm" onClick={() => cancelDownload(index)} className="hover:text-red-300 text-red-400">
													<X className="w-4 h-4" />
												</Button>
											)}
											{(item.status === "completed" || item.status === "failed") && (
												<Button variant="ghost" size="sm" onClick={() => cancelDownload(index)} className="hover:text-gray-300 text-gray-400">
													<X className="w-4 h-4" />
												</Button>
											)}
										</div>
									</div>
								))}
							</>
						) : (
							<div className="flex items-center justify-center h-32 text-gray-400">{textData._LeftSideBar._components._Downloads.NoQ}</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
export default Downloads;
