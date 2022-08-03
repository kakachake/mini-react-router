import { cloneElement, createElement, FC, ReactElement } from "react";
import {
  IMatch,
  IRootHistory,
  RouterContext,
  useRouterContext,
} from "./Router";
import { Location } from "history";
import { matchPath, RouteProps } from "react-router-dom";

export interface RouteComponentProps {
  history: IRootHistory;
  location: Location;
  match: IMatch | null;
}

interface RouteChildrenProps {
  history: IRootHistory;
  location: Location;
  match: IMatch | null;
}

interface IRouteProps {
  path: string;
  location?: Location;
  computedMatch?: IMatch;
  component?: React.ComponentType<any> | undefined;
  render?: ((props: RouteComponentProps) => React.ReactNode) | undefined;
  children?:
    | ((props: RouteChildrenProps) => React.ReactNode)
    | React.ReactNode
    | undefined;
  exact?: boolean | undefined;
  sensitive?: boolean | undefined;
  strict?: boolean | undefined;
}

const Route: FC<IRouteProps> = (props) => {
  const context = useRouterContext();
  const location = props?.location || context.location;
  // 如果父级为Switch，则不需要匹配路由，直接使用computedMatch
  const match = props.computedMatch
    ? props.computedMatch
    : props.path
    ? matchPath(location.pathname, props as RouteProps)
    : context.match;
  console.log(context.match);
  console.log(props.computedMatch);
  console.log(match);

  const newRouterProps = { ...context, location, match };
  // 拿到父组件可能传递组件的props
  let { children, component, render } = props;
  if (Array.isArray(children) && children.length === 0) children = null;
  let renderChildren = null;
  if (newRouterProps.match) {
    if (children) {
      renderChildren =
        typeof children === "function" ? children(newRouterProps) : children;
    } else if (component) {
      renderChildren = createElement(component, newRouterProps);
    } else if (render) {
      renderChildren = render(newRouterProps);
    }
  }
  return (
    <RouterContext.Provider value={newRouterProps}>
      {renderChildren}
    </RouterContext.Provider>
  );
};

export default Route;
