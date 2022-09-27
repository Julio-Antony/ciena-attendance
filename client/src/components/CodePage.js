import React, { useRef } from "react";
import logo from "../images/logo-ciena.svg";
import moment from "moment-timezone"
import {exportComponentAsPNG} from "react-component-export-image"
const CodePage = () => {
  const absen = moment.tz(localStorage.getItem("absen"), "Asia/Jakarta").format('HH:mm')
  const nama = localStorage.getItem("nama");
  const code = localStorage.getItem("code");
  const componentRef = useRef(null)

  return (
    <div className="row p-3">
      <div className="col-md-6 offset-md-3">
        <div className="card card-doorprize">
          <div className="card-body" ref={componentRef}>
            <img src={logo} alt="logo" width={120} className="mr-auto mb-3" />
            <h1 className="text-center text-success">{nama}</h1>
            <h3 className="text-center" style={{letterSpacing : 2}}>{code}</h3>
            <h3 className="text-center mb-3">
              Anda telah absen pada pukul
              <span style={{ color: "#193FC3", marginLeft : 4 }}>
                {absen}
              </span>
            </h3>
            <p className="text-center text-muted">Silahkan tunjukan kode pendaftaran ini kepada penerima tamu</p>
            <div className="text-center">
            <button
                className="btn"
                style={{
                  backgroundColor: "#193FC3",
                  color: "#fff",
                  letterSpacing: ".75px",
                  borderRadius: "30px",
                  marginTop: "30px"
                }}
                onClick={() => exportComponentAsPNG(componentRef,{fileName:"Kode Pendaftaran"})}
              >
                SIMPAN
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
