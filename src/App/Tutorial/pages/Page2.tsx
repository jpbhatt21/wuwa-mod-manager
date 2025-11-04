import { useState } from "react";
import { Label } from "@/components/ui/label";
import { getCardClasses } from "@/utils/commonUtils";
import { COMMON_STYLES, CSS_CLASSES } from "@/utils/consts";
import { Folder, XIcon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { textDataAtom } from "@/utils/vars";

function Page2({ setPage }: { setPage: (page: number) => void }) {
	const text = useAtomValue(textDataAtom);
	const [isEnabled, setIsEnabled] = useState(false);
	return (
		<div className="text-muted-foreground fixed flex flex-col items-center justify-center w-screen h-screen gap-8">
			<div className="mb-4 text-3xl">
				{text._Tutorial.p2.Title.split("").map((letter, index) => (
					<span
						key={index}
						className="wave-letter"
						style={{
							animationDelay: `${index * 0.1}s`,
						}}>
						{letter === " " ? "\u00A0" : letter}
					</span>
				))}
			</div>
			<div
				className={getCardClasses(true)}
				style={{
					borderColor: isEnabled ? "var(--accent)" : "",
				}}
				onContextMenu={(e) => {
					e.preventDefault();
					setIsEnabled(!isEnabled);
				}}>
				<img className="object-cover w-full h-full opacity-0 pointer-events-none" src="" />
				<img style={{ filter: isEnabled ? "brightness(1)" : "brightness(0.5) saturate(0.5)" }} className="w-full h-[calc(100%-3.5rem)] -mt-71.5 duration-200 rounded-t-lg pointer-events-none object-cover" src="/wwmm.png" />
				<div className={CSS_CLASSES.BG_BACKDROP + " flex items-center w-full min-h-14 gap-2 px-4 py-1"}>
					{<Folder style={{ filter: isEnabled ? "brightness(1)" : "brightness(0.5) saturate(0.5)" }} />}
					<Label className={CSS_CLASSES.INPUT_TRANSPARENT} style={{ ...COMMON_STYLES.TRANSPARENT_BG, filter: isEnabled ? "brightness(1)" : "brightness(0.5) saturate(0.5)" }}>
						Mod Name
					</Label>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								
								disabled={!isEnabled}
								className="-mt-123 flex text-red-300 cursor-pointer items-center justify-center bg-white/0  px-2 w-8 h-6 z-200 -ml-5 -mr-5">
								<XIcon className="pointer-events-none" />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="min-w-120 backdrop-blur-xs wuwa-ft bg-background/50 border-border flex flex-col items-center gap-4 p-4 overflow-hidden border-2 rounded-lg">
							<div className="max-w-96 flex flex-col items-center gap-6 mt-6 text-center">
								<div className="text-xl text-gray-200">
									{text._Main._MainLocal.Delete} <span className="text-accent">Mod</span>?
								</div>
								<div className="text-red-300	">{text._Main._MainLocal.Irrev}</div>
							</div>
							<div className="flex justify-between w-full gap-4 mt-4">
								<AlertDialogCancel className="w-24 duration-300">{text.generic.Cancel}</AlertDialogCancel>
								<AlertDialogAction className="w-24 text-red-300 hover:bg-red-300 hover:text-background" onClick={() => setPage(2)}>
									{text._Main._MainLocal.Delete}
								</AlertDialogAction>
							</div>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
			<div className="text-muted-foreground/75 flex items-center gap-1 mt-8">
				{isEnabled ? (
					<>
						{text._Tutorial.p2.Great} <XIcon className="pointer-events-none max-h-5 text-red-300" /> {text._Tutorial.p2.OnTopRight}
					</>
				) : (
					text._Tutorial.p2.RClick
				)}
			</div>
		</div>
	);
}
export default Page2;