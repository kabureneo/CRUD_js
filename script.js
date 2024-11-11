// Ambil elemen-elemen yang dibutuhkan di index.html
if (document.getElementById('form')) {
    const form = document.getElementById('form');
    const nameInput = document.getElementById('name');
    const sekolahInput = document.getElementById('asalSekolah');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    // const numberInput = document.getElementById('number');
    // const kecamatanInput = document.getElementById('kecamatan');
    const kecamatanInput = document.getElementById('kecamatan');

    // Fungsi untuk menyimpan data ke localStorage
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Ambil data dari input
        const name = nameInput.value;
        const sekolah = sekolahInput.value;
        const phone = phoneInput.value;
        const email = emailInput.value;

        // mengambil nama dan nilai kecamatan
        const kecamatan = kecamatanInput.options[kecamatanInput.selectedIndex].value;
        const kecamatanAngka = parseInt(kecamatanInput.options[kecamatanInput.selectedIndex].getAttribute('data-angka'));

        // Ambil data yang sudah ada di localStorage, atau buat array baru jika kosong
        const dataKontak = JSON.parse(localStorage.getItem('dataKontak')) || [];

        // Tambahkan data baru ke array
        dataKontak.push({ name, sekolah, phone, email, kecamatan, kecamatanAngka });

        // Simpan array yang diperbarui ke localStorage
        localStorage.setItem('dataKontak', JSON.stringify(dataKontak));

        // Reset form setelah data ditambahkan
        form.reset();

        alert('Data berhasil ditambahkan!');
    });
}

// Fungsi untuk menampilkan data dari localStorage
function displayData(isEditor) {
    const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];

    // Ambil data dari localStorage
    let dataKontak = JSON.parse(localStorage.getItem('dataKontak')) || [];

    // Urutkan data berdasarkan nilai angka dari yang terkecil hingga terbesar
    dataKontak.sort((a, b) => a.kecamatanAngka - b.kecamatanAngka);

    // Kosongkan tabel sebelum menampilkan data yang baru
    dataTable.innerHTML = '';
 
    // Loop data dan tambahkan ke tabel
    dataKontak.forEach((kontak, index) => {
        const row = dataTable.insertRow();

        const nameCell = row.insertCell(0);
        const sekolahCell = row.insertCell(1);
        
        const kecamatanCell = row.insertCell(2);


        nameCell.textContent = kontak.name;
        sekolahCell.textContent = kontak.sekolah;
        
        kecamatanCell.textContent = kontak.kecamatan;

        // Jika perannya adalah editor (Orang Kedua), tambahkan kolom Aksi
        if (isEditor) {

            const phoneCell = row.insertCell(3);
            const emailCell = row.insertCell(4);

            phoneCell.textContent = kontak.phone;
            emailCell.textContent = kontak.email;



            const actionCell = row.insertCell(5); // Kolom aksi untuk tombol edit & hapus

            // Tambahkan tombol Edit
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-button');
            editButton.onclick = function() {
                editData(index);
            };
            actionCell.appendChild(editButton);

            // Tambahkan tombol Hapus
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Hapus';
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = function() {
                deleteData(index);
            };
            actionCell.appendChild(deleteButton);
        }
    });
}

// Fungsi untuk menghapus data berdasarkan indeks
function deleteData(index) {
    // Ambil data dari localStorage
    let dataKontak = JSON.parse(localStorage.getItem('dataKontak')) || [];

    // Hapus item berdasarkan indeks
    dataKontak.splice(index, 1);

    // Simpan kembali data yang sudah diperbarui ke localStorage
    localStorage.setItem('dataKontak', JSON.stringify(dataKontak));

    // Tampilkan ulang data
    displayData(true); // true jika ini diakses oleh editor

    alert('Data berhasil dihapus!');
}

// Fungsi untuk mengedit data berdasarkan indeks
function editData(index) {
    // Ambil data dari localStorage
    let dataKontak = JSON.parse(localStorage.getItem('dataKontak')) || [];

    // Ambil item yang akan diedit
    const kontak = dataKontak[index];

    // Meminta input baru dari pengguna
    const newName = prompt('Edit Nama:', kontak.name);
    const newPhone = prompt('Edit Nomor Telepon:', kontak.phone);
    const newEmail = prompt('Edit Gmail:', kontak.email);
    const newSekolah = prompt('Edit Gmail:', kontak.sekolah);
    const newKecamatan = prompt('Edit Kecamatan:', kontak.kecamatan); 
    const newKecamatanAngka = parseInt(prompt('Edit Angka Kecamatan:', kontak.kecamatanAngka)); 

    // Jika pengguna tidak membatalkan input, perbarui data
    if (newName !== null && newPhone !== null && newEmail !== null && newKecamatan !== null && !isNaN(newKecamatanAngka)) {
        dataKontak[index] = {
            name: newName,
            phone: newPhone,
            email: newEmail,
            sekolah: newSekolah,
            kecamatanAngka: newKecamatanAngka
        };

        // Simpan kembali data yang sudah diperbarui ke localStorage
        localStorage.setItem('dataKontak', JSON.stringify(dataKontak));

        // Tampilkan ulang data
        displayData(true); // true jika ini diakses oleh editor

        alert('Data berhasil diperbarui!');
    }
}
