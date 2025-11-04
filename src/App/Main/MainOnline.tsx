import { onlinePathAtom, onlineTypeAtom, settingsDataAtom  } from "@/utils/vars";
import CardOnline from "@/App/Main/components/CardOnline";
import { AnimatePresence, motion } from "motion/react";
import { useAtomValue } from "jotai";
import { useOnlineModState } from "@/utils/commonHooks";
import Carousel from "./components/Carousel";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { ANIMATIONS, COMMON_STYLES } from "@/utils/consts";
import { MainOnlineProps, OnlineMod } from "@/utils/types";

function MainOnline({ max, count, online, loadMore }: MainOnlineProps) {
  const { onlineData, setSelectedItem } = useOnlineModState();
  const onlinePath = useAtomValue(onlinePathAtom);
  const onlineType = useAtomValue(onlineTypeAtom);
  const nsfw = useAtomValue(settingsDataAtom).nsfw;
  const [debouncedOnlinePath, setDebouncedOnlinePath] = useState(onlinePath);
  const now = Math.round(Date.now() / 1000);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedOnlinePath(onlinePath);
    }, 300);
    return () => clearTimeout(timer);
  }, [onlinePath]);
  const onModClick = (data: OnlineMod) => {
    setSelectedItem(`${data._sModelName}/${data._idRow}`);
  };
	return (
		<>
			<div
				className="flex flex-col items-center h-full min-w-full overflow-y-auto duration-300"
				style={{
					opacity: online ? 1 : 0,
					transitionDelay: online ? "0.3s" : "0s",
					pointerEvents: online ? "all" : "none",
					marginLeft: "-100%",
				}}
				
				onScroll={loadMore}>
				<div className="h-fit w-full max-w-3xl">
					<div
						className="aspect-video w-full max-w-3xl duration-500"
						style={{
							opacity: debouncedOnlinePath.startsWith("home") && onlineData.banner.length > 0 ? 1 : 0,
							marginBottom: debouncedOnlinePath.startsWith("home") && onlineData.banner.length > 0 ? "1rem" : "-100%",
						}}>
						<Carousel data={onlineData.banner.filter(item => ((item._sModelName=="Mod" || onlineType=="") && (nsfw||item._sInitialVisibility!="hide"))) } blur={nsfw==1} onModClick={onModClick} />
					</div>
				</div>
				<AnimatePresence>
					{online && (
						<motion.div
							{...ANIMATIONS.FADE}
							id="online-items"
							className="min-h-fit grid justify-center w-full py-4"
							style={COMMON_STYLES.CARD_GRID}>
							{onlineData[debouncedOnlinePath] && onlineData[debouncedOnlinePath].map((item, index) => ((nsfw||item._sInitialVisibility!="hide") &&
                <CardOnline 
                  key={`${item._sModelName}-${item._idRow}`}
                  {...item}
                  index={index}
                  now={now}
                  onModClick={onModClick}
				  blur={nsfw==1}
                />
              ))}
						</motion.div>
					)}
				</AnimatePresence>
				{count < max && <Loader className="min-w-8 min-h-8 animate-spin text-accent" />}
			</div>
		</>
	);
}
export default MainOnline;