import Home from "../Page/Home";
import Staff from "../Page/Staff";
import OnlyHeaderLayout from "../Layout/OnlyHeaderLayout";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/staff", component: Staff, layout: OnlyHeaderLayout },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
