import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Wrapper from "./components/Wrapper.tsx";

function App() {
  return (
    <>
        <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/Login'} element={<Login/>}/>
          <Route path={'/Register'} element={<Register/>}/>
        </Routes>
      </BrowserRouter>
        </Wrapper>
    </>
  )
}

export default App
