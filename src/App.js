import React, { useState, useEffect } from "react";
import { isEmpty, set, size } from "lodash";
import add from "./img/Add.png";
import remove from "./img/Bin.png";
import cancel from "./img/Cancel.png";
import save from "./img/Diskette.png";
import edit from "./img/Pen.png";
import {
  addDocument,
  getCollection,
  updateDocument,
  deleteDocument,
} from "./actions";

function App() {
  const [pet, setPet] = useState("");
  const [pets, setTpets] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [id, setid] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getCollection("vet");
      if (result.statusResponse) {
        console.log(result.data);
        setTpets(result.data);
      }
    })();
  }, []);

  const validForm = () => {
    let isValid = true;
    setError(null);
    if (isEmpty(pet)) {
      setError("Debe completar todos los campos");
      isValid = false;
    }
    return isValid;
  };

  return (
    <div>
      <div className="container mt-5">
        <form className="d-flex">
          <h1 className="me-2">Mascotas</h1>
          <button className="btn btn-light float-right">
            <img src={add} width="32" height="32" />
          </button>
        </form>
        <hr />
      </div>

      <div className="container mt-5">
        <div className="row">
          {pets.map((pet) => (
            <div className="col-sm-4" key={pet.id}>
              <div className="card border-primary ">
                <div className="card-header bg-info">Nombre: {pet.name}</div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Tipo: {pet.type} </li>
                    <li className="list-group-item">Raza: {pet.race}</li>
                    <li className="list-group-item">
                      Fecha de nacimiento: {pet.date}
                    </li>
                    <li className="list-group-item">
                      propietario: {pet.owner}
                    </li>
                    <li className="list-group-item">Teléfono: {pet.phone} </li>
                    <li className="list-group-item">
                      Dirección: {pet.address}
                    </li>
                    <li className="list-group-item">Email: {pet.email}</li>
                  </ul>
                  <div className="card-footer bg-transparent border-primary">
                    <button type="button" className="btn btn-light mx-2">
                      <img src={edit} width="32" height="32" />
                    </button>
                    <button type="button" className="btn btn-light">
                      <img src={remove} width="32" height="32" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
