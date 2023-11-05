import React, { useEffect, useState } from "react";
import RowMahasiswa from "./components/RowMahasiswa";
import RowTambahMahasiswa from "./components/RowTambahMahasiswa";
import axios from "axios";

// Data awal tabel mahasiswa
// const arrMahasiswas = [
//   {
//     nim: "18010245",
//     nama: "Eka Putra",
//     jurusan: "Teknik Informatika",
//     asal_provinsi: "DKI Jakarta",
//   },
//   {
//     nim: "19010214",
//     nama: "Lisa Permata",
//     jurusan: "Sistem Informasi",
//     asal_provinsi: "Sumatera Barat",
//   },
//   {
//     nim: "20010710",
//     nama: "Rudi Setiawan",
//     jurusan: "Ilmu Komputer",
//     asal_provinsi: "Jawa Tengah",
//   },
//   {
//     nim: "20010790",
//     nama: "Friska Ramadhani",
//     jurusan: "Ilmu Komputer",
//     asal_provinsi: "Kalimantan Barat",
//   },
// ];

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
  const handleEditMahasiswa = (data) => {
    // cari index dari mahasiswa yang akan diedit berdasarkan nomor nim
    const result = mahasiswas.findIndex(
      (mahasiswa) => mahasiswa.nim === data.nim
    );

    // copy mahasiswas karena fungsi splice akan mengubah array asal (mutate)
    const newMahasiswas = mahasiswas;
    newMahasiswas.splice(result, 1, data);
    setMahasiswas([...newMahasiswas]);

    // !! jika hanya menggunakan setMahasiswas(newMahasiswas),
    // react tidak akan me-re-render halaman karena
    // newMahasiswas = mahasiswa masih merujuk ke object yang sama.
  };

  // handler untuk menghapus data mahasiswa di komponen RowMahasiswa
  const handleHapusMahasiswa = (e) => {
    // cari index dari mahasiswa yang akan dihapus berdasarkan nomor nim
    const result = mahasiswas.findIndex(
      (mahasiswa) => mahasiswa.nim === e.target.id
    );

    // copy mahasiswas karena fungsi splice akan mengubah array asal (mutate)
    const newMahasiswas = mahasiswas;
    newMahasiswas.splice(result, 1);
    setMahasiswas([...newMahasiswas]);

    // Cara alternatif penghapusan dengan method filter
    // const newMahasiswas = mahasiswas.filter(
    //  mahasiswa => mahasiswa.nim !== e.target.id
    // );
    // setMahasiswas(newMahasiswas);
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
