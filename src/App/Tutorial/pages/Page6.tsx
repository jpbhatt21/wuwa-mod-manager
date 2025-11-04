import img1 from "@/demo/05_zip.png";
import img2 from "@/demo/06_unzip.png";
import img3 from "@/demo/07_preview.jpg";
import { ArrowRightIcon } from "lucide-react";
import { useAtomValue } from "jotai";
import { textDataAtom } from "@/utils/vars";
function Page6({ setPage }: { setPage: (page: number) => void }) {
	const text = useAtomValue(textDataAtom);
	return (
		<div
			className="text-muted-foreground fixed flex flex-col items-center justify-center w-screen h-screen gap-16"
			onClick={() => {
				setPage(6);
			}}>
			<div className=" text-3xl">
				{text._Tutorial.p6.Title.split("").map((letter, index) => (
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
					<img src={img1} className="max-h-[50vh] rounded-lg border border-border shadow-lg" />
					<div className="text-muted-foreground/50 text-center">{text._Tutorial.p6.Direct}</div>
				</div>
				<ArrowRightIcon className="text-accent w-8 h-8 -mt-4" />
				<div className="flex flex-col gap-4">
					<img src={img2} className="max-h-[50vh] rounded-lg border border-border shadow-lg" />
					<div className="text-muted-foreground/50 text-center">{text._Tutorial.p6.Unzip}</div>
				</div>
				<ArrowRightIcon className="text-accent w-8 h-8 -mt-4" />
				<div className="flex flex-col gap-4">
					<img src={img3} className="max-h-[66vh] h-64 rounded-lg border border-border shadow-lg" />
					<div className="text-muted-foreground/50 text-center">{text._Tutorial.p6.Preview}</div>
				</div>
			</div>
		</div>
	);
}
export default Page6;