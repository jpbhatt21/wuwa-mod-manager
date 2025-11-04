import Restore from "@/App/LeftSideBar/components/Restore";
import Settings from "@/App/LeftSideBar/components/Settings";
import { useState } from "react";
import img1 from "@/demo/01_offline.png"
import img2 from "@/demo/02_online.png"
import { ArrowRightLeftIcon } from "lucide-react";
import { useAtomValue } from "jotai";
import { textDataAtom } from "@/utils/vars";
function Page4({ setPage }: { setPage: (page: number) => void }) {
	const [progress, setProgress] = useState([0,0]);
	const text = useAtomValue(textDataAtom);
	return (
		<>
			<div
				className="text-muted-foreground fixed flex flex-col items-center justify-center w-screen h-screen gap-16"
				style={{
					opacity: progress[0] === 1 && progress[1] === 1 ? 0 : 1,
				}}>
				<div className=" text-3xl">
					{text._Tutorial.p4.Title1.split("").map((letter, index) => (
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
				<div className=" flex gap-4">
					<Restore setProgress={setProgress} disabled />
					<Settings setProgress={setProgress} disabled />
				</div>
				<div className="text-muted-foreground/75 flex items-center gap-1">{text._Tutorial.p4.Msg[parseInt(progress.join("")) as keyof typeof text._Tutorial.p4.Msg] || text._Tutorial.p4.Msg[0]} </div>
			</div>
			<div
				className="text-muted-foreground fixed flex flex-col items-center justify-center w-screen h-screen gap-16"
				style={{
					opacity: progress[0] === 1 && progress[1] === 1 ? 1 : 0,
					pointerEvents: progress[0] === 1 && progress[1] === 1 ? "all" : "none",
				}}
				onClick={() => {
					setPage(4);
				}}
				>
					<div className=" text-3xl">
					{text._Tutorial.p4.Title2.split("").map((letter, index) => (
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
				<div className="flex items-center gap-4">
					<img src={img1} className="max-h-[50vh] rounded-lg border border-border shadow-lg" />
					<ArrowRightLeftIcon className="text-accent w-8 h-8" />
					<img src={img2} className="max-h-[50vh] rounded-lg border border-border shadow-lg" />
				</div>
				<div className="text-muted-foreground/50">{text._Tutorial.p4.ClickAnywhere}</div>
				</div>
		</>
	);
}
export default Page4;