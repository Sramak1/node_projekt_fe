import axios from "axios";

const Header = () => {
    const logout=async ()=>{
        const res = await axios.get('http://localhost:3000/auth/logout',{withCredentials:true});
        console.log(res);
        window.location.reload();

    }
  return(
      <>
          <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
              <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
                  <li>
                      <button type="button" className="dropdown-item d-flex align-items-center"
                              data-bs-theme-value="light" aria-pressed="false">
                          <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                              <use href="#sun-fill"></use>
                          </svg>
                          Light
                          <svg className="bi ms-auto d-none" width="1em" height="1em">
                              <use href="#check2"></use>
                          </svg>
                      </button>
                  </li>
                  <li>
                      <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="dark"
                              aria-pressed="false">
                          <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                              <use href="#moon-stars-fill"></use>
                          </svg>
                          Dark
                          <svg className="bi ms-auto d-none" width="1em" height="1em">
                              <use href="#check2"></use>
                          </svg>
                      </button>
                  </li>
                  <li>
                      <button type="button" className="dropdown-item d-flex align-items-center active"
                              data-bs-theme-value="auto" aria-pressed="true">
                          <svg className="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                              <use href="#circle-half"></use>
                          </svg>
                          Auto
                          <svg className="bi ms-auto d-none" width="1em" height="1em">
                              <use href="#check2"></use>
                          </svg>
                      </button>
                  </li>
              </ul>
          </div>


          <header data-bs-theme="dark" style={{position:"fixed"}}>
              <div className="collapse text-bg-dark" id="navbarHeader">
                  <div className="container">
                      <div className="row">
                          <div className="col-sm-4 offset-md-1 py-4">
                              <h4>Navigate</h4>
                              <ul className="list-unstyled">
                                  <li><a href="/" className="text-white">Domov</a></li>
                                  <li><a href="/login" className="text-white">Vpis</a></li>
                                  <li><a href="/register" className="text-white">Registracija</a></li>
                                  <li><a href="/create" className="text-white">Ustvari opravilo</a></li>
                                  <li><a className="text-white" onClick={logout}>Izpis</a></li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="navbar navbar-dark bg-dark shadow-sm">
                  <div className="container">
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                              data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false"
                              aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button>
                  </div>
              </div>
          </header>
      </>
  )
}
export default Header;