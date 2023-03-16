import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import logo from "../images/logo-ciena.svg"
import swal from "sweetalert";

const Register = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [compAddress, setCompAddress] = useState("")
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("")
  const [ role, setRole] = useState("");
  // const [ size, setSize] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registData = JSON.stringify({
    name: name,
    company : company, 
    compAddress : compAddress, 
    email : email,
    hp : hp, 
    role : role, 
    // size : size
  });

  const onSubmit = () => {
    setLoading(true);
    axios
      .post("/api/participants", registData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data.createdAt);
        localStorage.setItem('absen', res.data.createdAt)
        localStorage.setItem('nama', res.data.Nama)
        localStorage.setItem('code', res.data.Code)
        navigate("/codePage");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 400){
          swal(err.response.data,{
            icon: "error",
          });
        }
        setLoading(false);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card" style={{marginBottom: "100px"}}>
            <img src={logo} alt="logo" width={180} className="mx-auto"/>
            <h1 className="text-center"><strong>Buku Tamu</strong></h1>
            <p className="text-center" style={{marginBottom: "40px", marginTop:"-8px"}}>Silahkan isi data diri anda</p>
            <div className="card-body">
              <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-12">
                  <label htmlFor="validationServer01" className="form-label">
                    Nama
                  </label>
                  <input
                    type="text"
                    className={`form-control ${name !== "" ? "is-valid" : ""}`}
                    id="name"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="company" className="form-label">
                    Nama Perusahaan
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      company !== "" ? "is-valid" : ""
                    }`}
                    id="company"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("company")}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="compAddress" className="form-label">
                    Alamat Perusahaan
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      compAddress !== "" ? "is-valid" : ""
                    }`}
                    id="compAddress"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("compAddress")}
                    value={compAddress}
                    onChange={(e) => setCompAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className={`form-control ${email !== "" ? "is-valid" : ""}`}
                    id="email"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div> 
                <div className="col-md-12">
                  <label htmlFor="hp" className="form-label">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    className={`form-control ${hp !== "" ? "is-valid" : ""}`}
                    id="hp"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("hp")}
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="role" className="form-label">
                    Divisi
                  </label>
                  <input
                    type="text"
                    className={`form-control ${role !== "" ? "is-valid" : ""}`}
                    id="role"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("role")}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                </div>
                {/* <div className="col-md-12">
                  <label htmlFor="need" className="form-label">
                    Role jabatan
                  </label>
                  <select className="form-select" id="isUsefull" aria-label="Default select example" onChange={(e) => setRole(e.target.value)}> */}
                  {/* <option selected>Pilih</option> */}
                  {/* <option value={""} defaultValue={role === ""}>Pilih Role Jabatan</option>
                  <option value={"Sales"} defaultValue={role === "Sales"}>Sales</option>
                  <option value={"Planning"} defaultValue={role === "Planning"}>Planning</option>
                  <option value={"Project"} defaultValue={role === "Project"}>Project</option>
                  <option value={"Purchasing"} defaultValue={role === "Purchasing"}>Purchasing</option>
                </select> */}
                {/* </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="need" className="form-label">
                    Ukuran Baju
                  </label>
                  <select className="form-select" id="isUsefull" aria-label="Default select example" onChange={(e) => setSize(e.target.value)}> */}
                  {/* <option selected>Pilih</option> */}
                  {/* <option value={""} defaultValue={size === ""}>Pilih Ukuran Baju</option>
                  <option value={"S"} defaultValue={size === "S"}>S</option>
                  <option value={"M"} defaultValue={size === "M"}>M</option>
                  <option value={"L"} defaultValue={size === "L"}>L</option>
                  <option value={"XL"} defaultValue={size === "XL"}>XL</option>
                  </select>
                </div> */}
                <div className="col-12 text-center mb-3">
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#193FC3",
                      color: "#fff",
                      letterSpacing: "1px",
                      borderRadius: "30px",
                    }}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "SUBMIT"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
