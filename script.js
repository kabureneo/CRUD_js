// Ambil elemen-elemen yang dibutuhkan di index.html
if (document.getElementById('form')) {
    const form = document.getElementById('form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    // Fungsi untuk menyimpan data ke localStorage
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Ambil data dari input
        const name = nameInput.value;
        const phone = phoneInput.value;
        const email = emailInput.value;

        // Ambil data yang sudah ada di localStorage, atau buat array baru jika kosong
        let dataKontak = JSON.parse(localStorage.getItem('dataKontak')) || [];

        // Tambahkan data baru ke array
        dataKontak.push({ name, phone, email });

        // Simpan array yang diperbarui ke localStorage
        localStorage.setItem('dataKontak', JSON.stringify(dataKontak));

        // Reset form setelah data ditambahkan
        form.reset();

        alert('Data berhasil ditambahkan!');
    });
}

// Ambil elemen-elemen yang dibutuhkan di results.html
if (document.getElementById('data-table')) {
    const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];

    // Fungsi untuk menampilkan data dari localStorage
    function displayData() {
        // Ambil data dari localStorage
        const dataKontak = JSON.parse(localStorage.getItem('dataKontak')) || [];

        // Kosongkan tabel sebelum menampilkan data yang baru
        dataTable.innerHTML = '';

        // Loop data dan tambahkan ke tabel
        dataKontak.forEach((kontak, index) => {
            const row = dataTable.insertRow();

            const nameCell = row.insertCell(0);
            const phoneCell = row.insertCell(1);
            const emailCell = row.insertCell(2);
            const actionCell = row.insertCell(3); // Kolom aksi untuk tombol edit & hapus

            nameCell.textContent = kontak.name;
            phoneCell.textContent = kontak.phone;
            emailCell.textContent = kontak.email;

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
        displayData();

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

        // Jika pengguna tidak membatalkan input, perbarui data
        if (newName !== null && newPhone !== null && newEmail !== null) {
            dataKontak[index] = {
                name: newName,
                phone: newPhone,
                email: newEmail
            };

            // Simpan kembali data yang sudah diperbarui ke localStorage
            localStorage.setItem('dataKontak', JSON.stringify(dataKontak));

            // Tampilkan ulang data
            displayData();

            alert('Data berhasil diperbarui!');
        }
    }

    // Tampilkan data saat halaman dimuat
    displayData();
}
