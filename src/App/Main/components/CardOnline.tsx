import { Loader, MessageSquare, Plus, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import Blur from "./Filter";
import { getTimeDifference  } from "@/utils/vars";
import { preventContextMenu, isDirectClick } from "@/utils/commonUtils";
import { CSS_CLASSES, COMMON_STYLES, MOUSE_BUTTONS } from "@/utils/consts";
import type { CardOnlineProps } from "@/utils/types";
function CardOnline(data: CardOnlineProps) {
  const isSelected = data.selected === true && data.position !== undefined;
  const backgroundImage = data._aPreviewMedia?._aImages?.[0] 
    ? `${data._aPreviewMedia._aImages[0]._sBaseUrl}/${data._aPreviewMedia._aImages[0]._sFile}`
    : "/wwmm.png";
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "";
    if (!isDirectClick(e)) return;
    
    if (e.button === MOUSE_BUTTONS.LEFT) {
      data.onModClick(data);
    }
  };
  return (
    <div
      className={`${CSS_CLASSES.CARD_BASE} ${CSS_CLASSES.FADE_IN} cursor-pointer gap-0 p-0 justify-end flex flex-col ${
        isSelected ? CSS_CLASSES.CARD_ACTIVE : ""
      }`}
      key={data._sName}
      onMouseUp={handleMouseUp}
      onContextMenu={preventContextMenu}
    >
      <div 
        className="flex flex-col items-center justify-center w-full h-full duration-200 bg-center bg-cover rounded-t-lg pointer-events-none"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Blur blur={data._sInitialVisibility === "hide" && (data.blur===true)} />
      </div>
      <div className={`w-fit ${CSS_CLASSES.BG_TRANSPARENT} text-accent backdrop-blur -mt-72 flex flex-col items-center px-4 py-1 mb-48 rounded-br-lg pointer-events-none`}>
        {data._sModelName}
      </div>
      
      <div className={`${CSS_CLASSES.BG_BACKDROP} flex flex-col items-center w-full px-4 py-1`}>
        <Input 
          readOnly 
          type="text" 
          className={CSS_CLASSES.INPUT_CARD}
          style={COMMON_STYLES.TRANSPARENT_BG}
          defaultValue={data._sName} 
        />
        <div className="flex justify-between w-full h-6 text-xs">
          <label className="flex items-center justify-center">
            <Plus className="h-4" />
            {getTimeDifference(data.now, data._tsDateAdded || 0)}
          </label>
          <label className="flex items-center justify-center">
            <Loader className="h-4" />
            {getTimeDifference(data.now, data._tsDateModified || 0)}
          </label>
          <label className="flex items-center justify-center">
            <ThumbsUp className="h-4" />
            {data._nLikeCount || "0"}
          </label>
          <label className="flex items-center justify-center">
            <MessageSquare className="h-4" />
            {data._nPostCount || "0"}
          </label>
        </div>
      </div>
    </div>
	);
}
export default CardOnline;