import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { VERSION } from "@/utils/consts";
import { getTimeDifference, updaterOpenAtom, updateWWMMAtom, textDataAtom } from "@/utils/vars";
import { useAtom, useAtomValue } from "jotai";
import { CircleAlert, DownloadIcon, Loader2Icon, UploadIcon } from "lucide-react";
import { useEffect, useRef } from "react";
let prev = 0;
let counter = 3000;
function Updater() {
	const textData = useAtomValue(textDataAtom);
	const [update, setUpdate] = useAtom(updateWWMMAtom);
	const ref1 = useRef<HTMLDivElement>(null);
	const ref2 = useRef<HTMLDivElement>(null);
	const ref3 = useRef<HTMLDivElement>(null);
	const [updaterOpen, setUpdaterOpen] = useAtom(updaterOpenAtom);
	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		if (update?.status === "ready" && counter == 3000)
			interval = setInterval(() => {
				if (ref3.current)
					ref3.current.innerHTML = textData._Main._components._Updater.In.replace(
						"<time>",
						Math.ceil(counter / 10).toString()
					);
				counter--;
				if (counter < 0) {
					update.raw?.install();
					clearInterval(interval);
				}
			}, 100);
	}, [update, ref3]);
	let maj = [];
	let min = [];
	let pat = [];
	if (update?.body) {
		let json = JSON.parse(update.body);
		//console.log(json)
		maj = json.major || [];
		min = json.minor || [];
		pat = json.patch || [];
	}

	return (
		<Dialog open={updaterOpen} onOpenChange={setUpdaterOpen}>
			<DialogTrigger asChild>
				<Button className="max-w-32 text-ellipsis bg-sidebar flex flex-col w-full h-full overflow-hidden text-xs">
					{update
						? {
								available: (
									<div className="min-w-24 min-h-12 text-accent flex items-center justify-center w-full gap-1 pointer-events-none">
										<UploadIcon className="min-h-4 min-w-4" />
										<Label className=" w-fit max-w-24 text-xs pointer-events-none">{textData.generic.Update}</Label>
									</div>
								),
								downloading: (
									<>
										<div
											key={"down1"}
											className="fade-in max-w-24 min-w-24 -mb-14 min-h-12 w-full  z-10 pointer-events-none"
										>
											<div
												ref={ref1}
												className="min-h-12 height-in bg-accent text-background hover:brightness-125 flex flex-col self-start justify-center overflow-hidden rounded-lg"
												style={{ width: prev + "%" }}
											>
												<div className="min-w-24 fade-in flex items-center justify-center gap-1 pointer-events-none">
													<Loader2Icon className="min-h-4 min-w-4 animate-spin" />

													<Label className=" w-fit max-w-24 text-[0.6rem] pointer-events-none">
														{textData._Main._components._Updater.Downloading}
													</Label>
												</div>
											</div>
										</div>

										<div
											key={"down2"}
											className="fade-in min-w-24 min-h-12 text-accent flex items-center justify-center w-full gap-1 pointer-events-none"
										>
											<Loader2Icon className="min-h-4 min-w-4 animate-spin" />

											<Label className=" w-fit max-w-24 text-[0.6rem] pointer-events-none">
												{textData._Main._components._Updater.Downloading}
											</Label>
										</div>
									</>
								),
								ready: (
									<div className="min-w-24 min-h-12 text-background bg-accent flex items-center justify-center w-full gap-1 pointer-events-none">
										<DownloadIcon className="min-h-4 min-w-4" />
										<Label className=" w-fit max-w-24 text-xs pointer-events-none">{textData.generic.Install}</Label>
									</div>
								),
								error: (
									<div className="min-w-24 min-h-12 text-background bg-accent flex items-center justify-center w-full gap-1 pointer-events-none">
										<CircleAlert className="min-h-4 min-w-4 text-red-300" />
										<Label className=" w-fit max-w-24 text-xs pointer-events-none text-red-300">
											{textData._Main._components._Updater.Error}
										</Label>
									</div>
								),
								installed: textData.generic.Installed,
						  }[update.status]
						: `v${VERSION}`}
				</Button>
			</DialogTrigger>
			<DialogContent className="min-w-180 wuwa-ft min-h-150 bg-background/50 border-border gap -4 flex flex-col items-center p-4 overflow-hidden border-2 rounded-lg">
				<div className="min-h-fit text-accent mt-6 text-3xl">{textData._Main._components._Updater.Updater}</div>
				<div className="min-h-fit mb-6 text-muted-foreground">
					{textData._Main._components._Updater.CurVer}: v{VERSION}
				</div>
				{update && (
					<>
						<div className="min-h-2 text-xl text-accent w-full ">
							Version {update.version}{" "}
							<span className="text-muted-foreground text-base">
								({getTimeDifference(Date.now() / 1000, new Date(update.date).getTime() / 1000)}{" "}
								{textData._Main._components._Updater.ago})
							</span>
						</div>
						<Separator className="my-2" />
					</>
				)}
				<div className="flex flex-col px-4 overflow-y-auto overflow-x-hidden  w-full h-82 max-h-82">
					{update ? (
						<>
							{maj.length > 0 && <div className="min-h-6 text-accent">{textData._Main._components._Updater.Maj}:</div>}
							{maj.map((item: string, index: number) => (
								<div key={index} className="min-h-fit text-lg text-muted-foreground flex items-center mt-1 gap-2">
									<div className="min-w-1 min-h-1 self-start mt-3 aspect-square bg-accent rounded-full"></div>
									<div>{item}</div>
								</div>
							))}
							{min.length > 0 && (
								<div className="min-h-6 text-accent mt-4">{textData._Main._components._Updater.Min}:</div>
							)}
							{min.map((item: string, index: number) => (
								<div key={index} className="min-h-fit text-base text-muted-foreground flex items-center mt-0.5 gap-2">
									<div className="min-w-1 min-h-1 self-start mt-2.5 aspect-square bg-accent rounded-full"></div>
									<div>{item}</div>
								</div>
							))}
							{pat.length > 0 && (
								<div className="min-h-6 text-accent mt-4">{textData._Main._components._Updater.Patch}:</div>
							)}
							{pat.map((item: string, index: number) => (
								<div key={index} className="min-h-fit text-muted-foreground flex items-center gap-2 mt-0.5">
									<div className="min-w-1 min-h-1 self-start mt-2.5 aspect-square bg-accent rounded-full"></div>
									<div>{item}</div>
								</div>
							))}
						</>
					) : (
						<div className="h-full w-full items-center justify-center flex flex-col text-muted-foreground">
							{textData._Main._components._Updater.Lat}
							<a href="https://gamebanana.com/mods/593490" target="_blank" className="absolute opacity-40 mt-124">{textData.generic.BFR}</a>
						</div>
					)}
				</div>
				{update && (
					<div className="flex items-center justify-end w-full h-10 mt-2">
						<div ref={ref3} className="text-muted-foreground text-xs w-full">
							{update.status == "ready" ? (
								<>{textData._Main._components._Updater.Soon}</>
							) : (
								textData._Main._components._Updater.Use
							)}
						</div>
						<Button
							className="w-28"
							disabled={update.status == "downloading" || update.status == "installed"}
							// disabled={disabled}
							onClick={async () => {
								if ((update.status === "available" || update.status === "error") && update.raw) {
									let downloaded = 0;
									let contentLength = 0;

									await update.raw?.download((event: any) => {
										switch (event.event) {
											case "Started":
												contentLength = event.data.contentLength;
												setUpdate((prev) => (prev ? { ...prev, status: "downloading" } : prev));
												//console.log(`started downloading ${event.data.contentLength} bytes`);
												break;
											case "Progress":
												downloaded += event.data.chunkLength;
												prev = Math.floor((downloaded / contentLength) * 100);
												if (ref1.current) ref1.current.style.width = prev + "%";
												if (ref2.current) ref2.current.innerHTML = `${prev}%`;

												//console.log(`downloaded ${downloaded} from ${contentLength}`);
												break;
											case "Finished":
												counter = 3000;
												setUpdate((prev) => (prev ? { ...prev, status: "ready" } : prev));
												setUpdaterOpen(true);
												//console.log("download finished");
												break;
										}
									});
								} else if (counter > 0) {
									update.raw?.install();
								}
							}}
						>
							<div ref={ref2}>
								{
									{
										available: textData.generic.Update,
										downloading: textData._Main._components._Updater.Downloading,
										ready: textData._Main._components._Updater.InstallNow,
										error: textData._Main._components._Updater.Retry,
										installed: textData.generic.Installed,
									}[update.status]
								}
							</div>
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}

export default Updater;
