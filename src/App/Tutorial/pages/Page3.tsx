import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarGroup } from "@/components/ui/sidebar";
import { ArrowRightIcon, CheckIcon, ChevronDown, EditIcon, Folder, Link, XIcon } from "lucide-react";
import { useState, useRef } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useAtomValue } from "jotai";
import { categoryListAtom , textDataAtom } from "@/utils/vars";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { COMMON_STYLES, CSS_CLASSES } from "@/utils/consts";
import { getCardClasses } from "@/utils/commonUtils";
let srcPath = "";
let nameEle = null as any;
function Page3({ setPage }: { setPage: (page: number) => void }) {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [category, setCategory] = useState({ name: "-1", icon: "" });
	const categories = useAtomValue(categoryListAtom);
	const text = useAtomValue(textDataAtom);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [progress, setProgress] = useState(0);
	const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					srcPath = e.target.result as string;
				}
				setProgress((prev) => Math.max(prev, 2));
			};
			reader.readAsDataURL(file);
		} else setProgress((prev) => Math.max(prev, 2));
	};
	const openFileSelector = () => {
		fileInputRef.current?.click();
	};
	const keys = [
		{ key: "Ctrl+H", name: "Hair Color" },
		{ key: "Ctrl+F", name: "Footwear" },
		{ key: "Ctrl+R", name: "Reset to Default" },
	];
	return (
		<div
			className="text-muted-foreground fixed flex items-center justify-center w-screen h-screen"
			onClick={() => {
				
			}}>
			{/* Hidden file input for image selection */}
			<input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} style={{ display: "none" }} />
			<div className="flex flex-col items-center justify-center w-full h-full gap-8">
				<div className=" text-3xl">
					{text._Tutorial.p3.Title.split("").map((letter, index) => (
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
				<div
					className={getCardClasses(true)}
					style={{
						borderColor: "var(--accent)",
					}}>
					<img className="object-cover w-full h-full pointer-events-none"
					style={{
						opacity:srcPath?"1":"0"
					}}
					src={srcPath} />
					<img className="w-full h-[calc(100%-3.5rem)] -mt-71.5 duration-200 rounded-t-lg pointer-events-none object-cover" src={srcPath || "/wwmm.png"} />
					<div className={CSS_CLASSES.BG_BACKDROP + " flex items-center w-full min-h-14 gap-2 px-4 py-1"}>
						{<Folder />}
						<Label id="mod-name" className={CSS_CLASSES.INPUT_TRANSPARENT} style={{ ...COMMON_STYLES.TRANSPARENT_BG }}>
							Mod Name
						</Label>
						<Button
							
							disabled={true}
							className="-mt-123 flex text-red-300 cursor-pointer items-center justify-center bg-white/0  px-2 w-8 h-6 z-200 -ml-5 -mr-5">
							<XIcon className="pointer-events-none" />
						</Button>
					</div>
				</div>
			</div>
			<div className="min-w-84 bg-sidebar h-full border-l">
				<div className="flex flex-col h-full min-w-full gap-0 duration-300">
					<div className="min-w-16 flex items-center justify-center h-16 gap-3 px-3 border-b">
						<div className={`absolute flex right-86 gap-1 duration-300 ${progress > 0 && "opacity-0"}`}>
							{text._Tutorial.p3.Rename} <span className="text-accent">'My Mod'</span> <ArrowRightIcon />
						</div>
						<Button className="bg-input/0 hover:bg-input/0 text-accent w-6 h-10 -mr-2">{<Folder className="scale-150" />}</Button>
						<Input
						onFocus={(e)=>{
							e.currentTarget.select();
						}}
							onChange={(e) => {
								if(!nameEle) nameEle = document.getElementById("mod-name");
								if(nameEle) nameEle.textContent = e.target.value;
								if (e.target.value.trim().toLowerCase() == "my mod") {
									setProgress((prev) => Math.max(prev, 1));
								}
							}}
							type="text"
							className="w-full border-0 rounded-none animate-pulse border-border border-b-1 select-none focus-within:select-auto overflow-hidden min-h-16 focus-visible:ring-[0px] focus-within:border-0   text-ellipsis"
							style={{ backgroundColor: "#fff0", fontSize: "1rem" }}
							defaultValue="Mod Name"
						/>
						<div
							className="min-h-8 text-accent hover:border-border border-border/0 min-w-8 bg-pat2 hover:bg-pat1 flex items-center justify-center p-2 duration-200 border rounded-lg"
							onClick={() => {
								
							}}>
							{/* <ArrowUpRightFromSquareIcon className="w-full h-full" /> */}
						</div>
					</div>
					<SidebarGroup className="min-h-82 px-1 mt-1 select-none">
						<div className={`absolute flex items-center right-86 mt-2 gap-1 duration-300 ${progress != 1 && "opacity-0"}`}>
							<Label className="min-w-fit flex items-center">{text._Tutorial.p3.ClickOn} <EditIcon className="text-accent h-4" /> {text._Tutorial.p3.PImg} <ArrowRightIcon className="min-h-4" /></Label> 
						</div>
						<EditIcon onClick={progress > 0 ? openFileSelector : undefined} className="min-h-12 min-w-12 bg-background/50 z-25 text-accent rounded-tr-md rounded-bl-md self-end w-12 p-3 -mb-12 border cursor-pointer" />
						<img
							id="preview"
							className="w-82 h-82 bg-background object-cover duration-150 border rounded-lg"
							onError={(e) => {
								e.currentTarget.src = "/wwmm.png";
							}}
							src={srcPath}></img>
					</SidebarGroup>
					<SidebarGroup className="px-1 min-h-42.5 mt-1">
						<div className="flex flex-col w-full border rounded-lg">
							<div className="bg-pat2 flex items-center justify-between w-full p-1 rounded-lg">
								<div className={`absolute flex right-86  items-center gap-1 duration-300 ${progress != 2 && "opacity-0"}`}>
									<Label className="min-w-fit flex items-center">{text._Tutorial.p3.Cat} <span className="text-accent">'Camellya'</span>
									<ArrowRightIcon className="min-h-4" /></Label>
								</div>
								<Button className=" h-12 bg-accent/0 hover:bg-accent/0   min-w-28.5 w-28.5 text-accent">{text.generic.Category}</Button>
								<Popover
									open={popoverOpen}
									onOpenChange={(open) => {
										if (progress > 1) setPopoverOpen(open);
									}}>
									<PopoverTrigger asChild>
										<div role="combobox" className="overflow-hidden text-ellipsis  active:scale-90 whitespace-nowrap rounded-md text-sm font-medium transition-all p-2 gap-2 bg-sidebar text-accent shadow-xs hover:brightness-120  duration-300 h-12 flex items-center justify-between w-48.5">
											{category.name != "-1" ? (
												<>
													<div
														className="aspect-square flex items-center justify-center h-full rounded-full pointer-events-none"
														style={
															category.name != "Uncategorized"
																? {
																		backgroundImage: "url('" + category.icon + "')",
																		backgroundSize: "cover",
																		backgroundRepeat: "no-repeat",
																		backgroundPosition: "center",
																  }
																: {}
														}>
														{/* {category.name == "Uncategorized" && ques({ className: " h-full aspect-square scale-175 pointer-events-none " })} */}
													</div>
													<div className="w-30 text-ellipsis overflow-hidden break-words pointer-events-none">{category.name}</div>
												</>
											) : (
												text.generic.Select
											)}
											<ChevronDown />
										</div>
									</PopoverTrigger>
									<PopoverContent className="w-80 p-0 my-2 mr-2 border rounded-lg">
										<Command>
											<CommandInput placeholder="Search category..." className="h-12" />
											<CommandList>
												<CommandEmpty>{text._RightSideBar._RightLocal.NoCat}</CommandEmpty>
												<CommandGroup>
													{categories.map((cat) => (
														<CommandItem
															key={cat._sName}
															value={cat._sName}
															onSelect={(currentValue) => {
																if (currentValue === "Camellya") {
																	setPage(3);
																}
																setCategory({ name: currentValue, icon: cat._sIconUrl });
																setPopoverOpen(false);
															}}>
															<div
																className="aspect-square flex items-center justify-center h-12 rounded-full pointer-events-none"
																style={
																	cat._sName != "Uncategorized"
																		? {
																				background: "url('" + cat._sIconUrl + "')",
																				backgroundSize: "cover",
																				backgroundRepeat: "no-repeat",
																				backgroundPosition: "center",
																		  }
																		: {}
																}>
																{/* {cat.name == "Uncategorized" && ques({ className: " h-full text-inherit aspect-square scale-175 pointer-events-none " })} */}
															</div>
															<div className="w-35 text-ellipsis overflow-hidden break-words">{cat._sName}</div>
															<CheckIcon className={cn("ml-auto", category.name === cat._sName ? "opacity-100" : "opacity-0")} />
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>
							<div className="bg-pat1 flex justify-between w-full p-1 rounded-lg">
								<Button className="bg-input/0 hover:bg-input/0 h-12 w-28.5 text-accent">{text._RightSideBar._RightLocal.Source}</Button>
								<div className="w-48.5 flex items-center px-1">
									<Input
										type="text"
										placeholder="No source"
										className="w-full select-none focus-within:select-auto overflow-hidden h-12 focus-visible:ring-[0px] border-0  text-ellipsis"
										style={{ backgroundColor: "#fff0" }}
									/>
									<div
										className="bg-pat2 hover:brightness-150 p-2 duration-200 rounded-lg"
										onClick={() => {
											
											
											
										}}>
										<Link className=" w-4 h-4" />
									</div>
									{/* <a href={localData[item.truePath]?.source} target="_blank" className="bg-pat2 hover:brightness-150 p-2 duration-200 rounded-lg">
								<Link className=" w-4 h-4" />
							</a> */}
								</div>
							</div>
							<div className="bg-pat2 flex justify-between w-full p-1 rounded-lg">
								<Button className="bg-input/0 hover:bg-input/0 h-12 w-28.5 text-accent">{text._RightSideBar._RightLocal.Notes}</Button>
								<div className="w-48.5 flex items-center px-1">
									<Input
										type="text"
										className="w-full select-none focus-within:select-auto overflow-hidden h-12 focus-visible:ring-[0px] border-0  text-ellipsis"
										style={{ backgroundColor: "#fff0" }}
										placeholder="No notes"
									/>
								</div>
							</div>
						</div>
					</SidebarGroup>
					<SidebarGroup className="px-1 my-1 duration-200">
						<div className="flex flex-col w-full h-full overflow-hidden border rounded-lg">
							<div className="bg-pat1 text-accent min-h-14 flex items-center justify-center w-full p-1 rounded-lg">{text._RightSideBar._RightLocal.HotKeys}</div>
							<div className="w-full h-full">
								<div className="text-gray-300 h-full max-h-[calc(100vh-39.75rem)] w-full overflow-y-auto overflow-x-hidden">
									<div className="min-h-8 text-accent bg-pat2 flex items-center justify-center">
										<label className="text-c w-1/2 px-4">{text._RightSideBar._RightLocal.Key}</label>
										<label className="text-c w-1/2 px-4">{text._RightSideBar._RightLocal.Action}</label>
									</div>
									{keys?.map((hotkey, index) => (
										<div key={index} className={"flex w-full items-center justify-center h-8 bg-pat" + (1 + (index % 2))}>
											<label className="text-c w-1/2 px-4">{hotkey.key}</label>
											<label className="text-c w-1/2 px-4">{hotkey.name}</label>
										</div>
									))}
								</div>
							</div>
						</div>
					</SidebarGroup>
				</div>
			</div>
		</div>
	);
}
export default Page3;
