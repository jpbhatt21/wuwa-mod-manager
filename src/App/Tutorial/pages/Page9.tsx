import { firstLoadAtom, tutorialModeAtom , textDataAtom } from "@/utils/vars";
import { useSetAtom, useAtomValue } from "jotai";
import { ArrowUpIcon } from "lucide-react";
function Page9() {
	const setTutorialMode = useSetAtom(tutorialModeAtom);
	const setFirstLoad = useSetAtom(firstLoadAtom);
	const text = useAtomValue(textDataAtom);
	return (
		<div
			className="text-muted-foreground fixed flex flex-col items-center justify-center w-screen h-screen"
			onClick={() => {
				setTutorialMode(false);
				setFirstLoad(false);
			}}>
			<div className="mb-8 text-3xl">
				{text._Tutorial.p9.Title.split("").map((letter, index) => (
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
			<div className="min-h-16 min-w-16  flex items-center justify-center h-32 gap-5 p-0">
				<div
					id="WWMMLogo"
					className="aspect-square h-20"
					style={{
						background: "url(/logo.png)",
						backgroundSize: "contain",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
					}}></div>
				<div className="flex flex-col w-48 text-center duration-200 ease-linear">
					<label className="text-5xl text-[#eaeaea] min-w-fit font-bold">WuWa</label>
					<label className="min-w-fit text-accent/75 text-2xl">Mod Manager</label>
				</div>
			</div>
			<div className="text-muted-foreground/50 -ml-52 flex flex-col items-center -mt-4 text-sm">
				<ArrowUpIcon className="h-8" />
				<div>{text._Tutorial.p9.Again1}</div>
				<div>{text._Tutorial.p9.Again2}</div>
			</div>
			<div className="text-muted-foreground/50 top-1 right-3 fixed text-sm">{text._Tutorial.p9.More}</div>
			<div className="text-muted-foreground/50 bottom-8 fixed">{text._Tutorial.p9.End}</div>
		</div>
	);
}
export default Page9;