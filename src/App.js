function App() {
  return (
    <div>
      <div className="container mt-5">        
        <form className="d-flex">
        <h1 className="me-2">Tareas</h1>
        <button className="btn btn-outline-success"  type="submit">Search</button>
      </form>
        <hr />
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Nombre Mascota</h5>
                <ul ul className="list-group list-group-flush">
                <li className="list-group-item">Tipo </li>
                <li className="list-group-item">Raza</li>
                <li className="list-group-item">Fecha de nacimiento</li>
                <li className="list-group-item">propietario</li>
                <li className="list-group-item">Teléfono </li>
                <li className="list-group-item">Dirección</li>
                <li className="list-group-item">Email</li>
                </ul>
                <button type="button" class="btn btn-danger">
                  Danger
                </button>
                <button type="button" class="btn btn-warning">
                  Warning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
