import React, { useState, useEffect } from "react";
import { isEmpty, size } from "lodash";
import add from "./img/Add.png";
import remove from "./img/Bin.png";
import cancel from "./img/Cancel.png";
import save from "./img/Diskette.png";
import edit from "./img/Pen.png";
import noPet from "./img/noPet.png";
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
  const [message, setMessage] = useState("");

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
    if (
      isEmpty(pet.address) ||
      isEmpty(pet.date) ||
      isEmpty(pet.email) ||
      isEmpty(pet.name) ||
      isEmpty(pet.owner) ||
      isEmpty(pet.phone) ||
      isEmpty(pet.race) ||
      isEmpty(pet.type)
    ) {
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

    resetPet();
    closeModal();
  };
  const deletePet = async (id) => {
    console.log(id);
    const result = await deleteDocument("vet", id);
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }
    const filteredPets = pets.filter((pet) => pet.id !== id);
    console.log(filteredPets);
    setTpets(filteredPets);
    closeAlert();
  };
  const editPet = (pet) => {
    setid(pet.id);
    setPet({
      address: pet.address,
      date: pet.date,
      email: pet.email,
      name: pet.name,
      owner: pet.owner,
      phone: pet.phone,
      race: pet.race,
      type: pet.type,
    });
    seteditMode(true);
    openModal();
  };
  const updatePet = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const result = await updateDocument("vet", id, pet);
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    const editedPets = pets.map((item) =>
      item.id === id
        ? {
            id,
            address: pet.address,
            date: pet.date,
            email: pet.email,
            name: pet.name,
            owner: pet.owner,
            phone: pet.phone,
            race: pet.race,
            type: pet.type,
          }
        : item
    );
    setTpets(editedPets);
    seteditMode(false);
    setid("");
    resetPet();
    closeModal();
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
    seteditMode(false);
    setError(null);
    resetPet();
  };
  const openAlert = (id) => {
    const found = pets.find((pet) => pet.id === id);
    setMessage(
      `¿Está seguro de que desea eliminar a ${found.name} de la lista de mascotas?`
    );
    setid(id);
    const modal = document.getElementById("alert");
    modal.style.display = "block";
  };
  const closeAlert = () => {
    const modal = document.getElementById("alert");
    modal.style.display = "none";
  };
  const resetPet = () => {
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
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="d-flex bd-highlight">
          <div className="p-2 w-100 bd-highlight">
            <h1>
              <span className="badge bg-info">Mascotas {size(pets)}</span>
            </h1>
          </div>
          <div className="p-2 flex-shrink-1 bd-highlight">
            <button className="btn btn-light" onClick={() => openModal()}>
              <img src={add} width="32" height="32" />
            </button>
          </div>
        </div>
        <hr />
      </div>

      <div className="container mt-5">
        {size(pets) === 0 ? (
          <div>
            <div className="d-flex justify-content-center">
              <img src={noPet} width="256" height="256"></img>
            </div>
            <div className="alert alert-info text-center" role="alert">
              <h1>No hay mascotas registradas en este momento</h1>
            </div>
          </div>
        ) : (
          <div className="row">
            {pets.map((pet) => (
              <div className="col-sm-4 col-md-offset-6 mb-2" key={pet.id}>
                <div className="card border-primary ">
                  <div className="card-header bg-info">
                   <b>Nombre: {pet.name}</b> 
                    <button
                      type="button"
                      className="btn btn-info mx-2 float-end"
                      onClick={() => editPet(pet)}
                    >
                      <img src={edit} width="24" height="24" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-info float-end"
                      onClick={() => openAlert(pet.id)}
                    >
                      <img src={remove} width="24" height="24" />
                    </button>
                  </div>
                  <div className="card-body">
                    <div>
                      <b>Tipo:</b> {pet.type}{" "}
                    </div>
                    <div>
                      <b>Raza:</b> {pet.race}
                    </div>
                    <div>
                      <b>Fecha de nacimiento:</b> {pet.date}
                    </div>
                    <div>
                      <b>propietario:</b> {pet.owner}
                    </div>
                    <div>
                      <b>Teléfono:</b> {pet.phone}{" "}
                    </div>
                    <div>
                      <b>Dirección:</b> {pet.address}
                    </div>
                    <div>
                      <b>Email:</b> {pet.email}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
            <form onSubmit={editMode ? updatePet : addPet}>
              <div className="modal-header bg-info">
                <h5 className="modal-title" id="ModalLabel">
                  {editMode ? "Editar Mascota" : "Agregar Mascota"}
                </h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  className="form-control mb-2"
                  placeholder="Nombre de la mascota"
                  onChange={handleInputChange}
                  value={pet.name}
                ></input>
                <input
                  type="text"
                  name="type"
                  className="form-control mb-2"
                  placeholder="Tipo"
                  onChange={handleInputChange}
                  value={pet.type}
                ></input>
                <input
                  type="text"
                  name="race"
                  className="form-control mb-2"
                  placeholder="Raza"
                  onChange={handleInputChange}
                  value={pet.race}
                ></input>
                <input
                  type="date"
                  name="date"
                  className="form-control mb-2"
                  placeholder="Fecha de nacimiento"
                  onChange={handleInputChange}
                  value={pet.date}
                ></input>
                <input
                  type="name"
                  name="owner"
                  className="form-control mb-2"
                  placeholder="Nombre del propietario"
                  onChange={handleInputChange}
                  value={pet.owner}
                ></input>
                <input
                  type="tel"
                  name="phone"
                  className="form-control mb-2"
                  placeholder="Teléfono"
                  onChange={handleInputChange}
                  value={pet.phone}
                ></input>
                <input
                  type="address-line1, address-line2, address-line3, address-level4, address-level3, address-level2, address-level1"
                  name="address"
                  className="form-control mb-2"
                  placeholder="Dirección"
                  onChange={handleInputChange}
                  value={pet.address}
                ></input>
                <input
                  type="email"
                  name="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  onChange={handleInputChange}
                  value={pet.email}
                ></input>
              </div>
              <div className="modal-footer border-primary">
                {error && <span className="text-danger">{error}</span>}
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

      <div className="modal" tabIndex="-1" id="alert">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-warning">
              <h5 className="modal-title">Advertencia</h5>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer border-primary">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => closeAlert()}
              >
                <img src={cancel} width="32" height="32" />
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => deletePet(id)}
              >
                <img src={remove} width="32" height="32" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
