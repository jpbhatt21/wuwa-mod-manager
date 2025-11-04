import { onlinePathAtom, localCategoryNameAtom, categoryListAtom, onlineTypeAtom, onlineSortAtom , textDataAtom } from "@/utils/vars";
import { FileQuestion, Group } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAtom, useAtomValue } from "jotai";
import { LocalMod } from "@/utils/types";
function Catbar({ online, items }: { online: boolean; items: LocalMod[] }) {
	const textData = useAtomValue(textDataAtom)
	const [selectedCategory, setSelectedCategory] = useAtom(localCategoryNameAtom);
	const [onlinePath, setOnlinePath] = useAtom(onlinePathAtom);
	const onlineType = useAtomValue(onlineTypeAtom);
	const categories = useAtomValue(categoryListAtom);
	const onlineSort = useAtomValue(onlineSortAtom);
	let localCat = categories.filter((category) => items.filter((item) => item.parent == "\\" + category._sName).length > 0);
	return (
		<>
			<div className="min-h-20 flex items-center justify-center w-full h-20 p-2">
				<div className="bg-sidebar text-accent flex items-center justify-center w-full h-full gap-1 p-2 border rounded-lg">
					<label className="w-20">{textData.generic.Category}</label>
					<div
						onWheel={(e) => {
							if (e.deltaX != 0) return;
							let target = e.currentTarget as HTMLDivElement;
							target.scrollTo({
								left: target.scrollLeft + e.deltaY,
								behavior: "smooth",
							});
						}}
						className=" h-15 items-top thin flex justify-start w-full gap-2 p-2 my-1 mr-1 overflow-x-auto overflow-y-hidden text-white">
						<Button
							onClick={() => {
								setSelectedCategory("All");
							}}
							className={"w-24 " + ("All" == selectedCategory && " bg-accent text-background")}
							style={{ scale: online ? "0" : "1", marginRight: online ? "-6.5rem" : "0rem", padding: online ? "0rem" : "" }}>
							<Group className="aspect-square h-full pointer-events-none" />
							{textData.generic.All}
						</Button>
						<Button
							onClick={() => {
								setSelectedCategory("Uncategorized");
							}}
							className={"min-w-34 " + ("Uncategorized" == selectedCategory && " bg-accent text-background")}
							style={{ scale: online ? "0" : "1", marginRight: online ? "-9.5rem" : "0rem", padding: online ? "0rem" : "" }}>
							<FileQuestion className="aspect-square h-full pointer-events-none" />
							{textData._Main._components._Catbar.Uncategorized}
						</Button>
						{(online ? categories : localCat).map((category) => (
							<Button
								key={category._sName}
								onClick={() => {
									if (online) {
										if (category._special) {
											return;
										}
										if (onlinePath.startsWith("Skins/" + category._sName)) {
											setOnlinePath("home&type="+onlineType);
											return;
										}
										setOnlinePath(`Skins/${category._sName}&_sort=${onlineSort}`);
									} else {
										setSelectedCategory(category._sName);
									}
								}}
								style={{ scale: online && category._special ? "0" : "1", marginRight: online && category._special ? "-9.5rem" : "0rem", padding: online && category._special ? "0rem" : "" }}
								className={(online ? onlinePath.startsWith(`Skins/${category._sName}`) : selectedCategory == category._sName) ? " bg-accent text-background" : ""}>
								<img className="aspect-square scale-120 h-full rounded-full pointer-events-none" onError={(e) => {
															e.currentTarget.src = "/who.jpg";
														}} src={category._sIconUrl || "err"} />
								{category._sName}
							</Button>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
export default Catbar;