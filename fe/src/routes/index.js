import Home from "../Page/Home";
import StaffPage from "../Page/Staff";
import Schedule from "../Page/Schedule";
import OnlyHeaderLayout from "../Layout/OnlyHeaderLayout";
import Login from "../components/Login";

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/home", component: Home, layout: OnlyHeaderLayout },
  { path: "/staff", component: StaffPage, layout: OnlyHeaderLayout },
  { path: "/schedule", component: Schedule, layout: OnlyHeaderLayout },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
