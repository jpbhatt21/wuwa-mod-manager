import { firstLoadAtom, modRootDirAtom, tutorialPageAtom, textDataAtom, settingsDataAtom } from "@/utils/vars";
import { getDirResructurePlan, saveConfig } from "@/utils/fsUtils";
import { selectRootDir } from "@/utils/fsUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { invoke } from "@tauri-apps/api/core";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TimeoutOrNull } from "@/utils/types";
import { LANG_LIST, TEXT } from "@/utils/consts";
let clicktimeout: TimeoutOrNull = null;
let interval = null as any;
function Intro() {
	const textData = useAtomValue(textDataAtom);
	const [page, setPage] = useAtom(tutorialPageAtom);
	const firstLoad = useAtomValue(firstLoadAtom);
	const rootDir = useAtomValue(modRootDirAtom);
	const [user, setUser] = useState("Rover");
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [currentLangIndex, setCurrentLangIndex] = useState(-1);
	const [settings, setSettings] = useAtom(settingsDataAtom);
	const language = useAtomValue(textDataAtom);
	// Array of language keys to rotate through
	const languageKeys = ["en", "cn", "ru", "jp", "kr"] as const;

	useEffect(() => {
		if (firstLoad)
			clicktimeout = setTimeout(() => {
				clicktimeout = null;
			}, 1500);
	}, [firstLoad]);

	// Rotate through languages every 2 seconds
	useEffect(() => {
		interval = setInterval(() => {
			setCurrentLangIndex((prev) => (prev + 1) % languageKeys.length);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		async function getUsername() {
			setUser(await invoke("get_username"));
		}
		getUsername();
	}, []);
	return (
		<>
			<motion.div
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="text-accent bg-background/80 backdrop-blur-md fixed z-20 flex flex-col items-center justify-center w-full h-full"
				onClick={(e) => {
					if (e.target !== e.currentTarget) return;
					if (clicktimeout || page == 2 || !firstLoad) return;
					if (!settings.lang) return;
					clicktimeout = setTimeout(() => {
						clicktimeout = null;
					}, 500);
					setPage((prev) => prev + 1);
				}}
				style={{
					opacity: page < 3 ? 1 : 0,
					pointerEvents: page < 3 ? "auto" : "none",
				}}
			>
				<div
					className={`flex flex-col items-center duration-300 justify-center ${firstLoad && false ? "intro" : "logo-in"}`}
					style={{
						pointerEvents: page == 0 ? "auto" : "none",
						opacity: page == 0 ? 1 : 0,
						height: page == 0 ? "auto" : 0,
					}	}
				>
					<div className="text-8xl flex  text-foreground">
						{"WuWa".split("").map((letter, index) => (
							<span
								key={index}
								className="wave-letter"
								style={{
									animationDelay: `${index * 0.075}s`,
								}}
							>
								{letter}
							</span>
						))}
					</div>
					<div className=" flex text-4xl">
						{"Mod Manager".split("").map((letter, index) => (
							<span
								key={index}
								className="wave-letter"
								style={{
									animationDelay: `${(index + "aaaa".length) * 0.075}s`,
								}}
							>
								{letter === " " ? "\u00A0" : letter}
							</span>
						))}
					</div>
					{(firstLoad || !language) && currentLangIndex > -1 && (
						<div className="absolute items-center fade-in bottom-0 h-64 flex flex-col gap-8 justify-evenly">
							<AnimatePresence mode="wait">
								<motion.div
									key={currentLangIndex}
									initial={{ opacity: 0, y: 0 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 0 }}
									transition={{ duration: 0.4, ease: "easeInOut" }}
									className="text-xl text-accent/80 text-center"
								>
									{TEXT[languageKeys[currentLangIndex]].generic.SelectLang}
								</motion.div>
							</AnimatePresence>

							<AnimatePresence>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.4, ease: "easeInOut" }}
									className="opacity-0 flex justify-center gap-8"
								>
									{LANG_LIST.map((lang, index) => (
										<div
											key={lang.Code}
											className={`hover:brightness-110 group hover:scale-125 bg-accent/20 px-1 rounded-sm -mt-2 flex-col flex items-center justify-center gap-1 text-sm duration-300 cursor-pointer select-none`}
											style={{
												background: selectedIndex == index ? "" : "#0000",
												scale: selectedIndex == index ? "1.25" : "",
											}}
											onClick={() => {
												if (settings.lang == lang.Code) return;
												setSelectedIndex(index);
												setCurrentLangIndex(index);
											}}
										>
											<img
												onMouseEnter={() => {
													if (interval) {
														clearInterval(interval);
														interval = null;
													}
													setCurrentLangIndex(index);
												}}
												onMouseLeave={() => {
													if (!interval) {
														if (selectedIndex === -1)
															interval = setInterval(() => {
																setCurrentLangIndex((prev) => (prev + 1) % languageKeys.length);
															}, 2000);
														else {
															setCurrentLangIndex(selectedIndex);
														}
													}
												}}
												src={lang.Flag}
												alt={lang.Name}
												className="w-8 h-8 duration-300"
											/>
											<span
												className="overflow-hidden duration-300 mt-16 text-accent group-hover:opacity-50 opacity-0 absolute whitespace-nowrap "
												style={{
													opacity: selectedIndex == index ? "1" : "",
													scale: selectedIndex == index ? "0.8" : "0.7",
												}}
											>
												{lang.Name}
											</span>
										</div>
									))}
								</motion.div>
							</AnimatePresence>
							<AnimatePresence mode="wait">
								{selectedIndex > 0 && (
									<motion.div
										key={selectedIndex}
										initial={{ opacity: 0, y: 0 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 0 }}
										transition={{ duration: 0.4, ease: "easeInOut" }}
										className="text-accent/20 mt-4 fixed bottom-2 right-1 text-sm max-w-1/3 flex flex-col text-center"
									>
										<span>{TEXT[languageKeys[selectedIndex]].generic.Warning1}</span>
										{TEXT[languageKeys[selectedIndex]].generic.Warning2}
									</motion.div>
								)}
							</AnimatePresence>
							<Button
								className="w-fit "
								disabled={selectedIndex == -1}
								onClick={() => {
									setSettings((prev) => ({ ...prev, lang: languageKeys[selectedIndex] }));
									if (firstLoad) {
										setPage(1);
										clearInterval(interval);
										interval = null;
									} else {
										saveConfig();
									}
								}}
							>
								Confirm
							</Button>
						</div>
					)}
				</div>
				<div className="flex flex-col items-center justify-center gap-4 mt-8 pointer-events-none">
					<div
						className="fixed z-20 flex flex-col items-center justify-center w-full h-full duration-200 opacity-0"
						style={{
							opacity: page == 1 ? 1 : 0,
							pointerEvents: page == 2 ? "auto" : "none",
						}}
					>
						<div className="text-accent text-5xl">
							{textData._Intro._Intro.Greeting} <label id="user">{user}</label>
						</div>
						<div className="text-accent/75 my-2 text-2xl">{textData._Intro._Intro.Configure}</div>
						<div className=" mt-5 opacity-50">{textData._Intro._Intro.Continue}</div>
					</div>
					<div
						className="fixed z-20 flex flex-col items-center justify-center w-full duration-200 opacity-0 pointer-events-auto"
						style={{
							opacity: page == 2 ? 1 : 0,
							pointerEvents: page == 2 ? "auto" : "none",
						}}
					>
						{rootDir == "" ? (
							<div className=" text-accent/75 flex flex-col items-center gap-5 my-2 text-2xl pointer-events-auto">
								{textData._Intro._Intro.NotFound}
								<Button
									className="w-1/2 mt-2"
									onClick={() => {
										selectRootDir();
									}}
								>
									{textData.generic.Browse}
								</Button>
							</div>
						) : (
							<div className="text-accent flex flex-col items-center gap-5 my-2 text-2xl">
								{textData._Intro._Intro.ConfirmDir}
								<Input
									type="text"
									className="w-80 border-border/0 bg-input/50 text-accent/75 text-ellipsis h-10 overflow-hidden text-center cursor-default"
									value={rootDir?.replace("/", "\\") ?? "-"}
								/>
								<div className=" w-80 flex justify-between">
									<Button
										className="w-32 mt-2"
										onClick={() => {
											selectRootDir();
										}}
									>
										{textData.generic.Browse}
									</Button>
									<Button
										className={"w-32 mt-2"}
										onClick={() => {
											//console.log("Getting Dir Restructure Plan");
											getDirResructurePlan();
										}}
									>
										{textData.generic.Confirm}
									</Button>
								</div>
							</div>
						)}
					</div>
				</div>
			</motion.div>
		</>
	);
}
export default Intro;
