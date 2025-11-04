import { useMemo } from "react";
import "./App.css";
import { SidebarProvider } from "./components/ui/sidebar";
import LeftSidebar from "./App/LeftSideBar/Left";
import RightSidebar from "./App/RightSideBar/Right";
import Main from "./App/Main/Main";
import { useAtom, useAtomValue } from "jotai";
import { consentOverlayDataAtom, onlineModeAtom, introOpenAtom, progressOverlayDataAtom, leftSidebarOpenAtom, rightSidebarOpenAtom, settingsDataAtom, tutorialModeAtom } from "./utils/vars";
import { main } from "./utils/init";
import { AnimatePresence } from "motion/react";
import Intro from "./App/Intro/Intro";
import Consent from "./App/Consent/Consent";
import Progress from "./App/Progress/Progress";
import Tutorial from "./App/Tutorial/Tutorial";

main();
function App() {
	const online = useAtomValue(onlineModeAtom);
	const restoreInfo = useAtomValue(progressOverlayDataAtom);
	const plannedChanges = useAtomValue(consentOverlayDataAtom);
	const introOpen = useAtomValue(introOpenAtom);
	const [leftSidebarOpen, setLeftSidebarOpen] = useAtom(leftSidebarOpenAtom);
	const [rightSidebarOpen, setRightSidebarOpen] = useAtom(rightSidebarOpenAtom);
	const settings = useAtomValue(settingsDataAtom);
	const tutorialMode = useAtomValue(tutorialModeAtom);
	
	const leftSidebarStyle = useMemo(
		() => ({
			minWidth: leftSidebarOpen ? "20.95rem" : "3.95rem",
		}),
		[leftSidebarOpen]
	);
	const rightSidebarStyle = useMemo(
		() => ({
			minWidth: rightSidebarOpen ? "20.95rem" : "0rem",
		}),
		[rightSidebarOpen]
	);
	//console.log(introOpen);
	return (
		<div id="background" className="flex flex-row fixed justify-start items-start w-full h-full wuwa-ft">
			<div
				className="fixed h-screen w-screen bg-bgg "
				style={{
					opacity: (settings.opacity ||1) * 0.1,
					animation: settings.bgType == 2 ? "moveDiagonal 15s linear infinite" : "",
					backgroundImage: settings.bgType == 0 ? "none" : "",
					backgroundRepeat: settings.bgType == 0 ? "no-repeat" : "",
				}}></div>
			<SidebarProvider open={leftSidebarOpen}>
				<LeftSidebar />
			</SidebarProvider>
			<SidebarProvider open={rightSidebarOpen}>
				<RightSidebar />
			</SidebarProvider>
			<div className="w-full h-full fixed flex flex-row">
				<div className="h-full duration-200 ease-linear" style={leftSidebarStyle} />
				<Main {...{ leftSidebarOpen, setLeftSidebarOpen, rightSidebarOpen, setRightSidebarOpen, online }} />
				<div className="h-full duration-200 ease-linear" style={rightSidebarStyle} />
			</div>
			<AnimatePresence>{(introOpen || !settings.lang) && <Intro />}</AnimatePresence>
			<AnimatePresence>{plannedChanges.title && <Consent />}</AnimatePresence>
			<AnimatePresence>{restoreInfo.open && <Progress />}</AnimatePresence>
			<AnimatePresence>{tutorialMode && <Tutorial />}</AnimatePresence>
			<div
				id="update-info"
				className="fixed bottom-0 right-0 w-fit opacity-50 bg-background  max-w-83 h-7 duration-200 -mb-7 overflow-hidden whitespace-nowrap text-ellipsis items-center z-[999] text-sm px-2 py-1"
				style={{
					transitionProperty: "margin-bottom",
				}}></div>
		</div>
	);
}
export default App;
