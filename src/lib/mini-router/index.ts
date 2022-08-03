export * from "./hooks/hooks";
import withRouter from "./utils/withRouter";
import Route from "./components/Route";
import {
  createBrowserRouter,
  createHashRouter,
  IContext,
} from "./components/Router";
import Switch from "./components/Switch";
import Link from "./components/Link";
export {
  Route,
  createBrowserRouter,
  createHashRouter,
  Switch,
  Link,
  withRouter,
};
export type { IContext };
