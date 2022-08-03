import { FC } from "react";
import { Route } from "../lib/mini-router";
import Link from "../lib/mini-router/components/Link";
import HomeChild from "./HomeChild";

const Home: FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to={"/home/child"}>child</Link>
      <Route component={HomeChild} path="/home/child"></Route>
    </div>
  );
};

export default Home;
