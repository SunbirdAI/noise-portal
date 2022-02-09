// Styles
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import './App.css';
import Home from "./components/Home";
import Sensors from "./components/Sensors";
import DataPage from "./components/DataPage";
import Maps from "./components/Maps";
import NotFound from "./components/NotFound";

const App = () => (
    <Router>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/sensors' element={<Sensors/>}/>
            <Route path='/data' element={<DataPage/>}/>
            <Route path='/maps' element={<Maps/>}/>
            <Route path='/*' element={<NotFound/>}/>
        </Routes>
        {/*<GlobalStyle/>*/}
    </Router>
);

export default App;
