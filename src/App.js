// Styles
import {GlobalStyle} from "./GlobalStyles";

import Header from "./components/Header";
import Home from "./components/Home";

function App() {
    return (
        <div className="App">
            <Header/>
            <Home/>
            <GlobalStyle/>
        </div>
    );
}

export default App;
