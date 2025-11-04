import {
	localModListAtom,
	localCategoryNameAtom,
	localFilterNameAtom,
	localFilteredModListAtom,
	onlinePathAtom,
	apiRoutes,
	onlineDataAtom,
	onlineSelectedItemAtom,
	updateInfo,
	onlineTypeAtom,
	onlineSortAtom,
	localSearchTermAtom,
} from "@/utils/vars";
import { MouseEvent, UIEvent, useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import MiniSearch from "minisearch";
let searchDB: MiniSearch<LocalMod> | null = null;

import Catbar from "./components/Catbar";
import Navbar from "./components/Navbar";
import MainLocal from "./MainLocal";
import MainOnline from "./MainOnline";
import { LocalMod } from "@/utils/types";
let pathPageCount = {} as { [category: string]: number };
let loading = false;
let max = 0;
let prevRSOpen = true;
function Main({
	leftSidebarOpen,
	setLeftSidebarOpen,
	rightSidebarOpen,
	setRightSidebarOpen,
	online,
}: {
	leftSidebarOpen: boolean;
	setLeftSidebarOpen: (open: boolean) => void;
	rightSidebarOpen: boolean;
	setRightSidebarOpen: (open: boolean) => void;
	online: boolean;
}) {
	const localSelectedCategory = useAtomValue(localCategoryNameAtom);
	const localFilter = useAtomValue(localFilterNameAtom);
	const localItems = useAtomValue(localModListAtom);
	const onlinePath = useAtomValue(onlinePathAtom);
	const onlineType = useAtomValue(onlineTypeAtom);
	const onlineSelectedItem = useAtomValue(onlineSelectedItemAtom);
	const setLocalFilteredItems = useSetAtom(localFilteredModListAtom);
	const setOnlineData = useSetAtom(onlineDataAtom);
	const localSearchTerm = useAtomValue(localSearchTermAtom);
	const onlineSort = useAtomValue(onlineSortAtom);
	const [intermediateList, setIntermediateList] = useState([] as typeof localItems);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(localSearchTerm);
		}, 300);
		return () => clearTimeout(timer);
	}, [localSearchTerm]);
	async function loadMore(e: MouseEvent<HTMLDivElement, MouseEvent> | UIEvent<HTMLDivElement>) {
		let lastChild = e.currentTarget.lastElementChild?.lastElementChild as HTMLDivElement;
		if (lastChild && !loading && online) {
			let lastChildRect = lastChild.getBoundingClientRect();
			if (lastChildRect.top < window.innerHeight) {
				loading = true;
				pathPageCount[onlinePath]++;
				if (max > 0 && pathPageCount[onlinePath] - 1 > max) {
					loading = false;
					return;
				}
				updateInfo(`Loading page ${pathPageCount[onlinePath]}/${Math.ceil(max)}`, 1000);
				try {
					if (onlinePath.startsWith("home"))
						await nextPage(apiRoutes.home({ page: pathPageCount[onlinePath], type: onlineType }), onlinePath);
					else if (onlinePath.startsWith("Skins") || onlinePath.startsWith("Other") || onlinePath.startsWith("UI")) {
						let cat = onlinePath.split("&_sort=")[0];
						await nextPage(apiRoutes.category({ cat, sort: onlineSort, page: pathPageCount[onlinePath] }), onlinePath);
					} else if (onlinePath.startsWith("search/")) {
						let term = onlinePath.replace("search/", "").split("&_type=")[0];
						if (term.trim().length == 0) return;
						await nextPage(apiRoutes.search({ term, type: onlineType, page: pathPageCount[onlinePath] }), onlinePath);
					}
				} finally {
					//console.log(e);
					setTimeout(() => {
						loadMore(e as unknown as MouseEvent<HTMLDivElement, MouseEvent>);
					}, 100);
					loading = false;
				}
			}
		}
	}
	function initialLoad(url: string, onlinePath: string, controller: AbortController) {
		fetch(url, { signal: controller.signal })
			.then((res) => res.json())
			.then((data) => {
				max = data._aMetadata._nRecordCount / 15;
				setOnlineData((prev) => {
					prev[onlinePath] = data._aRecords;
					return {
						...prev,
					};
				});
				setTimeout(() => {
					loadMore({ currentTarget: document.getElementById("online-items")! } as unknown as MouseEvent<
						HTMLDivElement,
						MouseEvent
					>);
				}, 100);

				loading = false;
			});
	}
	async function nextPage(url: string, onlinePath: string) {
		const res = await fetch(url);
		const data = await res.json();
		setOnlineData((prev) => {
			prev[onlinePath] = [...prev[onlinePath], ...data._aRecords];
			return {
				...prev,
			};
		});
		loading = false;
	}
	useEffect(() => {
		const items = localItems.filter(
			(item) =>
				(localSelectedCategory == "All" ? true : item.path.startsWith("\\" + localSelectedCategory)) &&
				(localFilter == "All" ||
					(localFilter == "Enabled" && item.enabled) ||
					(localFilter == "Disabled" && !item.enabled))
		);

		if (!searchDB && items.length > 0) {
			searchDB = new MiniSearch({
				idField: "truePath",
				fields: ["name", "truePath"],
				storeFields: Object.keys(items[0]),
				searchOptions: { prefix: true, fuzzy: 0.2 },
			});
		}
		if (searchDB) {
			searchDB.removeAll();
			searchDB.addAll(items);
		}
		setIntermediateList(items);
	}, [localFilter, localSelectedCategory, localItems]);
	useEffect(() => {
		if (debouncedSearchTerm.trim() === "" || !searchDB) {
			setLocalFilteredItems(intermediateList);
			return;
		} else if (searchDB) {
			const results = searchDB.search(debouncedSearchTerm);
			//console.log(results)
			setLocalFilteredItems(results as unknown as LocalMod[]);
		}
	}, [debouncedSearchTerm, intermediateList]);
	useEffect(() => {
		const controller = new AbortController();
		if (online && !pathPageCount[onlinePath]) {
			if (onlinePath.startsWith("home")) {
				pathPageCount[onlinePath] = 1;
				loading = true;
				fetch(apiRoutes.banner(), { signal: controller.signal })
					.then((res) => res.json())
					.then((data) => {
						setOnlineData((prev) => {
							//console.log(data);
							return {
								...prev,
								banner: data,
							};
						});
					});
				initialLoad(apiRoutes.home({ page: pathPageCount[onlinePath], type: onlineType }), onlinePath, controller);
			} else if (onlinePath.startsWith("Skins") || onlinePath.startsWith("Other") || onlinePath.startsWith("UI")) {
				pathPageCount[onlinePath] = 1;
				loading = true;
				let cat = onlinePath.split("&_sort=")[0];
				initialLoad(
					apiRoutes.category({ cat, sort: onlineSort, page: pathPageCount[onlinePath] }),
					onlinePath,
					controller
				);
			} else if (onlinePath.startsWith("search/")) {
				let term = onlinePath.replace("search/", "").split("&_type=")[0];
				updateInfo(`Searching for "${term}"...`, 1000);
				if (term.trim().length == 0) return;
				pathPageCount[onlinePath] = 1;
				loading = true;
				initialLoad(apiRoutes.search({ term, type: onlineType }), onlinePath, controller);
			}
		}
		return () => {
			controller.abort();
		};
	}, [online, onlinePath, onlineType]);
	useEffect(() => {
		if (online && onlineSelectedItem == "-1") {
			prevRSOpen = rightSidebarOpen;
			setRightSidebarOpen(false);
		} else if (!online && prevRSOpen) {
			setRightSidebarOpen(true);
		}
	}, [online]);
	return (
		<div className="border-border flex flex-col w-full h-full overflow-hidden duration-200 border">
			<Navbar {...{ leftSidebarOpen, setLeftSidebarOpen, rightSidebarOpen, setRightSidebarOpen, online }} />
			<div className="flex w-full h-full px-2 overflow-hidden">
				<MainLocal {...{ online, localFilter, localSelectedCategory }} />
				<MainOnline {...{ max, count: pathPageCount[onlinePath], online, loadMore }} />
			</div>
			<Catbar {...{ online, items: localItems }} />
		</div>
	);
}
export default Main;
