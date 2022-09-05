import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import Sentence from "./features/sentence/Sentence";
import Word from "./features/word/Word";
import { Toaster } from "react-hot-toast";
import Output from "./features/output/Output";
import AdminDashboard from "./features/admin_dashboard/AdminDashboard";
import AdminUserList from "./features/admin_user_list/AdminUserList";
import AdminDoc from "./features/admin_doc/AdminDoc";
import AdminTaggedDoc from "./features/admin_tagged_doc/AdminTaggedDoc";
import AdminDocList from "./features/admin_doc_list/AdminDocList";
import AdminUserCreate from "./features/admin_user_create/AdminUserCreate";
import Login from "./features/login/Login";
import AssignFetch from "./features/assign_fetch/AssignFetch";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AssignFetch />} />
        <Route path="/sentence" element={<Sentence />} />
        <Route path="/word" element={<Word />} />
        <Route path="/result" element={<Output />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/user" element={<AdminUserList />} />
        <Route path="/admin/user/new" element={<AdminUserCreate />} />
        <Route path="/admin/doc" element={<AdminDoc />} />
        <Route path="/admin/tagged/:id" element={<AdminTaggedDoc />} />
        <Route path="/admin/tagged" element={<AdminDocList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
