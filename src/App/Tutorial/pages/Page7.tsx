import img1 from "@/demo/08_copy.png";
import { useAtomValue } from "jotai";
import { textDataAtom } from "@/utils/vars";
function Page7({ setPage }: { setPage: (page: number) => void }) {
	const text = useAtomValue(textDataAtom);
	return (
		<div
			className="text-muted-foreground fixed flex flex-col items-center justify-center w-screen h-screen gap-16"
			onClick={() => {
				setPage(7);
			}}>
			<div className=" text-3xl">
				{text._Tutorial.p7.Title.split("").map((letter, index) => (
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
			<div className="flex flex-col items-center gap-4">
				<img src={img1} className="max-h-[66vh] rounded-lg border border-border shadow-lg" />
				<div className="text-muted-foreground/50 ">{text._Tutorial.p7.Copy}</div>
			</div>
		</div>
	);
}
export default Page7;