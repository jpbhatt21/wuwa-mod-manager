import { localFilterNameAtom, localSelectedPresetAtom , textDataAtom } from "@/utils/vars";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { refreshRootDir, applyPreset, saveConfig, selectRootDir } from "@/utils/fsUtils";
import { Check, Circle, Edit, Folder, Plus, Save, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAtom, useAtomValue } from "jotai";
import { Preset, LocalMod } from "@/utils/types";
import { useLocalModState, useAppSettings, useSidebarState } from "@/utils/commonHooks";
let focusedPresetIndex = -1;
function LeftLocal() {
	const textData = useAtomValue(textDataAtom)
	const [localSelectedPreset, setLocalSelectedPreset] = useAtom(localSelectedPresetAtom);
	const [localFilter, setLocalFilter] = useAtom(localFilterNameAtom);
	const { localModList, setLocalModList, root: rootDir } = useLocalModState();
	const { presets: localPresets, setPresets: setLocalPresets, online } = useAppSettings();
	const { leftSidebarOpen } = useSidebarState();
	const updatePreset = (index: number, name: string, shouldSave = false, shouldDelete = false) => {
		const tempPresets: Preset[] = [...localPresets];
		let wasCreated = false;
		
		if (index === tempPresets.length) {
			tempPresets.push({ name, data: [], hotkey: "" });
			wasCreated = true;
		}
		
		tempPresets[index].name = name;
		
		if (shouldSave) {
			tempPresets[index].data = [];
			const exploreItems = (items: LocalMod[]) => {
				for (const item of items) {
					tempPresets[index].data.push(item.path);
					if (item.children && item.children.length > 0 && item.depth < 2 && 
						(!item.children.filter(x => x.name.endsWith(".ini") || item.depth < 1))) {
						exploreItems(item.children);
					}
				}
			};
			exploreItems(localModList);
		}
		
		if (shouldDelete) {
			tempPresets.splice(index, 1);
			if (localSelectedPreset === index) {
				setLocalSelectedPreset(-1);
			} else if (localSelectedPreset > index) {
				setLocalSelectedPreset(localSelectedPreset - 1);
			}
		} else if (wasCreated) {
			setLocalSelectedPreset(index);
		}
		
		setLocalPresets(tempPresets);
		
		if (wasCreated) {
			setLocalSelectedPreset(index);
			focusedPresetIndex = index;
		}
		
		saveConfig();
	};
	return (
		<div
			className="flex flex-col h-full min-w-full duration-300"
			style={{
				opacity: online ? 0 : 1,
				transitionDelay: online ? "0s" : "0.3s",
			}}>
			<SidebarGroup className=" p-0">
				<SidebarGroupLabel>{textData._LeftSideBar._LeftLocal.Filter}</SidebarGroupLabel>
				<SidebarContent
					className="flex flex-row items-center justify-between w-full gap-2 px-2 overflow-hidden"
					style={{
						flexDirection: leftSidebarOpen ? "row" : "column",
					}}>
					{[
						{
							name: "All",
							icon: <Circle className="aspect-square h-4" />,
							text: textData.generic.All
						},
						{
							name: "Enabled",
							icon: <Check className="aspect-square h-4" />,
							text: textData._LeftSideBar._LeftLocal._Filter.Enabled
						},
						{
							name: "Disabled",
							icon: <X className="aspect-square h-4" />,
							text: textData._LeftSideBar._LeftLocal._Filter.Disabled
						},
					].map((fil) => (
						<Button
							key={"filter " + fil.name}
							onClick={() => {
								setLocalFilter(fil.name);
							}}
							className={"w-25 " + (localFilter == fil.name ? "bg-accent text-background " : "")}
							style={{ width: leftSidebarOpen ? "" : "2.5rem" }}>
							{fil.icon}
							{leftSidebarOpen && fil.text}
						</Button>
					))}
				</SidebarContent>
			</SidebarGroup>
			<Separator
				className="w-full ease-linear duration-200 min-h-[1px] my-2.5 bg-border"
				style={{
					opacity: leftSidebarOpen ? "0" : "",
					height: leftSidebarOpen ? "0px" : "",
					marginBlock: leftSidebarOpen ? "4px" : "",
				}}
			/>
			<SidebarGroup className="">
				<SidebarGroupLabel>{textData._LeftSideBar._LeftLocal.Presets}</SidebarGroupLabel>
				<SidebarContent className="justify-evenly flex items-center w-full gap-0 overflow-hidden">
					<div
						className="min-w-14 thin justify-evenly flex flex-col items-center w-full gap-2 pl-2 overflow-hidden overflow-y-scroll duration-200"
						style={{
							maxHeight: leftSidebarOpen ? "calc(100vh - 30.125rem)" : "calc(100vh - 40.25rem)",
						}}>
						<AnimatePresence>
							{localPresets.length > 0 || !leftSidebarOpen ? (
								localPresets.map((preset, index) => (
									<motion.div
										initial={{ opacity: 0, scale: 0, marginBottom: "-2.5rem" }}
										animate={{ opacity: 1, scale: 1, marginBottom: "0rem" }}
										exit={{ opacity: 0, scale: 0, marginBottom: "-3rem" }}
										key={preset.name}
										layout
										transition={{ duration: 0.2 }}
										className="min-h-10 flex justify-center w-full"
										onClick={async (e) => {
											if (e.target == e.currentTarget) {
												
												setLocalSelectedPreset(index);
												await applyPreset(rootDir, preset);
												setLocalModList(await refreshRootDir(""));
											}
										}}
										style={{
											height: leftSidebarOpen ? "" : "2.5rem",
											width: leftSidebarOpen ? "" : "2.5rem",
											padding: leftSidebarOpen ? "" : "0px",
										}}>
										{leftSidebarOpen ? (
											<div className={"w-full text-accent duration-200 rounded-lg px-2 fade-in pointer-events-none items-center flex gap-1 " + (localSelectedPreset == index ? " bg-accent text-background" : "bg-input/10")}>
												<Input
													autoFocus={index === focusedPresetIndex}
													onFocus={(e) => {
														e.currentTarget.select();
														focusedPresetIndex = -1;
													}}
													onBlur={(e) => {
														if (e.currentTarget.value !== preset.name) updatePreset(index, e.currentTarget.value);
													}}
													type="text"
													className="w-full h-full p-2  pointer-events-none focus-within:pointer-events-auto overflow-hidden focus-visible:ring-[0px] border-0  text-ellipsis"
													style={{ backgroundColor: "#fff0" }}
													defaultValue={preset.name}
												/>
												<Edit
													onClick={(e) => {
														let prev = e.currentTarget.previousSibling as HTMLInputElement;
														prev?.focus();
													}}
													className="scale-75 pointer-events-auto"
												/>
												<X
													onClick={() => {
														updatePreset(index, preset.name, false, true);
													}}
													className=" pointer-events-auto"
												/>
											</div>
										) : (
											<Button className="w-full h-full">{index + 1}</Button>
										)}
									</motion.div>
								))
							) : (
								<motion.div initial={{ opacity: 0, height: "0px" }} animate={{ opacity: 1, height: "2.5rem" }} key="loner" className="text-foreground/50 flex items-center justify-center w-64 h-10 overflow-hidden duration-200 ease-linear" style={{ opacity: leftSidebarOpen ? "" : "0", scale: leftSidebarOpen ? "" : "0", height: leftSidebarOpen ? "" : "0px" }}>
									{textData._LeftSideBar._LeftLocal._Presets.Empty}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
					<div
						className="flex items-center justify-between w-full gap-2 px-2 mt-2"
						style={{
							flexDirection: leftSidebarOpen ? "row" : "column",
						}}>
						<Button
							className="w-38.75"
							style={{ width: leftSidebarOpen ? "" : "2.5rem" }}
							onClick={() => {
								const presetLength = localPresets.length;
								updatePreset(presetLength, `Preset${presetLength + 1}`, true);
							}}>
							<Plus className="w-6 h-6" />
							<label className="duration-200 ease-linear" style={{ opacity: leftSidebarOpen ? "" : "0", width: leftSidebarOpen ? "2.5rem" : "0rem", marginRight: leftSidebarOpen ? "" : "-0.5rem" }}>
								{textData._LeftSideBar._LeftLocal._Presets.New}
							</label>
						</Button>
						<Button
							onClick={(e) => {
								if (localSelectedPreset == -1) {
									let prev = e.currentTarget.previousElementSibling as HTMLButtonElement;
									prev?.click();
								} else {
									updatePreset(localSelectedPreset, localPresets[localSelectedPreset].name, true);
								}
							}}
							className="w-38.75"
							style={{ width: leftSidebarOpen ? "" : "2.5rem" }}>
							<Save className="w-6 h-6" />
							<label className="duration-200 ease-linear" style={{ opacity: leftSidebarOpen ? "" : "0", width: leftSidebarOpen ? "2.5rem" : "0rem", marginRight: leftSidebarOpen ? "" : "-0.5rem" }}>
								{textData._LeftSideBar._LeftLocal._Presets.Save}
							</label>
						</Button>
					</div>
				</SidebarContent>
			</SidebarGroup>
			<Separator
				className="w-full ease-linear duration-200 min-h-[1px] my-2.5 bg-border"
				style={{
					opacity: leftSidebarOpen ? "0" : "",
					height: leftSidebarOpen ? "0px" : "",
					marginBlock: leftSidebarOpen ? "4px" : "",
				}}
			/>
			<SidebarGroup>
				<SidebarGroupLabel>{textData._LeftSideBar._LeftLocal.ModDir}</SidebarGroupLabel>
				<SidebarContent className="flex flex-row items-center w-full gap-2 px-2">
					<Button
						className="aspect-square flex items-center justify-center w-10 h-10"
						onClick={async () => {
							await selectRootDir();
							
						}}
						style={{
							marginLeft: leftSidebarOpen ? "" : "0.25rem",
						}}>
						<Folder className="aspect-square w-5" />
					</Button>
					<Input
						readOnly
						type="text"
						className="w-67.75 overflow-hidden border-border/0 bg-input/50 cursor-default duration-200 text-ellipsis h-10"
						value={rootDir ?? "-"}
						style={{
							width: leftSidebarOpen ? "" : "0px",
							opacity: leftSidebarOpen ? "" : "0",
						}}
					/>
				</SidebarContent>
			</SidebarGroup>
		</div>
	);
}
export default LeftLocal;
