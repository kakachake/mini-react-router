import { FC } from "react";
import { RouteComponentProps } from "../lib/mini-router/components/Route";
type IListProps = {} & RouteComponentProps;

const List: FC<IListProps> = () => {
  return (
    <div>
      <h1>List</h1>
    </div>
  );
};

export default List;
