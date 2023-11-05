import React, { useState } from "react";

const RowTambahMahasiswa = (props) => {
  // state untuk data inputan form
  const [formInput, setFormInput] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    asal_provinsi: "",
  });

  // state untuk menampung pesan ereror
  const [errors, setErrors] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    asal_provinsi: "",
  });

  // function untuk membuat 2 ways binding antara form dengan state
  const handleInputChange = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  // function untuk memeriksa apakah ada nim yang sama atau tidak
  const cekDuplikasiNim = () => {
    return props.mahasiswas.find(
      (mahasiswa) => mahasiswa.nim === formInput.nim
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let pesanErrors = {};

    // validasi nim
    if (formInput.nim.trim() === "") {
      pesanErrors.nim = "Nim tidak boleh kosong";
    } else if (!/^[0-9]{10}$/.test(formInput.nim)) {
      pesanErrors.nim = "Nim harus 10 karakter angka";
    } else if (cekDuplikasiNim()) {
      pesanErrors.nim = "Nim sudah dipakai";
    } else {
      pesanErrors.nim = "";
    }

    // validasi nama
    if (formInput.nama.trim() === "") {
      pesanErrors.nama = "Nama tidak boleh kosong";
    } else {
      pesanErrors.nama = "";
    }

    // validasi jurusan
    if (formInput.jurusan.trim() === "") {
      pesanErrors.jurusan = "Jurusan tidak boleh kosong";
    } else {
      pesanErrors.jurusan = "";
    }

    // validasi asal_provinsi
    if (formInput.asal_provinsi.trim() === "") {
      pesanErrors.asal_provinsi = "Asal Provinsi tidak boleh kosong";
    } else {
      pesanErrors.asal_provinsi = "";
    }

    // update error state
    setErrors(pesanErrors);

    // cek apakah seluruh form valid atau masih ada error
    let formValid = true;
    for (let inputName in pesanErrors) {
      if (pesanErrors[inputName].length > 0) {
        formValid = false;
      }
    }

    // proses data jika form valid
    if (formValid) {
      props.onTambahMahasiswa(formInput);

      // kosongkan inputan form
      setFormInput({
        nim: "",
        nama: "",
        jurusan: "",
        asal_provinsi: "",
      });
    }
  };

  return (
    <tr>
      <td colSpan="5">
        <form onSubmit={handleFormSubmit}>
          <div className="row row-cols-5 g-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="nim"
                placeholder="00000000"
                onChange={handleInputChange}
                value={formInput.nim}
              />
              {errors.nim && <small>{errors.nim}</small>}
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="nama"
                placeholder="Fulan Fulana"
                onChange={handleInputChange}
                value={formInput.nama}
              />
              {errors.nama && <small>{errors.nama}</small>}
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="jurusan"
                placeholder="Sistem Informasi"
                onChange={handleInputChange}
                value={formInput.jurusan}
              />
              {errors.jurusan && <small>{errors.jurusan}</small>}
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="asal_provinsi"
                placeholder="DKI Jakarta"
                onChange={handleInputChange}
                value={formInput.asal_provinsi}
              />
              {errors.asal_provinsi && <small>{errors.asal_provinsi}</small>}
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">
                Tambah
              </button>
            </div>
          </div>
        </form>
      </td>
    </tr>
  );
};

export default RowTambahMahasiswa;