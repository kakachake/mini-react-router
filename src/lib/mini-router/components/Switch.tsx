import { matchPath } from "react-router-dom";
import { Location } from "history";
import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import { IMatch, useRouterContext } from "./Router";
interface ISwitchProps {
  children?: ReactNode;
  location?: Location;
}

const Switch: FC<ISwitchProps> = (props) => {
  const context = useRouterContext();
  const location = props.location || context.location;
  let children: ReactElement,
    match: IMatch | null = null;
  Children.forEach(props.children, (child) => {
    if (!match && isValidElement(child)) {
      const path = child.props.path;
      children = child;
      match = path
        ? matchPath(location.pathname, { ...child.props })
        : context.match;
    }
  });
  return match
    ? cloneElement(children!, { location, computedMatch: match })
    : null;
};

export default Switch;
