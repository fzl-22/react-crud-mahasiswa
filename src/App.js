import React, { useEffect, useState } from "react";
import RowMahasiswa from "./components/RowMahasiswa";
import RowTambahMahasiswa from "./components/RowTambahMahasiswa";
import axios from "axios";

const App = () => {
  const [mahasiswas, setMahasiswas] = useState([]);

  // handler untuk menghandle data mahasiswa
  const getList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/mahasiswa");
      setMahasiswas(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Diakses pertama kali ketika komponen di-render
  useEffect(() => {
    getList();
  }, []);

  // handler untuk menambah data mahasiswa,
  // akan di-trigger dari komponen RowTambahMahasiswa
  const handleTambahMahasiswa = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/api/mahasiswa/store', data);

      if(!response.data.status){
        return;
      }

      getList();
    } catch (error) {
      console.log(error);
    }
  };

  // handler untuk mengedit data mahasiswa
  // akan di-trigger dari komponen RowMahasiswa
  const handleEditMahasiswa = async (data) => {
    try {
      const response = await axios.patch('http://localhost:3001/api/mahasiswa/update/' + data.nim, data);

      if(!response.data.status){
        return;
      }

      getList();
    } catch (error) {
      console.log(error);
    }
  };

  // handler untuk menghapus data mahasiswa di komponen RowMahasiswa
  const handleHapusMahasiswa = async (e) => {
    console.log(e.target.id);
    try {
      
      const response = await axios.delete('http://localhost:3001/api/mahasiswa/delete/' + e.target.id);
      

      if(!response.data.status){
        return;
      }

      getList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col">
          <h1 className="text-center">Tabel Mahasiswa</h1>

          <table className="table mt-4">
            <thead>
              <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Jurusan</th>
                <th>Asal Provinsi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mahasiswas.map((mahasiswa) => (
                <RowMahasiswa
                  key={mahasiswa.nim}
                  mahasiswa={mahasiswa}
                  onEditMahasiswa={handleEditMahasiswa}
                  onHapusMahasiswa={handleHapusMahasiswa}
                />
              ))}
              <RowTambahMahasiswa
                mahasiswas={mahasiswas}
                onTambahMahasiswa={handleTambahMahasiswa}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
