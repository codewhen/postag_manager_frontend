import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import Sentence from "./features/sentence/Sentence";
import Word from "./features/word/Word";
import { Toaster } from "react-hot-toast";
import Output from "./features/output/Output";
import AdminDashboard from "./features/admin_dashboard/AdminDashboard";
import AdminUserEdit from "./features/admin_user_edit/AdminUserEdit";
import AdminDoc from "./features/admin_doc/AdminDoc";
import AdminTaggedDoc from "./features/admin_tagged_doc/AdminTaggedDoc";
import AdminDocList from "./features/admin_doc_list/AdminDocList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sentence" element={<Sentence />} />
        <Route path="/word" element={<Word />} />
        <Route path="/result" element={<Output />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/user" element={<AdminUserEdit />} />
        <Route path="/admin/doc" element={<AdminDoc />} />
        <Route path="/admin/tagged/:id" element={<AdminTaggedDoc />} />
        <Route path="/admin/tagged" element={<AdminDocList />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
