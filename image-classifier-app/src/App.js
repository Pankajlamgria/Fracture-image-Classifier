import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [img, setimg] = useState();
  const [preview, setPreview] = useState(null);
  const [predictedRes, setPrediction] = useState("");
  const handleUploadImg = (event) => {
    setimg(event.target.files[0]);
    setPrediction("0");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePredict = async () => {
    const formData = new FormData();
    formData.append("file", img);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrediction(response.data.prediction);
      console.log(response.data.prediction);
    } catch (error) {
      alert(error);
      console.error("There was an error making the request:", error);
    }
  };
  return (
    <div className="bg-dark" style={{ height:"auto", width:"100%",color:"white"}}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container pb-5">
        <h2>Classify fracture</h2>
        <div className="mb-3">
          <label for="formFile" className="form-label">
            Upload X-Ray image
          </label>
          <input
            className="form-control"
            onChange={handleUploadImg}
            name="testingInput"
            type="file"
            id="formFile"
          />
        </div>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={handlePredict}
        >
          Predict
        </button>
        <div style={{width:"100%"}} className="d-flex justify-content-center align-items-center">
          {preview && <div class="card" style={{width:"25rem",marginTop:"1rem",marginBottom:"5rem"}}>
            {<img src={preview} class="img-fluid" style={{height:"29rem"}} alt="..." />}
            <div class="card-body">
              <p class="card-text">
                RESULT:<b>{predictedRes}</b>
              </p>
            </div>
          </div>}
        </div>
        
      </div>
    </div>
  );
};

export default App;
