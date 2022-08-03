import {
  createBrowserRouter,
  Route,
  useHistory,
  useListen,
  Switch,
  createHashRouter,
  useLocation,
} from "./lib/mini-router";
import "./App.css";
import { To } from "history";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import List from "./pages/List";
import { FC, useEffect, useState } from "react";
const menusList = [
  {
    name: "首页",
    path: "/home",
  },
  {
    name: "列表",
    path: "/list",
  },
  {
    name: "详情",
    path: "/detail",
  },
];

function Nav() {
  const history = useHistory();
  /* 路由跳转 */
  const RouterGo = (url: To) => history.push(url);
  const path = history.location.pathname;
  return (
    <div>
      {menusList.map((item) => (
        <span
          className={`nav ${item.path === path ? "active" : ""}`}
          key={item.path}
          onClick={() => RouterGo(item.path)}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
}
function Top() {
  /* 路由监听 */

  useListen((location) => {
    console.log("当前路由是：", location.pathname);
  });
  return <div>--------top------</div>;
}
function App() {
  const [Router, setRouter] = useState(() => createBrowserRouter());
  const history = useHistory();
  console.log("history", history);

  const changRouter = (fn: any) => {
    history.push("/");
    setRouter(fn);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 20,
        }}
      >
        <button
          className="link"
          onClick={() => changRouter(() => createBrowserRouter())}
        >
          browser router
        </button>
        <button
          className="link"
          onClick={() => changRouter(() => createHashRouter())}
        >
          hash router
        </button>
      </div>
      <Router>
        <Top />
        <Nav />
        <Switch>
          <Route component={Home} path="/home"></Route>
          <Route component={Detail} path="/detail" />
          <Route path="/list" render={(props) => <List {...props} />} />
        </Switch>
        <div>--------bottom------</div>
      </Router>
    </div>
  );
}

export default App;
