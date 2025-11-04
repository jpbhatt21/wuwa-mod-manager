import {
	DownloadIcon,
	EyeIcon,
	PanelLeftClose,
	PanelLeftOpen,
	PanelRightClose,
	PanelRightOpen,
	Search,
	ThumbsUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { localSearchTermAtom, onlinePathAtom, onlineSortAtom, onlineTypeAtom, settingsDataAtom , textDataAtom } from "@/utils/vars";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { saveConfig } from "@/utils/fsUtils";
import Updater from "./Updater";

function Navbar({
	leftSidebarOpen,
	setLeftSidebarOpen,
	rightSidebarOpen,
	setRightSidebarOpen,
	online,
}: {
	leftSidebarOpen: boolean,
	setLeftSidebarOpen: Function,
	rightSidebarOpen: boolean,
	setRightSidebarOpen: Function,
	online: boolean,
}) {
	const textData = useAtomValue(textDataAtom)
	const setLocalSearchTerm = useSetAtom(localSearchTermAtom);
	const [onlinePath, setOnlinePath] = useAtom(onlinePathAtom);
	const [onlineType, setOnlineType] = useAtom(onlineTypeAtom);
	const [onlineSort, setOnlineSort] = useAtom(onlineSortAtom);
	const setSettings = useSetAtom(settingsDataAtom);
	const [popoverOpen, setPopoverOpen] = useState(false);
	useEffect(() => {
		let searchInput = (document.getElementById("search-input") as HTMLInputElement) || null;
		if (searchInput) {
			searchInput.value = "";
		}
	}, [online]);
	useEffect(() => {
		let searchInput = null as HTMLInputElement | null;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!searchInput) searchInput = (document.getElementById("search-input") as HTMLInputElement) || null;

			if (!event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
				let activeEl = document.activeElement;
				if (activeEl?.tagName === "BUTTON") activeEl = null;
				if (activeEl === document.body || activeEl === null) searchInput.focus();
				else if (event.code === "Escape" && activeEl === searchInput) {
					searchInput.value = "";
					searchInput.blur();
				}
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);
	return (
		<div className="text-accent min-h-16 flex items-center justify-center w-full h-16 gap-2 p-2">
			<div
				onClick={(e) => {
					e.stopPropagation();
					setLeftSidebarOpen((prev: boolean) => !prev);
				}}
				className="bg-background border-background hover:border-border hover:bg-sidebar text-accent flex items-center justify-center w-10 h-10 p-2 duration-200 border rounded-lg"
			>
				<PanelLeftClose
					className=" w-6 h-full duration-200 stroke-1"
					style={{
						width: leftSidebarOpen ? "1.5rem" : "0rem",
					}}
				/>
				<PanelLeftOpen
					className=" w-6 h-full duration-200 stroke-1"
					style={{
						width: leftSidebarOpen ? "0rem" : "1.5rem",
					}}
				/>
			</div>
			<div className="bg-sidebar flex items-center justify-between w-full h-full px-3 py-1 overflow-hidden border rounded-lg">
				<Search className="text-muted-foreground flex-shrink-0 w-4 h-4 mr-2" />
				<Input
					id="search-input"
					placeholder="Search..."
					className="text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 h-8 bg-transparent border-0"
					onChange={(e) => {
						if (online) {
							if (e.target.value.trim() === "") {
								setOnlinePath("home&type=" + onlineType);
							} else {
								setOnlinePath(`search/${e.target.value}&_type=${onlineType}`);
							}
						} else setLocalSearchTerm(e.target.value);
					}}
					onBlur={(e) => {
						if (online) {
							if (e.target.value.trim() === "") {
								setOnlinePath("home&type=" + onlineType);
							} else {
								setOnlinePath(`search/${e.target.value}&_type=${onlineType}`);
							}
						} else setLocalSearchTerm(e.target.value);
					}}
				/>
			</div>
			<div className="bg-sidebar w-32 h-full overflow-hidden border rounded-lg">
				{online? (
					<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
						<PopoverTrigger asChild>
							<div className="hover:brightness-150 bg-sidebar flex items-center justify-center w-full h-full gap-1 text-sm duration-300 cursor-pointer select-none">
								{onlinePath.startsWith("home") || onlinePath.startsWith("search")
									? onlineType == "Mod"
										? textData._Main._components._Navbar.ModsOnly
										: "All"
									: onlineSort == ""
									? "Default"
									: {
											Generic_MostLiked: (
												<>
													{textData._Main._components._Navbar.Most} <ThumbsUp className="h-4" />
												</>
											),
											Generic_MostViewed: (
												<>
													{textData._Main._components._Navbar.Most} <EyeIcon className="h-4" />
												</>
											),
											Generic_MostDownloaded: (
												<>
													{textData._Main._components._Navbar.Most} <DownloadIcon className="h-4" />
												</>
											),
									  }[onlineSort]}
							</div>
						</PopoverTrigger>
						<PopoverContent className="bg-sidebar z-100 absolute w-32 p-0 my-2 mr-2 -ml-16 overflow-hidden border rounded-lg">
							<div className="flex flex-col" onClick={() => setPopoverOpen(false)}>
								{onlinePath.startsWith("home") || onlinePath.startsWith("search") ? (
									<>
										<div
											className="hover:brightness-150 bg-sidebar min-h-12 flex items-center justify-center w-full gap-1 text-sm duration-300 border-b cursor-pointer select-none"
											onClick={() => {
												setOnlineType("");
												setOnlinePath((prev) => `${prev.split("&_type=")[0]}&_type=`);
												setSettings((prev) => ({ ...prev, onlineType: "" }));
												saveConfig();
											}}
										>
											{textData.generic.All}
										</div>
										<div
											className="hover:brightness-150 bg-sidebar min-h-12 flex items-center justify-center w-full gap-1 text-sm duration-300 border-t cursor-pointer select-none"
											onClick={() => {
												setOnlineType("Mod");
												setOnlinePath((prev) => `${prev.split("&_type=")[0]}&_type=Mod`);
												setSettings((prev) => ({ ...prev, onlineType: "Mod" }));
												saveConfig();
											}}
										>
											{textData._Main._components._Navbar.ModsOnly}
										</div>
									</>
								) : (
									<>
										<div
											className="hover:brightness-150 bg-sidebar min-h-12 flex items-center justify-center w-full gap-1 text-sm duration-300 border-b cursor-pointer select-none"
											onClick={() => {
												setOnlineSort("");
												setOnlinePath((prev) => `${prev.split("&_sort=")[0]}&_sort=`);
											}}
										>
											{textData._Main._components._Navbar.Default}
										</div>
										<div
											className="hover:brightness-150 border-y bg-sidebar min-h-12 flex items-center justify-center w-full gap-1 text-sm duration-300 cursor-pointer select-none"
											onClick={() => {
												setOnlineSort("Generic_MostLiked");
												setOnlinePath((prev) => `${prev.split("&_sort=")[0]}&_sort=most_liked`);
											}}
										>
											{textData._Main._components._Navbar.Most} <ThumbsUp className="h-4" />
										</div>
										<div
											className="hover:brightness-150 border-y bg-sidebar min-h-12 flex items-center justify-center w-full gap-1 text-sm duration-300 cursor-pointer select-none"
											onClick={() => {
												setOnlineSort("Generic_MostViewed");
												setOnlinePath((prev) => `${prev.split("&_sort=")[0]}&_sort=most_viewed`);
											}}
										>
											{textData._Main._components._Navbar.Most} <EyeIcon className="h-4" />
										</div>
										<div
											className="hover:brightness-150 bg-sidebar min-h-12 flex items-center justify-center w-full gap-1 text-sm duration-300 border-t cursor-pointer select-none"
											onClick={() => {
												setOnlineSort("Generic_MostDownloaded");
												setOnlinePath((prev) => `${prev.split("&_sort=")[0]}&_sort=most_downloaded`);
											}}
										>
											{textData._Main._components._Navbar.Most} <DownloadIcon className="h-4" />
										</div>
									</>
								)}
							</div>
						</PopoverContent>
					</Popover>
				):(
					<Updater />
				)}
			</div>
			{/* {(onlinePath.startsWith('home') || onlinePath.startsWith('search')) ? (
							<>
								<div onClick={() => setOnlineType('Mod')}>
									Mods Only
								</div>
								<div onClick={() => setOnlineType('')}>
									All
								</div>
							</>
						) : (
							<>
								<div onClick={() => setOnlineSort('default')}>
									Default
								</div>
								<div onClick={() => setOnlineSort('most_liked')}>
									Most Liked
								</div>
								<div onClick={() => setOnlineSort('most_viewed')}>
									Most Viewed
								</div>
								<div onClick={() => setOnlineSort('most_downloaded')}>
									Most Downloaded
								</div>
							</>
						)} */}
			<div
				onClick={(e) => {
					e.stopPropagation();
					setRightSidebarOpen((prev: boolean) => !prev);
				}}
				className="bg-background border-background hover:border-border hover:bg-sidebar text-accent flex items-center justify-center w-10 h-10 p-2 duration-200 border rounded-lg"
			>
				<PanelRightOpen
					className=" w-6 h-full duration-200 stroke-1"
					style={{
						width: rightSidebarOpen ? "0rem" : "1.5rem",
					}}
				/>
				<PanelRightClose
					className=" w-6 h-full duration-200 stroke-1"
					style={{
						width: rightSidebarOpen ? "1.5rem" : "0rem",
					}}
				/>
			</div>
		</div>
	);
}
export default Navbar;
