import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createBrowserHistory, createHashHistory, Location } from "history";

export type IRootHistory =
  | ReturnType<typeof createBrowserHistory>
  | ReturnType<typeof createHashHistory>;

export interface IMatch {
  path: string;
  url: string;
  isExact: boolean;
  params: { [key: string]: string };
}

export interface IContext {
  history: IRootHistory;
  location: Location;
  match: IMatch | null;
}

export const RouterContext = createContext<IContext>(null as any);
export let rootHistory: IRootHistory;

interface IRouterProps {
  createHistory: typeof createBrowserHistory | typeof createHashHistory;
  children: React.ReactNode;
}

const Router: FC<IRouterProps> = (props) => {
  const { createHistory } = props;
  const history = useMemo(() => {
    rootHistory = createHistory();
    return rootHistory;
  }, []);
  const [location, setLocation] = useState(history.location);
  useEffect(() => {
    const unlisten = history.listen((update) => {
      console.log("update", update);
      setLocation(update.location);
    });
    return function () {
      unlisten && unlisten();
    };
  });
  return (
    <RouterContext.Provider
      value={{
        location,
        history,
        match: {
          path: "/",
          url: "/",
          params: {},
          isExact: location.pathname === "/",
        },
      }}
    >
      {props.children}
    </RouterContext.Provider>
  );
};

export default Router;

export const createBrowserRouter = () => {
  return (props: any) => (
    <Router {...props} createHistory={createBrowserHistory} />
  );
};

export const createHashRouter = () => {
  return (props: any) => (
    <Router {...props} createHistory={createHashHistory} />
  );
};

export const useRouterContext = () => useContext(RouterContext);
