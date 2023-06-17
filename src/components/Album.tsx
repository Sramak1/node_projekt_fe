import Task from "./Task.tsx";

const Album = () => {
  return(
      <>
          <div className="album py-5 bg-body-tertiary">
              <div className="container">

                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                      <Task/>
                      <Task/>
                  </div>
              </div>
          </div>
      </>
  )
}
export default Album;