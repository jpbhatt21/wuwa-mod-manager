import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Page1 from "./pages/Page1";
import { SkipForwardIcon } from "lucide-react";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";
import Page7 from "./pages/Page7";
import Page8 from "./pages/Page8";
import Page9 from "./pages/Page9";
import { useAtomValue } from "jotai";
import { textDataAtom } from "@/utils/vars";
function Tutorial() {
	const textData = useAtomValue(textDataAtom)
	const [page, setPage] = useState(0);
	const pages = [<Page1 setPage={setPage} />, <Page2 setPage={setPage} />, <Page3 setPage={setPage} />, <Page4 setPage={setPage} />, <Page5 setPage={setPage} />, <Page6 setPage={setPage} />, <Page7 setPage={setPage} />, <Page8 setPage={setPage} />, <Page9 />];
	return (
		<motion.div initial={{ opacity: 0, filter: "blur(6px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(6px)" }} className="z-999 bg-sidebar fixed w-screen h-screen">
			<div
				className="bg-bgg  fixed w-screen h-screen"
				style={{
					opacity: 0.1,
					animation: "moveDiagonal 15s linear infinite",
				}}
			/>
			<AnimatePresence mode="wait">
				<motion.div
					key={page}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{
						duration: 0.3,
						ease: "easeInOut",
					}}
					className="w-full h-full">
					{pages[page]}
				</motion.div>
			</AnimatePresence>
			<div
				onClick={() => {
					setPage(8);
				}}
				className="top-2 left-4 text-muted-foreground hover:text-accent fixed flex items-center gap-1 text-lg duration-300 cursor-pointer"
				style={{ opacity: page === 8 ? 0 : 1, pointerEvents: page === 8 ? "none" : "auto" }}>
				{textData._Tutorial.Skip} <SkipForwardIcon fill="currentColor" className="inline w-4 h-4 pointer-events-none" />
			</div>
		</motion.div>
	);
}
export default Tutorial;
