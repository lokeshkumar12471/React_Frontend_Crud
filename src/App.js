import { Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Home from "./Component/Home";
import Students from "./Component/Students";
import EditStudent from "./Component/EditStudent";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/students" element={<Students />} />
        <Route exact path="/student/:id/edit" element={<EditStudent />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;