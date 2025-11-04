import {
	categoryListAtom,
	refreshAppIdAtom,
	localFilteredModListAtom,
	localSelectedModAtom,
	previewUri,
	modRootDirAtom,
	onlineModeAtom,
	localDataAtom,
	onlineSelectedItemAtom,
	textDataAtom,
} from "@/utils/vars";
import { ArrowUpRightFromSquareIcon, Check, ChevronDown, CircleSlash, Edit, File, Folder, Link } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { modRouteFromURL, renameMod, saveConfig, savePreviewImage } from "@/utils/fsUtils";
import { SidebarGroup } from "@/components/ui/sidebar";
import { openPath } from "@tauri-apps/plugin-opener";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LocalMod } from "@/utils/types";
function RightLocal() {
	const textData = useAtomValue(textDataAtom);
	const localFilteredItems = useAtomValue(localFilteredModListAtom);
	const localSelectedItem = useAtomValue(localSelectedModAtom);
	const lastUpdated = useAtomValue(refreshAppIdAtom);
	const categories = useAtomValue(categoryListAtom);
	const [online, setOnline] = useAtom(onlineModeAtom);
	const root = useAtomValue(modRootDirAtom);
	const setOnlineSelectedItem = useSetAtom(onlineSelectedItemAtom);
	const [localData, setLocalData] = useAtom(localDataAtom);
	const [category, setCategory] = useState({ name: "-1", icon: "" });
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [item, setItem] = useState({} as LocalMod);
	function handleInAppLink(url: string) {
		let modRoute = modRouteFromURL(url);
		if (modRoute) {
			setOnline(true);
			setOnlineSelectedItem(modRoute);
		}
	}
	useEffect(() => {
		const handlePaste = (event: ClipboardEvent) => {
			let activeEl = document.activeElement;
			if (activeEl?.tagName === "BUTTON") activeEl = null;
			if (activeEl === document.body || activeEl === null) {
				let text = event.clipboardData?.getData("Text");
				if (text?.startsWith("http")) {
					event.preventDefault();
					handleInAppLink(text);
				}
			}
		};
		document.addEventListener("paste", handlePaste);
		return () => document.removeEventListener("paste", handlePaste);
	}, []);
	useEffect(() => {
		if (localFilteredItems.length > localSelectedItem && localFilteredItems[localSelectedItem])
			setItem(localFilteredItems[localSelectedItem]);
		if (!localFilteredItems[localSelectedItem]) return;
		let cat = localFilteredItems[localSelectedItem].trueParent.split("\\")[1];
		let findCat = categories.find((x) => x._sName == cat);
		if (findCat) {
			setCategory({ name: findCat._sName, icon: findCat._sIconUrl });
		} else setCategory({ name: "-1", icon: "" });
	}, [localSelectedItem, localFilteredItems]);
	return (
		<div
			className="flex flex-col h-full min-w-full gap-0 duration-300"
			style={{
				opacity: online ? 0 : 1,
				transitionDelay: online ? "0s" : "0.3s",
				pointerEvents: online ? "none" : "auto",
			}}
		>
			<div className="min-w-16 flex items-center justify-center h-16 gap-3 px-3 border-b">
				<Button className="bg-input/0 hover:bg-input/0 text-accent w-6 h-10 -mr-2">
					{item.isDir ? <Folder className="scale-150" /> : <File className="scale-150" />}
				</Button>
				<Input
					onFocus={(e) => {
						e.currentTarget.select();
					}}
					onBlur={(e) => {
						let currentValue = e.currentTarget.value.replaceAll("DISABLED_", "");
						let new_path: string | string[] = item.path.split("\\");
						new_path.pop();
						new_path.push(currentValue);
						new_path = new_path.join("\\");
						renameMod(
							item.path,
							item.enabled
								? e.currentTarget.value.replaceAll("DISABLED_", "")
								: "DISABLED_" + e.currentTarget.value.replaceAll("DISABLED_", "")
						);
						setLocalData((prev) => {
							if (prev[item.truePath]) {
								prev[new_path.replaceAll("DISABLED_", "")] = {
									...prev[item.truePath],
								};
								delete prev[item.truePath];
							}
							return {
								...prev,
							};
						});
						saveConfig();
					}}
					type="text"
					key={item.truePath}
					className="w-full border-0 rounded-none border-border border-b-1 select-none focus-within:select-auto overflow-hidden min-h-16 focus-visible:ring-[0px] focus-within:border-0   text-ellipsis"
					style={{ backgroundColor: "#fff0", fontSize: "1rem" }}
					defaultValue={item.name?.replaceAll("DISABLED_", "")}
				/>
				<div
					className="min-h-8 text-accent hover:border-border border-border/0 min-w-8 bg-pat2 hover:bg-pat1 flex items-center justify-center p-2 duration-200 border rounded-lg"
					onClick={() => {
						openPath(root + item.path);
					}}
				>
					<ArrowUpRightFromSquareIcon className="w-full h-full" />
				</div>
			</div>
			<SidebarGroup className="min-h-82 px-1 mt-1 select-none">
				<Edit
					onClick={() => {
						savePreviewImage(root + item.path);
					}}
					className="min-h-12 min-w-12 bg-background/50 z-25 text-accent rounded-tr-md rounded-bl-md self-end w-12 p-3 -mb-12 border"
				/>
				<img
					id="preview"
					className="w-82 h-82 bg-background object-cover duration-150 border rounded-lg"
					onError={(e) => {
						e.currentTarget.src = "/wwmm.png";
					}}
					src={previewUri + root + item.path + "?" + lastUpdated + "?" + lastUpdated}
				></img>
			</SidebarGroup>
			<SidebarGroup className="px-1 min-h-42.5 mt-1">
				<div className="flex flex-col w-full border rounded-lg">
					<div className="bg-pat2 flex items-center justify-between w-full p-1 rounded-lg">
						<Button className=" h-12 bg-accent/0 hover:bg-accent/0   min-w-28.5 w-28.5 text-accent">
							{textData.generic.Category}
						</Button>
						{item.depth == 1 ? (
							<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
								<PopoverTrigger asChild>
									<div
										role="combobox"
										className="overflow-hidden text-ellipsis  active:scale-90 whitespace-nowrap rounded-md text-sm font-medium transition-all p-2 gap-2 bg-sidebar text-accent shadow-xs hover:brightness-120  duration-300 h-12 flex items-center justify-between w-48.5"
									>
										{category.name != "-1" ? (
											<>
												{" "}
												{category.name != "Uncategorized" && (
													<img
														className=" items-center justify-center h-full rounded-full pointer-events-none aspect-square outline bg-muted text-white "
														onError={(e) => {
															e.currentTarget.src = "/who.jpg";
														}}
														src={category.icon || "err"}
													/>
												)}
												<div className="w-30 text-ellipsis overflow-hidden break-words pointer-events-none">
													{category.name}
												</div>
											</>
										) : (
											textData.generic.Select
										)}
										<ChevronDown />
									</div>
								</PopoverTrigger>
								<PopoverContent className="w-80 p-0 my-2 mr-2 border rounded-lg">
									<Command>
										<CommandInput placeholder="Search category..." className="h-12" />

										<CommandList>
											<CommandEmpty>{textData._RightSideBar._RightLocal.NoCat}</CommandEmpty>
											<CommandGroup>
												{categories.map((cat) => (
													<CommandItem
														key={cat._sName}
														value={cat._sName}
														onSelect={(currentValue) => {
															let new_path: string | string[] = item.path.split("\\");
															new_path[1] = currentValue;
															new_path = new_path.join("\\");
															renameMod(item.path, new_path, true);
															setLocalData((prev) => {
																if (prev[item.truePath]) {
																	prev[new_path.replaceAll("DISABLED_", "")] = {
																		...prev[item.truePath],
																	};
																	delete prev[item.truePath];
																}
																return {
																	...prev,
																};
															});
															saveConfig();
															setPopoverOpen(false);
														}}
													>
														<img
															className="aspect-square outline bg-muted flex text-white items-center justify-center h-12 rounded-full pointer-events-none"
															onError={(e) => {
															e.currentTarget.src = "/who.jpg";
														}}
															src={cat._sIconUrl || "err"}
														/>

														<div className="w-35 text-ellipsis overflow-hidden break-words">{cat._sName}</div>
														<Check
															className={cn("ml-auto", category.name === cat._sName ? "opacity-100" : "opacity-0")}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						) : (
							<div className="w-48.5 min-w-48.5 text-accent flex items-center justify-center">
								<CircleSlash />
							</div>
						)}
					</div>
					<div className="bg-pat1 flex justify-between w-full p-1 rounded-lg">
						<Button className="bg-input/0 hover:bg-input/0 h-12 w-28.5 text-accent">
							{textData._RightSideBar._RightLocal.Source}
						</Button>
						<div className="w-48.5 flex items-center px-1">
							<Input
								onBlur={(e) => {
									if (e.currentTarget.value !== localData[item.truePath]?.source) {
										setLocalData((prev) => {
											prev[item.truePath] = {
												...prev[item.truePath],
												source: e.currentTarget.value,
												updatedAt: Date.now(),
												viewedAt: 0,
											};
											return { ...prev };
										});
										saveConfig();
									}
								}}
								type="text"
								placeholder="No source"
								className="w-full select-none focus-within:select-auto overflow-hidden h-12 focus-visible:ring-[0px] border-0  text-ellipsis"
								style={{ backgroundColor: "#fff0" }}
								key={localData[item.truePath]?.source}
								defaultValue={localData[item.truePath]?.source}
							/>
							<div
								className="bg-pat2 hover:brightness-150 p-2 duration-200 rounded-lg"
								onClick={() => {
									if (localData[item.truePath]?.source && localData[item.truePath]?.source != "") {
										handleInAppLink(localData[item.truePath].source || "");
									}
								}}
							>
								<Link className=" w-4 h-4" />
							</div>
							{}
						</div>
					</div>
					<div className="bg-pat2 flex justify-between w-full p-1 rounded-lg">
						<Button className="bg-input/0 hover:bg-input/0 h-12 w-28.5 text-accent">
							{textData._RightSideBar._RightLocal.Notes}
						</Button>
						<div className="w-48.5 flex items-center px-1">
							<Input
								onBlur={(e) => {
									if (e.currentTarget.value !== localData[item.truePath]?.note) {
										setLocalData((prev) => {
											prev[item.truePath] = {
												...prev[item.truePath],
												note: e.currentTarget.value,
											};
											return { ...prev };
										});
										saveConfig();
									}
								}}
								type="text"
								className="w-full select-none focus-within:select-auto overflow-hidden h-12 focus-visible:ring-[0px] border-0  text-ellipsis"
								style={{ backgroundColor: "#fff0" }}
								key={localData[item.truePath]?.note}
								placeholder="No notes"
								defaultValue={localData[item.truePath]?.note}
							/>
						</div>
					</div>
				</div>
			</SidebarGroup>
			<SidebarGroup
				className="px-1 my-1 duration-200 opacity-0"
				style={{
					opacity: item.keys?.length > 0 ? 1 : 0,
				}}
			>
				<div className="flex flex-col w-full h-full overflow-hidden border rounded-lg">
					<div className="bg-pat1 text-accent min-h-14 flex items-center justify-center w-full p-1 rounded-lg">
						{textData._RightSideBar._RightLocal.HotKeys}
					</div>
					<div className="w-full h-full">
						<div className="text-gray-300 h-full max-h-[calc(100vh-39.75rem)] w-full overflow-y-auto overflow-x-hidden">
							<div className="min-h-8 text-accent bg-pat2 flex items-center justify-center">
								<label className="text-c w-1/2 px-4">{textData._RightSideBar._RightLocal.Key}</label>
								<label className="text-c w-1/2 px-4">{textData._RightSideBar._RightLocal.Action}</label>
							</div>
							{item.keys?.map((hotkey, index) => (
								<div
									key={index + item.path}
									className={"flex w-full items-center justify-center h-8 bg-pat" + (1 + (index % 2))}
								>
									<label className="text-c w-1/2 px-4">{hotkey.key}</label>
									<label className="text-c w-1/2 px-4">{hotkey.name}</label>
								</div>
							))}
						</div>
					</div>
				</div>
			</SidebarGroup>
		</div>
	);
}
export default RightLocal;
