import img2 from "@/demo/09_paste.png";
import img3 from "@/demo/10_mod.png";
import { ArrowRightIcon, MousePointerClickIcon, PlusIcon } from "lucide-react";
import { useAtomValue } from "jotai";
import { textDataAtom } from "@/utils/vars";
function Page8({ setPage }: { setPage: (page: number) => void }) {
	const text = useAtomValue(textDataAtom);
	return (
		<div
			className="text-muted-foreground fixed flex flex-col items-center justify-center w-screen h-screen gap-16"
			onClick={() => {
				setPage(8);
			}}>
			<div className=" text-3xl">
				{text._Tutorial.p8.Title.split("").map((letter, index) => (
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
				<div className="flex flex-col gap-4">
					<img src={img2} className="max-h-[66vh] brightness-75 rounded-lg border border-border shadow-lg" />
					<div className="flex absolute mt-[16.5%] ml-[30%]">
						<MousePointerClickIcon className="text-accent h-8"/>
						<div className="flex items-center mt-6 -ml-1">
							<div className="bg-accent border border-sidebar text-sidebar rounded-md py-1 px-2.5">Ctrl</div>
							<PlusIcon className="h-4"/>
							<div className="bg-accent border border-sidebar text-sidebar rounded-md py-1 px-2.5">V</div>
						</div>
					</div>
					<div className="text-muted-foreground/50 text-center">{text._Tutorial.p8.Paste}</div>
				</div>
				<ArrowRightIcon className="text-accent w-8 h-8 -mt-4" />
				<div className="flex flex-col gap-4">
					<img src={img3} className="max-h-[66vh] rounded-lg border border-border shadow-lg" />
					<div className="text-muted-foreground/50 text-center">{text._Tutorial.p8.Opens}</div>
				</div>
			</div>
		</div>
	);
}
export default Page8;