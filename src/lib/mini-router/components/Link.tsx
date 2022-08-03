import { To } from "history";
import { FC, ReactNode } from "react";
import { useHistory } from "../hooks/hooks";

interface ILinkProps {
  children: ReactNode;
  to: To;
}

const Link: FC<ILinkProps> = ({ children, to, ...props }) => {
  const history = useHistory();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    history.push(to);
  };
  return (
    <a
      style={{
        cursor: "pointer",
      }}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;
