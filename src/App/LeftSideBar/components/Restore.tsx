import { listRestorePointContents, listRestorePoints, createRestorePoint, restoreFromPoint } from "@/utils/fsUtils";
import {  leftSidebarOpenAtom , textDataAtom } from "@/utils/vars";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { File, Folder, FolderCogIcon, Plus, SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UNCATEGORIZED } from "@/utils/init";
import { DirRestructureItem } from "@/utils/types";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
function Restore({ disabled=false,setProgress }: { disabled?: boolean,setProgress?: any }) {
	const textData = useAtomValue(textDataAtom);
	const [selectedRestorePoint, setSelectedRestorePoint] = useState(-1);
	const [restore_points, setRestorePoints] = useState([] as string[]);
	const [content, setContent] = useState([] as DirRestructureItem[]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const leftSidebarOpen = useAtomValue(leftSidebarOpenAtom);
	useEffect(() => {
		if (selectedRestorePoint > -1 && selectedRestorePoint < restore_points.length) {
			setContent([]);
			async function fetchContent() {
				setContent(await listRestorePointContents(restore_points[selectedRestorePoint]));
			}
			fetchContent();
		}
	}, [selectedRestorePoint]);
	useEffect(() => {
		
		dialogOpen&&setProgress&&setProgress((prev:[number, number])=>{
			prev[0]=1;
			return [...prev]
		});
		setContent([]);
		setSelectedRestorePoint(-1);
		async function fetchRestorePoints() {
			if (dialogOpen) {
				setRestorePoints(await listRestorePoints());
			}
		}
		fetchRestorePoints();
	}, [dialogOpen]);
	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button className="w-38 text-ellipsis h-12 overflow-hidden" style={{ width: leftSidebarOpen ? "" : "3rem" }}>
					<SaveAll />
					{leftSidebarOpen && textData._LeftSideBar._components._Restore.Restore}
				</Button>
			</DialogTrigger>
			<DialogContent className="min-w-180 wuwa-ft min-h-150 bg-background/50 border-border flex flex-col items-center gap-4 p-4 overflow-hidden border-2 rounded-lg">
				<div className="min-h-fit text-accent my-6 text-3xl">{textData._LeftSideBar._components._Restore.Restore}</div>
				<div className="h-100 flex items-center w-full p-0">
					<div className="max-w-1/2 flex flex-col w-1/2 h-full pr-2">
						<div className="min-h-10 flex items-center justify-between w-full mb-2">{textData._LeftSideBar._components._Restore.RestorePoints}</div>
						<div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto text-gray-300 border rounded-sm">
							{restore_points.length > 0 && (
								<div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto text-gray-300 border border-b-0 rounded-sm rounded-b-none">
									{restore_points.map((item, index) => (
										<div
											onClick={() => {
												setSelectedRestorePoint(index);
											}}
											className={"w-full h-10 border-b gap-2 flex items-center px-2"}
											style={{ backgroundColor: selectedRestorePoint == index ? "var(--border)" : index % 2 == 0 ? "#1b1b1b50" : "#31313150" }}>
											{<Folder />}
											<Label className="w-full pointer-events-none">{item}</Label>
										</div>
									))}
								</div>
							)}
							<div
								className="w-full min-h-10 bg-[#1b1b1b50] duration-200 cursor-pointer hover:bg-[#31313150] text-sm gap-2 rounded-b-sm flex items-center justify-center px-2 border"
								onClick={() => {
									if(disabled)return;
									setDialogOpen(false);
									createRestorePoint();
								}}>
								<Plus className="w-4 h-4" /> {textData._LeftSideBar._components._Restore.CreateRestorePoint}
							</div>
						</div>
					</div>
					<div className="max-w-1/2 flex flex-col w-1/2 h-full pl-2">
						<div className="min-h-10 flex items-center justify-between w-full mb-2">{textData._LeftSideBar._components._Restore.RestorePointContent}</div>
						<div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto text-gray-300 border rounded-sm">
							{content.map((item, index) => (
								<div className={"w-full flex  flex-col"} style={{ backgroundColor: index % 2 == 0 ? "#1b1b1b50" : "#31313150" }}>
									<div className={"w-full h-10 flex gap-2 items-center px-2 " + (index !== 0 ? "border-t " : "") + (index !== content.length - 1 || item.children?.length || 0 > 0 ? "border-b" : "")}>
										{item.icon ? <img src={item.icon} className="w-6 h-6 -ml-1 -mr-1 overflow-hidden rounded-full" alt="icon" /> : item.name == UNCATEGORIZED ? <FolderCogIcon className="aspect-square w-5 h-5 -mr-1 pointer-events-none" /> : <Folder className="w-4 h-4" />}
										<Label className={"w-full pointer-events-none " + ((index % 2) + 1)}>{item.name}</Label>
									</div>
									<div className="flex flex-col items-center w-full pl-4">
										{item.children?.map((child, index) => (
											<div className={"w-full h-10 border-l flex gap-2 items-center px-2 "} style={{ backgroundColor: index % 2 == 0 ? "#1b1b1b50" : "#31313150", borderBottom: index == item.children?.length || 0 - 1 ? "" : "1px dashed var(--border)" }}>
												{!child.isDirectory ? <Folder className="w-4 h-4" /> : <File className="w-4 h-4" />}
												<Label className={"w-full pointer-events-none" + ((index % 2) + 1)}>{child.name}</Label>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex items-center justify-end w-full h-10 mt-2">
					<div className="text-muted-foreground w-full">{disabled&&textData._LeftSideBar._components._Restore.Restricted}</div>
					<Button
						className="w-28"
						disabled={disabled}
						onClick={async () => {
							if (selectedRestorePoint > -1 && selectedRestorePoint < restore_points.length) {
								setDialogOpen(false);
								restoreFromPoint(restore_points[selectedRestorePoint]);
							} else {
								alert(textData._LeftSideBar._components._Restore.PleaseSelect);
							}
						}}>
						{textData._LeftSideBar._components._Restore.Restore}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
export default Restore;
