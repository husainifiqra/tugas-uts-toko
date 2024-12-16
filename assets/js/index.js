// Tangkap semua tombol dengan class "pesan-sekarang"
const pesanButtons = document.querySelectorAll('.pesan-sekarang');

// Tangkap semua elemen dengan ID "product" dan "price"
const products = Array.from(document.querySelectorAll('#product'));
const prices = Array.from(document.querySelectorAll('#price'));

// Ambil teks dari setiap elemen
const productTexts = products.map(product => product.innerText);
const priceTexts = prices.map(price => price.innerText);

pesanButtons.forEach((button, index) => {
    button.addEventListener('click', function (e) {
        e.preventDefault(); // Mencegah link berpindah halaman langsung

        // Ambil teks produk dan harga yang sesuai dengan tombol
        const productText = productTexts[index];
        const priceText = priceTexts[index];

        // Ganti spasi dengan '+'
        const productParam = productText.replace(/\s+/g, '+');
        const priceParam = priceText.replace(/\s+/g, '');
        const priceParam2 = priceParam.replace('Rp.', '');

        // Arahkan ke URL pembayaran dengan parameter produk dan harga
        const paymentUrl = `./paymentForm.html?product=${productParam}&price=${priceParam2}`;
        window.location.href = paymentUrl;
    });
});

document.getElementById('searchBtn').addEventListener('click', function (event) {
    event.preventDefault(); // Mencegah form melakukan reload halaman
    const productName = document.getElementById('productName').value.trim().toLowerCase();

    // Update URL dengan query parameter
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('search', productName);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, '', newUrl);

    // Ambil semua elemen produk
    const products = document.querySelectorAll('.card');
    let hasResults = false;

    products.forEach((product) => {
        const productTitle = product.querySelector('.card-title').textContent.trim().toLowerCase();

        // Bandingkan nama produk dengan input pencarian
        if (productTitle.includes(productName)) {
            product.style.display = 'block'; // Tampilkan produk yang cocok
            hasResults = true;
            console.log(product);
        } else {
            product.style.display = 'none'; // Sembunyikan produk yang tidak cocok
        }
    });

    if (!hasResults) {
        alert('Produk tidak ditemukan!');
    }

    // Tutup modal menggunakan Bootstrap API
    const searchModal = bootstrap.Modal.getInstance(document.getElementById('searchModal'));
    if (searchModal) {
        searchModal.hide();
    }
});

document.querySelectorAll('.category-filter').forEach((categoryLink) => {
    categoryLink.addEventListener('click', function (event) {
        event.preventDefault(); // Mencegah reload halaman

        // Ambil kategori yang diklik
        const category = this.getAttribute('data-category');

        // Ambil semua elemen produk
        const products = document.querySelectorAll('.card');

        products.forEach((product) => {
            // Cek apakah produk memiliki kategori yang sesuai
            if (product.getAttribute('data-category') === category) {
                product.style.display = 'block'; // Tampilkan produk yang sesuai
            } else {
                product.style.display = 'none'; // Sembunyikan produk yang tidak sesuai
            }
        });
    });
});
