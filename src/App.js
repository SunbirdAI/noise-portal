// Styles
import {GlobalStyle} from "./GlobalStyles";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Sensors from "./components/Sensors";
import DataPage from "./components/DataPage";
import Maps from "./components/Maps";
import NotFound from "./components/NotFound";

const App = () => (
    <Router>
        <Header/>
        <Routes>
            <Route path='/noise-portal' element={<Home/>}/>
            <Route path='/noise-portal/sensors' element={<Sensors/>}/>
            <Route path='/noise-portal/data' element={<DataPage/>}/>
            <Route path='/noise-portal/maps' element={<Maps/>}/>
            <Route path='/noise-portal/*' element={<NotFound/>}/>
        </Routes>
        <GlobalStyle/>
    </Router>
);

export default App;
