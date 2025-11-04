import CardLocal from "@/App/Main/components/CardLocal";
import { AnimatePresence, motion } from "motion/react";
import { useLocalModState, useAppSettings } from "@/utils/commonHooks";
import { ANIMATIONS, COMMON_STYLES, TRANSITIONS } from "@/utils/consts";

import { useEffect, useState, useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {  localDataAtom, rightSidebarOpenAtom , textDataAtom } from "@/utils/vars";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent } from "@/components/ui/alert-dialog";
import { deleteMod, refreshRootDir, saveConfig } from "@/utils/fsUtils";
import { LocalData, LocalMod } from "@/utils/types";


function MainLocal({ online }: { online: boolean }) {
	const { selectedItem, setSelectedItem, localFilteredItems, root, lastUpdated, setLocalModList } = useLocalModState();
	const textData= useAtomValue(textDataAtom)
	const setLocalData = useSetAtom(localDataAtom);
	const setRightSidebarOpen = useSetAtom(rightSidebarOpenAtom);
	const [deleteItemData, setDeleteItemData] = useState<LocalMod | null>(null);
	const [alertOpen, setAlertOpen] = useState(false);
	const { settings } = useAppSettings();
	const shouldShow = !online && localFilteredItems.length > 0;
	
	
	useEffect(() => {
		setRightSidebarOpen(true);
	}, [selectedItem]);
	useEffect(() => {
		if (!alertOpen) {
			setDeleteItemData(null);
		}
	}, [alertOpen]);
	
	const deleteItem = useCallback((item: LocalMod) => {
		if (!item) return;
		setDeleteItemData((prev) => {
			if (prev) return prev;
			setAlertOpen(true);
			return item;
		});
	}, []);
	
	return (
		<div
			className="flex flex-col items-center h-full min-w-full overflow-y-auto duration-300"
			style={{
				opacity: shouldShow ? 1 : 0,
				transitionDelay: online ? TRANSITIONS.OFFLINE_DELAY : TRANSITIONS.ONLINE_DELAY,
				pointerEvents: shouldShow ? "all" : "none",
			}}>
			<AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
				<AlertDialogContent className="min-w-120 wuwa-ft bg-background/50 backdrop-blur-xs border-border flex flex-col items-center gap-4 p-4 overflow-hidden border-2 rounded-lg">
					<div className="max-w-96 flex flex-col items-center gap-6 mt-6 text-center">
						<div className="text-xl text-gray-200">
							{textData._Main._MainLocal.Delete} <span className="text-accent">{deleteItemData?.name?.replaceAll("DISABLED_", "")}</span>?
						</div>
						<div className="text-red-300	">{textData._Main._MainLocal.Irrev}</div>
					</div>
					<div className="flex justify-between w-full gap-4 mt-4">
						<AlertDialogCancel className="w-24 duration-300">{textData.generic.Cancel}</AlertDialogCancel>
						<AlertDialogAction
							className="w-24 text-red-300 hover:bg-red-300 hover:text-background"
							onClick={async () => {
								if (!deleteItemData) return;
								
								setLocalData((prev: LocalData) => {
									const newData = { ...prev };
									if (deleteItemData.path) {
										delete newData[deleteItemData.truePath];
									}
									return newData;
								});
								await deleteMod(deleteItemData.path, deleteItemData.isDir);
								let items = await refreshRootDir("");
								setRightSidebarOpen(false);
								setLocalModList(items);
								saveConfig();
							}}>
							{textData._Main._MainLocal.Delete}
						</AlertDialogAction>
					</div>
				</AlertDialogContent>
			</AlertDialog>
			<AnimatePresence>
				{!online && (
					<motion.div {...ANIMATIONS.FADE} className="grid justify-center w-full h-full py-4" style={{...COMMON_STYLES.CARD_GRID,
						filter: alertOpen ? "blur(4px)  brightness(0.75)" : "blur(0px) brightness(1)",
					}}>
						{localFilteredItems.map((item, index) => (
							<CardLocal key={item.truePath} {...{ item, root,  selectedItem, setSelectedItem, index, lastUpdated, settings, deleteItem }} />
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
export default MainLocal;