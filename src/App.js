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
  const [pet, setPet] = useState({
    address: "",
    date: "",
    email: "",
    name: "",
    owner: "",
    phone: "",
    race: "",
    type: "",
  });
  const [pets, setTpets] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [id, setid] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getCollection("vet");
      if (result.statusResponse) {
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
  const addPet = async (e) => {
    e.preventDefault();
    console.log(pet);
    if (!validForm()) {
      return;
    }

    const result = await addDocument("vet", pet);
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    setTpets([
      ...pets,
      {
        id: result.data.id,
        address: pet.address,
        date: pet.date,
        email: pet.email,
        name: pet.name,
        owner: pet.owner,
        phone: pet.phone,
        race: pet.race,
        type: pet.type,
      },
    ]);

    setPet({
      address: "",
    date: "",
    email: "",
    name: "",
    owner: "",
    phone: "",
    race: "",
    type: "",
    });
    closeModal()
  };

  const handleInputChange = (event) => {
    //console.log(event.target.value)
    setPet({
      ...pet,
      [event.target.name]: event.target.value,
    });
  };
  const openModal = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
  };
  const closeModal = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-11">
            <h1>Mascotas</h1>
          </div>
          <div className="col-sm-1">
            <button className="btn btn-light float-right">
              <img src={add} width="32" height="32" />
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="container mt-5">
        <div className="row">
          {pets.map((pet) => (
            <div className="col-sm-4 mb-2" key={pet.id}>
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
                    <button
                      type="button"
                      className="btn btn-light mx-2"
                      onClick={() => openModal()}
                    >
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

      <div
        className="modal"
        id="myModal"
        tabIndex="-1"
        aria-labelledby="ModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h5 className="modal-title" id="ModalLabel">
                Modal title
              </h5>
            </div>
            <form onSubmit={addPet}>
              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  className="form-control mb-2"
                  placeholder="Nombre"
                  onChange={handleInputChange}
                ></input>
                <input
                  type="text"
                  name="type"
                  className="form-control mb-2"
                  placeholder="Tipo"
                  onChange={handleInputChange}
                ></input>
                <input
                  type="text"
                  name="race"
                  className="form-control mb-2"
                  placeholder="Raza"
                  onChange={handleInputChange}
                ></input>
                <input
                  type="text"
                  name="date"
                  className="form-control mb-2"
                  placeholder="Fecha de nacimiento"
                  onChange={handleInputChange}
                ></input>
                <input
                  type="text"
                  name="owner"
                  className="form-control mb-2"
                  placeholder="propietario"
                  onChange={handleInputChange}
                ></input>
                <input
                  type="text"
                  name="phone"
                  className="form-control mb-2"
                  placeholder="Teléfono"
                  onChange={handleInputChange}
                ></input>
                <input
                  type="text"
                  name="address"
                  className="form-control mb-2"
                  placeholder="Dirección"
                  onChange={handleInputChange}
                ></input>
                <input
                  type="text"
                  name="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" type="submit">
                  <img src={save} width="32" height="32" />
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => closeModal()}
                >
                  <img src={cancel} width="32" height="32" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
