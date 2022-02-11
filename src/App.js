// Styles
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import './App.css';
import Home from "./components/Home";
import Sensors from "./components/Sensors";
import NotFound from "./components/NotFound";
import Location from "./components/Location";

const App = () => (
    <Router>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/sensors' element={<Sensors/>}/>
            <Route path='location/:locationId' element={<Location/>}/>
            <Route path='/*' element={<NotFound/>}/>
        </Routes>
        {/*<GlobalStyle/>*/}
    </Router>
);

export default App;
