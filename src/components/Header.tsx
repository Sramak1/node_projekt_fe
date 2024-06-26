import axios from "axios";
import Welcome from "./Welcome.tsx";

const Header = () => {
    const logout=async ()=>{
        const res = await axios.get('http://localhost:3000/auth/logout',{withCredentials:true});
        console.log(res);
        window.location.reload();

    }
  return(
      <>
        <header>
            <div className="navigation-div">
                    <a href="/" className="text-white">Domov</a>
                    <a href="/login" className="text-white">Vpis</a>
                    <a href="/register" className="text-white">Registracija</a>
                    <a href="/create" className="text-white">Ustvari opravilo</a>
                    <a className="text-white" onClick={logout}>Izpis</a>
            </div>
        </header>
      </>
  )
}
export default Header;