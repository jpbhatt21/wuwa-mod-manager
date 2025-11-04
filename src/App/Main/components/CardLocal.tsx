import { Label } from "@/components/ui/label";
import { renameMod } from "@/utils/fsUtils";
import { setChange } from "@/utils/hotreload";
import { previewUri } from "@/utils/vars";
import { File, Folder, XIcon } from "lucide-react";
import { handleImageError, handleCardMouseUp, preventContextMenu, formatModName, toggleModName, buildPreviewUrl, getCardClasses } from "@/utils/commonUtils";
import { CSS_CLASSES, COMMON_STYLES } from "@/utils/consts";
import type { CardLocalProps } from "@/utils/types";
function CardLocal({ root, item, selectedItem, setSelectedItem, index, lastUpdated, settings, deleteItem }: CardLocalProps) {
	const previewUrl = buildPreviewUrl(previewUri, root, item.path, lastUpdated);
	const isSelected = selectedItem === index;
	const handleToggleMod = () => {
		const newName = toggleModName(item.name, item.enabled);
		renameMod(item.path, newName);
		setChange();
	};
	const handleSelectMod = () => {
		setSelectedItem(index);
	};
	return (
		<div
			className={getCardClasses(isSelected)}
			style={{
				borderColor: item.enabled ? "var(--accent)" : "",
			}}
			onContextMenu={preventContextMenu}
			onMouseUp={(e) => handleCardMouseUp(e, settings, handleToggleMod, handleSelectMod)}>
			<img style={{filter: item.enabled ? "brightness(1)" : "brightness(0.5) saturate(0.5)",}} className="object-cover w-full h-full pointer-events-none" src={previewUrl} onError={(e) => handleImageError(e, "/wwmm.png", true)} />
			<img style={{filter: item.enabled ? "brightness(1)" : "brightness(0.5) saturate(0.5)",}} className="w-full h-[calc(100%-3.5rem)] -mt-71.5 duration-200 rounded-t-lg pointer-events-none object-cover" src={previewUrl} onError={(e) => handleImageError(e, "/wwmm.png", false)} />
			<div  className={CSS_CLASSES.BG_BACKDROP + " flex items-center w-full min-h-14 gap-2 px-4 py-1"}>
				{item.isDir ? <Folder style={{filter: item.enabled ? "brightness(1)" : "brightness(0.5) saturate(0.5)",}}/> : <File style={{filter: item.enabled ? "brightness(1)" : "brightness(0.5) saturate(0.5)",}} />}
				<Label className={CSS_CLASSES.INPUT_TRANSPARENT} style={{...COMMON_STYLES.TRANSPARENT_BG,filter: item.enabled ? "brightness(1)" : "brightness(0.5) saturate(0.5)"}}>
					{formatModName(item.name)}
				</Label>
				<div onClick={() => deleteItem(item)} className="-mt-123 cursor-pointer flex text-red-300 items-center justify-center  px-2 w-8 h-6 z-200 -ml-5 -mr-5">
					<XIcon className= "pointer-events-none"/>
				</div>
			</div>
		</div>
	);
}
export default CardLocal;
