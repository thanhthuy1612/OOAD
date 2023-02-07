import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "./DefaultLayout.css";

export default function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
