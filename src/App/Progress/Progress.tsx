import { consentOverlayDataAtom, progressOverlayDataAtom, updateInfo , textDataAtom } from "@/utils/vars";
import { cancelRestore, getDirResructurePlan } from "@/utils/fsUtils";
import { Button } from "@/components/ui/button";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { motion } from "motion/react";
import { useEffect } from "react";
function Progress() {
	const textData = useAtomValue(textDataAtom)
	const [restoreInfo, setRestoreInfo] = useAtom(progressOverlayDataAtom);
	const setPlannedChanges = useSetAtom(consentOverlayDataAtom);
	useEffect(() => {
		if (restoreInfo.open && restoreInfo.finished && restoreInfo.title == "Restore Point Created") {
			updateInfo("Optimizing dir structure...");
			setPlannedChanges({ title: "test", from: [], to: [], next: true });
		}
	}, [restoreInfo]);
	return (
		<motion.div
			initial={{ opacity: 0, filter: "blur(6px)" }}
			animate={{ opacity: 1, filter: "blur(0px)" }}
			exit={{ opacity: 0, filter: "blur(6px)" }}
			className="text-accent pointer-eve nts-none bg-background/50 fixed z-50 flex flex-col items-center justify-center w-full h-full duration-200"
			style={{
				backdropFilter: "blur(5px)",
			}}>
			<div className="min-h-fit text-accent my-6 text-3xl">{restoreInfo.title
				.replace("Creating Restore Point", textData._Progress.CreatingRestorePoint)
				.replace("Restore Point Created", textData._Progress.RestorePointCreated)
				.replace("Restoring from", textData._Progress.RestoringFrom)
				.replace("Operation Cancelled", textData._Progress.OperationCancelled)
				.replace("Restoration Completed", textData._Progress.RestorationCompleted)
			}</div>
			<div className="w-120 bg-background/50 h-8 overflow-hidden border rounded-lg">
				<div id="restore-progress" className="bg-muted w-0 h-8 duration-100 rounded-lg" />
			</div>
			<div className="w-120 text-accent/75 flex items-center justify-between gap-2 mt-2 text-sm">
				<label className="whitespace-nowrap text-ellipsis w-full overflow-hidden">
					<span id="restore-progress-message"></span>
				</label>
				<label id="restore-progress-percentage">0%</label>
			</div>
			<Button
				className={"w-32 my-6 " + (!restoreInfo.finished && "hover:bg-red-300 hover:text-background text-red-300")}
				onClick={async () => {
					setRestoreInfo((prev) => ({ ...prev, finished: true }));
					if (!restoreInfo.finished) {
						
						cancelRestore();
					} else {
						
						if (restoreInfo.title == "Restoration Completed") getDirResructurePlan();
						setRestoreInfo((prev) => ({ ...prev, open: false }));
					}
				}}>
				{restoreInfo.finished ? <>{textData._Progress.Close}</> : <>{textData.generic.Cancel}</>}
			</Button>
		</motion.div>
	);
}
export default Progress;