import { FC } from "react";
import { IContext, withRouter } from "../lib/mini-router/";

interface IHomeChildProps extends IContext {}

const HomeChild: FC<IHomeChildProps> = (props) => {
  console.log(props);

  return (
    <div>
      <h1>HomeChild</h1>
      <p>当前路由：{props.location.pathname}</p>
    </div>
  );
};

export default withRouter(HomeChild);
