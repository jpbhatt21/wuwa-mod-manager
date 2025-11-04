import {
	AppWindow,
	CircleSlash,
	EyeClosedIcon,
	EyeIcon,
	EyeOffIcon,
	Focus,
	Maximize,
	Maximize2,
	Mouse,
	MousePointerClick,
	PauseIcon,
	PlayIcon,
	SettingsIcon,
	Square,
	Upload,
	Download,
	InfoIcon,
	XIcon,
	CheckIcon,
	Folder,
} from "lucide-react";
import { leftSidebarOpenAtom, localPresetListAtom, settingsDataAtom, localDataAtom, textDataAtom } from "@/utils/vars";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { setWindowType } from "@/utils/init";
import { checkConfigValidity, getConfig, keySort, saveConfig, selectPath, setRoot } from "@/utils/fsUtils";
import { setHotreload } from "@/utils/hotreload";
import { registerGlobalHotkeys } from "@/utils/hotkeyUtils";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { logger } from "@/utils/logger";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LANG_LIST, TEXT } from "@/utils/consts";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent } from "@/components/ui/alert-dialog";

let keysdown: string[] = [];
let keys: string[] = [];
let bg = document.querySelector("body");

function Settings({
	disabled = false,
	setProgress,
}: {
	disabled?: boolean;
	setProgress?: Dispatch<SetStateAction<number[]>>;
}) {
	const [textData, setTextData] = useAtom(textDataAtom);
	const [alertOpen, setAlertOpen] = useState(false);
	const [langAlertData, setLangAlertData] = useState({ prev: "en", new: "jp" } as {
		prev: keyof typeof TEXT;
		new: keyof typeof TEXT;
	});
	const [presets, setPresets] = useAtom(localPresetListAtom);
	const [settings, setSettings] = useAtom(settingsDataAtom);
	const leftSidebarOpen = useAtomValue(leftSidebarOpenAtom);
	const setLocalData = useSetAtom(localDataAtom);
	useEffect(() => {
		setTextData(TEXT[settings.lang || "en"] || TEXT.en);
	}, [settings.lang]);
	if (JSON.stringify(settings) == "{}") return <></>;
	const importConfig = async () => {
		try {
			const filePath = await open({
				title: textData._LeftSideBar._components._Settings._ImportExport.ImportPop,
				filters: [
					{
						name: "JSON files",
						extensions: ["json"],
					},
				],
			});
			if (filePath) {
				const fileContent = await readTextFile(filePath);
				const config = await checkConfigValidity(JSON.parse(fileContent));
				if (config) {
					setRoot(config.dir, true);
					setSettings({ ...config.settings });
					setPresets([...config.presets]);
					setLocalData({ ...config.data });
					saveConfig();
					window.location.reload();
				}
			}
		} catch (error) {
			logger.error("Import config error:", error);
		}
	};
	const exportConfig = async () => {
		try {
			const config = getConfig();
			const filePath = await save({
				title: textData._LeftSideBar._components._Settings._ImportExport.ExportPop,
				defaultPath: "config.json",
				filters: [
					{
						name: "JSON files",
						extensions: ["json"],
					},
				],
			});
			if (filePath) {
				await writeTextFile(filePath, JSON.stringify(config, null, 2));
			}
		} catch (error) {
			logger.error("Export error:", error);
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					onClick={() => {
						setProgress &&
							setProgress((prev: number[]) => {
								prev[1] = 1;
								return [...prev];
							});
					}}
					className="w-38 text-ellipsis h-12 overflow-hidden"
					style={{ width: leftSidebarOpen ? "" : "3rem" }}
				>
					<SettingsIcon />
					{leftSidebarOpen && textData.generic.Settings}
				</Button>
			</DialogTrigger>
			<DialogContent className="min-w-180 scale-95 wuwa-ft min-h-150 bg-background/50 border-border gap -4 flex flex-col items-center p-4 overflow-hidden border-2 rounded-lg">
				<AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
					<AlertDialogContent className="min-w-120 wuwa-ft bg-background/50 backdrop-blur-xs border-border flex flex-col items-center gap-4 p-4 overflow-hidden border-2 rounded-lg">
						<div className=" flex flex-col items-center gap-6 mt-6 text-center">
							<div className="text-xl flex gap-2 flex-col items-center justify-center text-gray-200">
								{TEXT[langAlertData.prev].generic.Change +
									TEXT[langAlertData.prev].generic.Languages[langAlertData.new]}
								?
								<Separator />
								{TEXT[langAlertData.new].generic.Change + TEXT[langAlertData.new].generic.Languages[langAlertData.new]}?
							</div>

							{langAlertData.new!=="en" && <div className="max-w-96 text-accent gap-4 text-sm flex flex-col	">
								<span>
									{TEXT[langAlertData.prev].generic.Warning1 + " "}
									{TEXT[langAlertData.prev].generic.Warning2}
								</span>
								<span>
									{TEXT[langAlertData.new].generic.Warning1 + " "}
									{TEXT[langAlertData.new].generic.Warning2}
								</span>
							</div>}
						</div>
						<div className="flex justify-between w-full gap-4 mt-4">
							<AlertDialogCancel className="min-w-24 duration-300">
								{TEXT[langAlertData.prev].generic.Cancel} | {TEXT[langAlertData.new].generic.Cancel}
							</AlertDialogCancel>
							<AlertDialogAction
								className="min-w-24 text-accent hover:bg-accent hover:text-background"
								onClick={() => {
									setSettings((prev) => {
										prev.lang = langAlertData.new
										return { ...prev };
									});
									saveConfig();
									setAlertOpen(false)
								}}
							>
								{TEXT[langAlertData.prev].generic.Confirm} | {TEXT[langAlertData.new].generic.Confirm}
							</AlertDialogAction>
						</div>
					</AlertDialogContent>
				</AlertDialog>
				<div className="min-h-fit text-accent my-6 text-3xl">
					{textData.generic.Settings}
					<Tooltip>
						<TooltipTrigger></TooltipTrigger>
						<TooltipContent className="opacity-0"></TooltipContent>
					</Tooltip>
				</div>
				<div className="h-152 flex items-center w-full gap-4 p-0">
					<div className="min-w-1/2 flex flex-col h-full gap-4 pr-4 overflow-y-auto border-r">
						<div className="flex flex-col w-full gap-4">
							<div className="flex items-center gap-1">
								{textData._LeftSideBar._components._Settings.AutoReload}
								<Tooltip>
									<TooltipTrigger>
										<InfoIcon className="text-muted-foreground hover:text-gray-300 w-4 h-4" />
									</TooltipTrigger>
									<TooltipContent>
										<div className="flex flex-col gap-1">
											<div>
												<b>{textData._LeftSideBar._components._Settings._AutoReload.Disable} -</b>{" "}
												{textData._LeftSideBar._components._Settings._AutoReload.DisableMsg}
											</div>
											<div>
												<b>WWMM -</b> {textData._LeftSideBar._components._Settings._AutoReload.WWMMMsg}
											</div>
											<div>
												<b>{textData._LeftSideBar._components._Settings._AutoReload.OnFocus} -</b>{" "}
												{textData._LeftSideBar._components._Settings._AutoReload.FocusMsg}
											</div>
											<Separator />
											<div>{textData._LeftSideBar._components._Settings._AutoReload.ReloadMsg}</div>
										</div>
									</TooltipContent>
								</Tooltip>
							</div>
							<Tabs
								defaultValue={settings.hotReload.toString()}
								className="w-full"
								onValueChange={(e: any) => {
									e = parseInt(e) as 0 | 1 | 2;
									setSettings((prev) => {
										prev.hotReload = e;
										return { ...prev };
									});
									setHotreload(e);
									saveConfig();
								}}
							>
								<TabsList className="bg-background/50 w-full">
									<TabsTrigger value="0" className="w-1/3 h-10">
										<CircleSlash />
										{textData._LeftSideBar._components._Settings._AutoReload.Disable}
									</TabsTrigger>
									<TabsTrigger value="1" className="w-1/3 h-10">
										<AppWindow />
										WWMM
									</TabsTrigger>
									<TabsTrigger value="2" className="w-1/3 h-10">
										<Focus />
										{textData._LeftSideBar._components._Settings._AutoReload.OnFocus}
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
						<div className="flex flex-col w-full gap-4">
							<label className="min-w-fit">{textData._LeftSideBar._components._Settings.Toggle}</label>
							<Tabs
								defaultValue={settings.toggle.toString()}
								className="w-full"
								onValueChange={(e) => {
									setSettings((prev) => {
										prev.toggle = parseInt(e) as 0 | 2;
										return { ...prev };
									});
									saveConfig();
								}}
							>
								<TabsList className="bg-background/50 w-full">
									<TabsTrigger value="0" className="w-1/2 h-10">
										<MousePointerClick className=" rotate-y-180 w-4 -mr-2" />
										<Mouse />
										{textData._LeftSideBar._components._Settings._Toggle.LeftClick}
									</TabsTrigger>
									<TabsTrigger value="2" className="w-1/2 h-10">
										<Mouse />
										<MousePointerClick className=" w-4 -ml-2" />
										{textData._LeftSideBar._components._Settings._Toggle.RightClick}
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
						<div className="flex flex-col w-full gap-4">
							<div className="flex items-center gap-1">
								{textData._LeftSideBar._components._Settings.NSFW}
								<Tooltip>
									<TooltipTrigger>
										<InfoIcon className="text-muted-foreground hover:text-gray-300 w-4 h-4" />
									</TooltipTrigger>
									<TooltipContent>
										<div className="flex flex-col gap-1">
											<div>
												<b>{textData._LeftSideBar._components._Settings._NSFW.Remove} -</b>{" "}
												{textData._LeftSideBar._components._Settings._NSFW.RemoveMsg}
											</div>
											<div>
												<b>{textData._LeftSideBar._components._Settings._NSFW.Blur} -</b>{" "}
												{textData._LeftSideBar._components._Settings._NSFW.BlurMsg}
											</div>
											<div>
												<b>{textData._LeftSideBar._components._Settings._NSFW.Show} -</b>{" "}
												{textData._LeftSideBar._components._Settings._NSFW.ShowMsg}
											</div>
										</div>
									</TooltipContent>
								</Tooltip>
							</div>
							<Tabs
								defaultValue={settings.nsfw.toString()}
								onValueChange={(e) => {
									setSettings((prev) => {
										prev.nsfw = parseInt(e) as 0 | 1 | 2;
										return { ...prev };
									});
									saveConfig();
								}}
								className="w-full"
							>
								<TabsList className="bg-background/50 w-full">
									<TabsTrigger value="0" className="w-1/3 h-10">
										<EyeOffIcon className="aspect-square h-full pointer-events-none" />{" "}
										{textData._LeftSideBar._components._Settings._NSFW.Remove}
									</TabsTrigger>
									<TabsTrigger value="1" className="w-1/3 h-10">
										<EyeClosedIcon className="aspect-square h-full pointer-events-none" />{" "}
										{textData._LeftSideBar._components._Settings._NSFW.Blur}
									</TabsTrigger>
									<TabsTrigger value="2" className="w-1/3 h-10">
										<EyeIcon className="aspect-square h-full pointer-events-none" />{" "}
										{textData._LeftSideBar._components._Settings._NSFW.Show}
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
						<div className="flex flex-col w-full gap-4 pt-2">
							<div className="flex flex-col w-full gap-4">
								{textData._LeftSideBar._components._Settings.WindowBGOpacity}
								<Slider
									defaultValue={[settings.opacity * 100]}
									max={100}
									min={0}
									step={1}
									className="w-full"
									onValueChange={(e) => {
										bg = bg || document.querySelector("body");
										if (bg) bg.style.backgroundColor = "color-mix(in oklab, var(--background) " + e + "%, transparent)";
									}}
									onValueCommit={(e) => {
										setSettings((prev) => {
											prev.opacity = e[0] / 100;
											return { ...prev };
										});
										saveConfig();
									}}
								/>
							</div>
						</div>
						<div className="flex flex-col w-full gap-4">
							<label>{textData._LeftSideBar._components._Settings.BgType}</label>
							<Tabs
								defaultValue={settings.bgType.toString()}
								onValueChange={(e) => {
									setSettings((prev) => {
										prev.bgType = parseInt(e) as 0 | 1 | 2;
										return { ...prev };
									});
									saveConfig();
								}}
								className="w-full"
							>
								<TabsList className="bg-background/50 w-full">
									<TabsTrigger value="0" className="w-1/3 h-10">
										<Square className="aspect-square h-full pointer-events-none" />{" "}
										{textData._LeftSideBar._components._Settings._BgType.Blank}
									</TabsTrigger>
									<TabsTrigger value="1" className="w-1/3 h-10">
										<PauseIcon className="aspect-square h-full pointer-events-none" />{" "}
										{textData._LeftSideBar._components._Settings._BgType.Static}
									</TabsTrigger>
									<TabsTrigger value="2" className="w-1/3 h-10">
										<PlayIcon className="aspect-square h-full pointer-events-none" />
										{textData._LeftSideBar._components._Settings._BgType.Dynamic}
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
						<div className="flex flex-col w-full gap-4">
							<label>{textData._LeftSideBar._components._Settings.WindowType}</label>
							<Tabs
								defaultValue={settings.type.toString()}
								onValueChange={(e) => {
									setSettings((prev) => {
										prev.type = parseInt(e) as 0 | 1 | 2;
										return { ...prev };
									});
									setWindowType(parseInt(e));
									saveConfig();
								}}
								className="w-full"
							>
								<TabsList className="bg-background/50 w-full">
									<TabsTrigger value="0" className="w-1/3 h-10">
										<AppWindow className="aspect-square h-full pointer-events-none" />{" "}
										{textData._LeftSideBar._components._Settings._WindowType.Windowed}
									</TabsTrigger>
									<TabsTrigger value="1" className="w-1/3 h-10">
										<Maximize className="aspect-square h-full pointer-events-none" />{" "}
										{textData._LeftSideBar._components._Settings._WindowType.Borderless}
									</TabsTrigger>
									<TabsTrigger value="2" className="w-1/3 h-10">
										<Maximize2 className="aspect-square h-full pointer-events-none" />{" "}
										{textData._LeftSideBar._components._Settings._WindowType.Fullscreen}
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
						<div className="flex flex-col w-full gap-4">
							<label>{textData.generic.Language}</label>
							<div className="flex justify-evenly ">
								{LANG_LIST.map((lang) => (
									<div
										key={lang.Code}
										className={`hover:brightness-150 -mt-2 flex-col flex items-center justify-center gap-1 text-sm duration-300 cursor-pointer select-none`}
										onClick={() => {
											if (settings.lang == lang.Code) return;
											setLangAlertData({ prev: settings.lang || "en", new: lang.Code as keyof typeof TEXT });
											setAlertOpen(true);
										}}
									>
										<img src={lang.Flag} alt={lang.Name} className="w-6 h-6 duration-200 hover:scale-120" />
										<span
											className="overflow-hidden duration-200 mt-12 text-accent absolute whitespace-nowrap "
											style={{
												opacity: settings.lang == lang.Code ? "1" : "0",
											}}
										>
											{lang.Name}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="min-w-1/2 flex flex-col h-full gap-4 pr-4 overflow-y-auto">
						<div className="flex flex-col w-full gap-4">
							<div className="flex flex-col w-full gap-4">
								{textData._LeftSideBar._components._Settings.ImportExport}
								<div className="flex justify-start w-full gap-2 pr-2">
									<Button
										disabled={disabled}
										onClick={importConfig}
										className="h-9 bg-input/30 hover:border-input border-input/0 text-muted-foreground hover:text-gray-300 w-1/2 text-sm border"
									>
										<Download className="w-4 h-4" />
										{textData._LeftSideBar._components._Settings._ImportExport.Import}
									</Button>
									<Button
										onClick={exportConfig}
										className="h-9 bg-input/30 hover:border-input border-input/0 text-muted-foreground hover:text-gray-300 w-1/2 text-sm border"
									>
										<Upload className="w-4 h-4" />
										{textData._LeftSideBar._components._Settings._ImportExport.Export}
									</Button>
								</div>
							</div>
						</div>
						<div className="flex flex-col w-full gap-4">
							<div className="flex items-center gap-1">
								{textData._LeftSideBar._components._Settings.LaunchGame}
								<Tooltip>
									<TooltipTrigger>
										<InfoIcon className="text-muted-foreground hover:text-gray-300 w-4 h-4" />
									</TooltipTrigger>
									<TooltipContent>
										<div className="flex flex-col items-center gap-1">
											<div>{textData._LeftSideBar._components._Settings._LaunchGame.LaunchMsg1}</div>
											<div>{textData._LeftSideBar._components._Settings._LaunchGame.LaunchMsg2}</div>
										</div>
									</TooltipContent>
								</Tooltip>
							</div>
							<Tabs
								defaultValue={settings.launch.toString()}
								className="w-full"
								onValueChange={(e) => {
									setSettings((prev) => {
										prev.launch = parseInt(e) as 0 | 1;
										return { ...prev };
									});
									saveConfig();
								}}
							>
								<TabsList className="bg-background/50 w-full">
									<TabsTrigger value="0" className="w-1/2 h-10">
										<XIcon className=" rotate-y-180 w-4" />
										{textData._LeftSideBar._components._Settings._AutoReload.Disable}
									</TabsTrigger>
									<TabsTrigger value="1" className="w-1/2 h-10">
										<CheckIcon className=" w-4" /> {textData._LeftSideBar._components._Settings._AutoReload.Enable}
									</TabsTrigger>
								</TabsList>
							</Tabs>
							<div className="flex flex-row items-center w-full gap-2 px-2">
								<Button
									disabled={settings.launch == 0}
									className="aspect-square flex items-center justify-center w-8 h-8"
									onClick={async () => {
										const path = await selectPath();
										if (path) {
											setSettings((prev) => {
												prev.appDir = path;
												return { ...prev };
											});
											saveConfig();
										}
									}}
									style={{
										marginLeft: leftSidebarOpen ? "" : "0.25rem",
									}}
								>
									<Folder className="aspect-square w-5" />
								</Button>
								<Input
									readOnly
									disabled={settings.launch == 0}
									type="text"
									className="w-67.75 overflow-hidden border-border/0 bg-input/50 cursor-default duration-200 text-ellipsis h-8"
									value={settings.appDir ?? "-"}
									style={{
										width: leftSidebarOpen ? "" : "0px",
										opacity: leftSidebarOpen ? "" : "0",
									}}
								/>
							</div>
						</div>
						<div className="flex flex-col w-full h-full gap-2">
							<div className="flex items-center gap-1">
								{textData._LeftSideBar._components._Settings.HotKey}
								<Tooltip>
									<TooltipTrigger>
										<InfoIcon className="text-muted-foreground hover:text-gray-300 w-4 h-4" />
									</TooltipTrigger>
									<TooltipContent>
										<div className="flex flex-col gap-1">
											<div>{textData._LeftSideBar._components._Settings._HotKey.HKMsg1}</div>
											<div>
												{textData._LeftSideBar._components._Settings._HotKey.HKMsg2} <b>'WWMM'</b>{" "}
												{textData._LeftSideBar._components._Settings._HotKey.HKMsg3}{" "}
												<b>'{textData._LeftSideBar._components._Settings._AutoReload.OnFocus}'</b>
											</div>
											<Separator />
											<div>{textData._LeftSideBar._components._Settings._HotKey.HKMsg4}</div>
											<div>
												{textData._LeftSideBar._components._Settings._HotKey.HKMsg5} <b>Ctrl+C</b>, <b>Alt+Tab</b>,{" "}
												{textData._LeftSideBar._components._Settings._HotKey.HKMsg6}
											</div>
											<Separator />
											<div>
												<b>Backspace -</b> {textData._LeftSideBar._components._Settings._HotKey.ClearHK}{" "}
											</div>
										</div>
									</TooltipContent>
								</Tooltip>
							</div>
							<div className="max-h-84 flex flex-col w-full h-full gap-1 p-2 ml-2 overflow-x-hidden overflow-y-auto ">
								{presets.length > 0 ? (
									presets.map((preset, index) => (
										<div className="flex items-center justify-between w-full h-10 gap-2">
											<Input
												className="w-25 text-ellipsis h-10 p-0 overflow-hidden break-words border-0"
												style={{ backgroundColor: "#0000" }}
												onFocus={(e) => {
													e.currentTarget.blur();
												}}
												value={preset.name}
											></Input>
											<Input
												defaultValue={preset.hotkey
													.replaceAll("+", "xx+xx")
													.replaceAll("comma", ",")
													.replaceAll("space", "Space")
													.replaceAll("plus", "+")
													.replaceAll("minus", "-")
													.replaceAll("multiply", "*")
													.replaceAll("divide", "/")
													.replaceAll("decimal", ".")
													.replaceAll("enter", "↵")
													.replaceAll("backquote", "`")
													.replaceAll("backslash", "\\")
													.replaceAll("bracketleft", "[")
													.replaceAll("bracketright", "]")
													.replaceAll("semicolon", ";")
													.replaceAll("quote", "'")
													.replaceAll("period", ".")
													.replaceAll("slash", "/")
													.replaceAll("equal", "=")
													.replaceAll("xx+xx", " ﹢ ")}
												autoFocus={false}
												contentEditable={false}
												onKeyDownCapture={(e) => {
													e.preventDefault();
													if (e.code == "Backspace") {
														e.currentTarget.value = "";
														saveConfig();
													} else if (e.code == "Escape") {
														e.currentTarget.value = preset.hotkey
															.replaceAll("+", "xx+xx")
															.replaceAll("comma", ",")
															.replaceAll("space", "Space")
															.replaceAll("plus", "+")
															.replaceAll("minus", "-")
															.replaceAll("multiply", "*")
															.replaceAll("divide", "/")
															.replaceAll("decimal", ".")
															.replaceAll("enter", "↵")
															.replaceAll("backquote", "`")
															.replaceAll("backslash", "\\")
															.replaceAll("bracketleft", "[")
															.replaceAll("bracketright", "]")
															.replaceAll("semicolon", ";")
															.replaceAll("quote", "'")
															.replaceAll("period", ".")
															.replaceAll("slash", "/")
															.replaceAll("equal", "=")
															.replaceAll("xx+xx", " ﹢ ");
														keysdown = [];
														keys = [];
													} else {
														let next: any = [];
														let key = e.code
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
															.replaceAll("altright", "Alt")
															.replaceAll("controlright", "Ctrl")
															.replaceAll("shiftright", "Shift")
															.replaceAll("altleft", "Alt")
															.replaceAll("controlleft", "Ctrl")
															.replaceAll("shiftleft", "Shift")
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
															.replaceAll("minus", "-")
															.replace(/^f(\d+)$/, "F$1")
															.split("")
															.map((x, i) => (i == 0 ? x.toUpperCase() : x))
															.join("");
														if (keys.includes(key)) {
															next = keys;
														} else {
															if (!keysdown.includes(e.code)) {
																keysdown.push(e.code);
															}
															keys.push(key);
															next = keySort(keys);
														}
														e.currentTarget.value = next.join(" ﹢ ");
													}
												}}
												onKeyUpCapture={(e) => {
													if (e.code == "Backspace" || e.code == "Escape") return;
													let key = e.code;
													let index = keysdown.indexOf(key);
													if (index > -1) keysdown.splice(index, 1);
													if (keysdown.length == 0) {
														keys = [];
														e.currentTarget.blur();
													}
												}}
												onBlur={(e) => {
													keysdown = [];
													keys = [];
													setPresets((prev) => {
														prev[index].hotkey = e.currentTarget.value
															.replaceAll(" ﹢ ", "xxplusxx")
															.replaceAll(",", "comma")
															.replaceAll("Space", "space")
															.replaceAll("+", "plus")
															.replaceAll("-", "minus")
															.replaceAll("*", "multiply")
															.replaceAll("/", "divide")
															.replaceAll(".", "decimal")
															.replaceAll("↵", "enter")
															.replaceAll("`", "backquote")
															.replaceAll("\\", "backslash")
															.replaceAll("[", "bracketleft")
															.replaceAll("]", "bracketright")
															.replaceAll(";", "semicolon")
															.replaceAll("'", "quote")
															.replaceAll("=", "equal")
															.replaceAll("xxplusxx", "+");
														return [...prev];
													});
													saveConfig();
													registerGlobalHotkeys();
												}}
												className=" caret-transparent w-full text-center select-none"
												type="text"
											/>
										</div>
									))
								) : (
									<div className="text-white/50 flex items-center justify-center w-full h-full">
										{textData._LeftSideBar._components._Settings._HotKey.HKEmpty}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
export default Settings;
