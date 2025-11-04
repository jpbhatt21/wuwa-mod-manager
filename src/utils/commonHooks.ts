import { useAtom, useAtomValue } from 'jotai';
import {
  localModListAtom,
  localFilteredModListAtom,
  localSelectedModAtom,
  localPresetListAtom,
  settingsDataAtom,
  modRootDirAtom,
  refreshAppIdAtom,
  onlineModeAtom,
  leftSidebarOpenAtom,
  rightSidebarOpenAtom,
  onlineDataAtom,
  onlineSelectedItemAtom,
  onlineDownloadListAtom,
  localDataAtom,
  installedItemsAtom,
  updateCacheAtom,
  sortedInstalledItemsAtom,
  apiRoutes
} from './vars';
import { InstalledListItem } from './types';
import { modRouteFromURL } from './fsUtils';
import { useEffect } from 'react';
export function useLocalModState() {
  const [localModList, setLocalModList] = useAtom(localModListAtom);
  const [selectedItem, setSelectedItem] = useAtom(localSelectedModAtom);
  const localFilteredItems = useAtomValue(localFilteredModListAtom);
  const root = useAtomValue(modRootDirAtom);
  const lastUpdated = useAtomValue(refreshAppIdAtom);
  return {
    localModList,
    setLocalModList,
    selectedItem,
    setSelectedItem,
    localFilteredItems,
    root,
    lastUpdated
  };
}
export function useOnlineModState() {
  const [onlineData, setOnlineData] = useAtom(onlineDataAtom);
  const [selectedItem, setSelectedItem] = useAtom(onlineSelectedItemAtom);
  const [downloadList, setDownloadList] = useAtom(onlineDownloadListAtom);
  return {
    onlineData,
    setOnlineData,
    selectedItem,
    setSelectedItem,
    downloadList,
    setDownloadList
  };
}
export function useAppSettings() {
  const [settings, setSettings] = useAtom(settingsDataAtom);
  const [presets, setPresets] = useAtom(localPresetListAtom);
  const [localData, setLocalData] = useAtom(localDataAtom);
  const online = useAtomValue(onlineModeAtom);
  return {
    settings,
    setSettings,
    presets,
    setPresets,
    localData,
    setLocalData,
    online
  };
}
export function useSidebarState() {
  const leftSidebarOpen = useAtomValue(leftSidebarOpenAtom);
  const rightSidebarOpen = useAtomValue(rightSidebarOpenAtom);
  return {
    leftSidebarOpen,
    rightSidebarOpen
  };
}
export function useAppState() {
  const online = useAtomValue(onlineModeAtom);
  const root = useAtomValue(modRootDirAtom);
  const settings = useAtomValue(settingsDataAtom);
  const lastUpdated = useAtomValue(refreshAppIdAtom);
  return {
    online,
    root,
    settings,
    lastUpdated
  };
}
export function useInstalledItemsManager() {
  const [, setInstalledItems] = useAtom(installedItemsAtom);
  const [updateCache, setUpdateCache] = useAtom(updateCacheAtom);
  const localData = useAtomValue(localDataAtom);
  const sortedItems = useAtomValue(sortedInstalledItemsAtom);
  async function checkModStatus(item: InstalledListItem) {
    let modStatus = 0;
    if (updateCache[item.name]) {
      modStatus = item.updated < updateCache[item.name] ? item.viewed < updateCache[item.name] ? 2 : 1 : 0;
    } else {
      try {
        const res = await fetch(apiRoutes.mod(modRouteFromURL(item.source)));
        if (res.ok) {
          const data = await res.json();
          if (data._tsDateModified) {
            let latest = item.updated || 0;
            data._aFiles.forEach((file: any) => {
              latest = Math.max(latest, (file._tsDateModified || file._tsDateAdded || 0) * 1000);
            });
            setUpdateCache(prev => ({ ...prev, [item.name]: latest }));
            modStatus = item.updated < latest ? item.viewed < latest ? 2 : 1 : 0;
          }
        }
      } catch (error) {
        return 0;
      }
    }
    return modStatus;
  }
  async function updateInstalledItems(localDataSnapshot: any) {
    const itemsToProcess = Object.keys(localDataSnapshot)
      .filter((key) => localDataSnapshot[key].source)
      .map((key) => ({
        name: key,
        source: localDataSnapshot[key].source,
        updated: localDataSnapshot[key].updatedAt || 0,
        viewed: localDataSnapshot[key].viewedAt || 0,
        modStatus: 0,
      }));
    const processedItems = await Promise.all(
      itemsToProcess.map(async (item) => {
        const modStatus = await checkModStatus(item);
        
        return { ...item, modStatus };
      })
    );
    setInstalledItems(processedItems);
  }
  useEffect(() => {
    if (Object.keys(localData).length > 0) {
      updateInstalledItems({ ...localData });
    } else {
      setInstalledItems([]);
    }
  }, [localData]);
  return {
    installed: sortedItems,
    updateCache
  };
}
export function useInstalledItems() {
  const installed = useAtomValue(sortedInstalledItemsAtom);
  const updateCache = useAtomValue(updateCacheAtom);
  
  return {
    installed,
    updateCache
  };
}