import { genericCategories, onlinePathAtom, leftSidebarOpenAtom, onlineModeAtom, onlineSelectedItemAtom, onlineTypeAtom, onlineSortAtom , textDataAtom } from "@/utils/vars";
import { AppWindow, EyeIcon, FolderCheckIcon, ShieldQuestion, Shirt, UploadIcon } from "lucide-react";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { modRouteFromURL } from "@/utils/fsUtils";
import { useInstalledItems } from "@/utils/commonHooks";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Downloads from "./components/Downloads";
import { Label } from "@/components/ui/label";
function LeftOnline() {
	const textData = useAtomValue(textDataAtom)
	const [onlinePath, setOnlinePath] = useAtom(onlinePathAtom);
	const leftSidebarOpen = useAtomValue(leftSidebarOpenAtom);
	const onlineSort = useAtomValue(onlineSortAtom);
	const online = useAtomValue(onlineModeAtom);
	const setOnlineSelectedItem = useSetAtom(onlineSelectedItemAtom);
	const onlineType = useAtomValue(onlineTypeAtom);
	
	const { installed } = useInstalledItems();
	return (
		<div
			className="flex flex-col h-full min-w-full duration-300"
			style={{
				opacity: online ? 1 : 0,
				transitionDelay: online ? "0.3s" : "0s",
				pointerEvents: online ? "auto" : "none",
				marginLeft: "-100%",
			}}>
			<SidebarGroup className="min-h-fit p-0">
				<SidebarGroupLabel>{textData._LeftSideBar._LeftOnline.Type}</SidebarGroupLabel>
				<SidebarContent
					className="flex flex-row items-center justify-between w-full gap-2 px-2 overflow-hidden"
					style={{
						flexDirection: leftSidebarOpen ? "row" : "column",
					}}>
					{genericCategories.map((category, index) => {
						return (
							<Button
								key={"filter" + category._sName}
								id={"type " + category._sName}
								onClick={() => {
									if (onlinePath.startsWith(category._sName)) {
										setOnlinePath("home&type="+onlineType);
										return;
									}
									setOnlinePath(`${category._sName}&_sort=${onlineSort}`);
								}}
								className={"w-25 " + (onlinePath.startsWith(category._sName) && " bg-accent text-background")}
								style={{ width: leftSidebarOpen ? "" : "2.5rem" }}>
								{[<Shirt className="w-6 h-6" />, <AppWindow className="w-6 h-6" />, <ShieldQuestion className="w-6 h-6" />][index % 3]}
								{leftSidebarOpen && category._sName}
							</Button>
						);
					})}
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
				<SidebarGroupLabel>{textData.generic.Downloads}</SidebarGroupLabel>
				<SidebarContent className="flex items-center justify-center w-full p-2">
					<Downloads />
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
			<SidebarGroup
				className="pr-1"
				style={{
				height: `calc(100% - ${leftSidebarOpen ? "11.75rem" : "11.75rem"})`,
			}}>
				<SidebarGroupLabel className="flex items-center gap-1">{textData.generic.Installed} <Label className="text-accent/50 flex text-xs scale-75"><UploadIcon className="min-h-2 min-w-2 w-4 h-4" /> {installed.filter(item => item.modStatus===2).length} | <EyeIcon className="min-h-2 min-w-2 w-4 h-4" />{installed.filter(item => item.modStatus===1).length}</Label></SidebarGroupLabel>
				<SidebarContent className="min-w-14 flex flex-col items-center w-full max-h-full gap-2 pl-2 pr-1 overflow-hidden overflow-y-auto duration-200">
					{installed.length > 0 ? (
						<>
							{installed.map((item, index) => (
								<div
									key={item.name}
									className={"w-full min-h-12 flex-col justify-center height-in overflow-hidden rounded-lg flex duration-200 " + " bg-input/50 text-accent hover:bg-input/80"}
									onClick={(e) => {
										if (e.target === e.currentTarget) {
											setOnlineSelectedItem(modRouteFromURL(item.source));
										}
									}}
									style={{
										height: leftSidebarOpen ? "" : "2.5rem",
										width: leftSidebarOpen ? "" : "2.5rem",
										padding: leftSidebarOpen ? "" : "0px",
									}}>
									{leftSidebarOpen ? (
										<div className="fade-in flex items-center w-full gap-1 pl-2 pointer-events-none">
											{[<EyeIcon className="min-h-4 min-w-4 " />, <UploadIcon className="min-h-4 min-w-4 " />][item.modStatus-1] || <FolderCheckIcon className="min-h-4 min-w-4" />}
											<Label className="min-w-69 w-69 pointer-events-none">{item.name.split("\\").slice(-1)[0]}</Label>
										</div>
									) : (
										<div className="flex items-center justify-center w-full h-full">{index + 1}</div>
									)}
								</div>
							))}
						</>
					) : (
						<div key="loner" className="text-foreground/50 flex items-center justify-center w-64 h-12 duration-200 ease-linear">
							{leftSidebarOpen ? "---" : "-"}
						</div>
					)}
				</SidebarContent>
			</SidebarGroup>
		</div>
	);
}
export default LeftOnline;
