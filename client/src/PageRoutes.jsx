import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import "./style.scss";

function PageRoutes() {
    return (
        <div className="app">
            <div className="container">
                <BrowserRouter>
                    <Routes>
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/' element={<Home />} />
                        <Route path='/write' element={<Write />} />
                        <Route path='/post/:post_id' element={<Single />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}
export default PageRoutes;