import { rootHistory, useRouterContext } from "../components/Router";
import { History, Location } from "history";
import { useEffect, useState } from "react";

export const useLocation = (): Location => {
  return useRouterContext()?.location || rootHistory.location;
};

export const useHistory = (): History => {
  const [history, setHistory] = useState<History>();
  useEffect(() => {
    setHistory(rootHistory);
  }, []);
  return useRouterContext()?.history || history;
};

export const useListen = (cb: (location: Location) => void) => {
  useEffect(() => {
    if (!rootHistory) return;
    const unlisten = rootHistory.listen((update) => {
      cb(update.location);
    });
    return () => {
      unlisten && unlisten();
    };
  }, []);
};
