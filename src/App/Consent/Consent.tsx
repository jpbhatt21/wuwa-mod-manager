import { localModListAtom, consentOverlayDataAtom, introOpenAtom, tutorialPageAtom, modRootDirAtom, firstLoadAtom, tutorialModeAtom, updateInfo , textDataAtom } from "@/utils/vars";
import { saveConfig, createRestorePoint, refreshRootDir, selectRootDir } from "@/utils/fsUtils";
import { ChevronRight, File, Folder, FolderCogIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UNCATEGORIZED } from "@/utils/init";
import { invoke } from "@tauri-apps/api/core";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { motion } from "motion/react";
import { useEffect } from "react";
function Consent() {
	const textData = useAtomValue(textDataAtom);
	const rootDir = useAtomValue(modRootDirAtom);
	const [firstLoad, setFirstLoad] = useAtom(firstLoadAtom);
	const [consentOverlayData, setConsentOverlayData] = useAtom(consentOverlayDataAtom);
	const setTutorialMode = useSetAtom(tutorialModeAtom);
	const setLocalModList = useSetAtom(localModListAtom);
	const setIntroOpen = useSetAtom(introOpenAtom);
	const setTutorialPage = useSetAtom(tutorialPageAtom);
	useEffect(() => {
		async function refresh() {
			setLocalModList(await refreshRootDir(""));
			setConsentOverlayData({ title: "", from: [], to: [], next: false });
			setTutorialPage(0);
			setIntroOpen(false);
			saveConfig();
		}
		if (consentOverlayData.next) {
			if(firstLoad){ setTutorialMode(true);setFirstLoad(false);}
			refresh();
		}
	}, [consentOverlayData.next]);
	return (
		<motion.div
			initial={{ opacity: 0, filter: "blur(6px)" }}
			animate={!consentOverlayData.next && { opacity: 1, filter: "blur(0px)" }}
			exit={{ opacity: 0, filter: "blur(6px)" }}
			className="bg-background/50 fixed z-50 flex items-center justify-center w-full h-full duration-200"
			style={{
				backdropFilter: "blur(5px)",
				opacity: consentOverlayData.next ? 0 : 1,
			}}>
			<div className="w-180 h-164 bg-background/50 border-border flex flex-col items-center gap-4 p-4 overflow-hidden border-2 rounded-lg">
				<div className="min-h-fit text-accent my-6 text-3xl">{consentOverlayData.title == "Confirm changes"?textData._Consent._Consent.Confirm:consentOverlayData.title}</div>
				<div className="flex flex-row items-center w-full gap-2 px-2">
					<Button
						className="aspect-square flex items-center justify-center w-10 h-10"
						onClick={async () => {
							await selectRootDir();
						}}>
						<Folder className="aspect-square w-5" />
					</Button>
					<div className=" w-157 max-w-157 bg-input/50 min-h-10 flex items-center px-2 text-gray-200 rounded-md">
						<Label className=" max-w-full duration-200">{rootDir ?? "-"}</Label>
					</div>
				</div>
				<div className="h-100 flex items-center w-full p-0">
					<div className="flex flex-col w-1/2 h-full overflow-x-hidden overflow-y-auto text-gray-300 border rounded-sm">
						{consentOverlayData.from.map((item, index) => (
							<div key={index + item.name} className={"w-full min-h-10 border-b flex gap-2 items-center px-2"} style={{ backgroundColor: index % 2 == 0 ? "#1b1b1b50" : "#31313150" }}>
								{item.isDirectory ? <Folder className="w-4 h-4" /> : <File className="w-4 h-4" />}
								<Label className={"w-full pointer-events-none " + ((index % 2) + 1)}>{item.name}</Label>
							</div>
						))}
					</div>
					<ChevronRight className="text-accent w-8 h-8" />
					<div className="flex flex-col w-1/2 h-full overflow-x-hidden overflow-y-auto text-gray-300 border rounded-sm">
						{consentOverlayData.to.map((item, index) => (
							<div key={index + item.name} className={"w-full flex  flex-col"} style={{ backgroundColor: index % 2 == 0 ? "#1b1b1b50" : "#31313150", borderBottom: index == consentOverlayData.to.length - 1 ? "" : "1px solid var(--border)" }}>
								<div className={"w-full border-b  min-h-10 gap-2 flex items-center px-2"}>
									{item.icon ? <img src={item.icon} className="w-6 h-6 -ml-1 -mr-1 overflow-hidden rounded-full" alt="icon" /> : item.name == UNCATEGORIZED ? <FolderCogIcon className="aspect-square w-5 h-5 -mr-1 pointer-events-none" /> : <Folder className="w-4 h-4" />}
									<Label className={"w-full pointer-events-none " + ((index % 2) + 1)}>{item.name}</Label>
								</div>
								<div className="flex flex-col items-center w-full pl-4">
									{item.children?.map((child, index) => (
										<div key={index + child.name} className={"w-full min-h-10 border-l flex gap-2 items-center px-2 "} style={{ backgroundColor: index % 2 == 0 ? "#1b1b1b50" : "#31313150", borderBottom: index == (item.children?.length || 0) - 1 ? "" : "1px dashed var(--border)" }}>
											{child.isDirectory ? <Folder className="w-4 h-4" /> : <File className="w-4 h-4" />}
											<Label className={"w-full pointer-events-none " + ((index % 2) + 1)}>{child.name}</Label>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex justify-between w-full h-10 mt-2">
					<Button
						className="w-28 text-red-300 hover:bg-red-300 hover:text-background"
						onClick={() => {
							invoke("exit_app");
						}}>
						{textData.generic.Quit}
					</Button>
					<div className="flex flex-col items-center justify-center w-full">
						<div className=" flex items-center gap-2">
							<Checkbox id="checkbox" className=" checked:bg-accent" />
							<label className="text-accent/75 text-sm">{textData._Consent._Consent.RestorePoint}</label>
						</div>
					</div>
					<Button
						className="w-28 "
						onClick={async () => {
							let checked = document.getElementById("checkbox")?.getAttribute("aria-checked") == "true";
							if (firstLoad) setTutorialMode(true);
							if (checked) await createRestorePoint("ORG-");
							else {
								updateInfo("Optimizing dir structure...");
								setConsentOverlayData((prev) => ({ ...prev, next: true }));
							}
						}}>
						{textData.generic.Confirm}
					</Button>
				</div>
			</div>
		</motion.div>
	);
}
export default Consent;
