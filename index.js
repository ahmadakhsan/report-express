const fs = require('fs');
const puppeteer = require('puppeteer');
const mustache = require('mustache');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlBody = fs.readFileSync('./halaman.html', 'utf-8');
    const data = {
        nomor: 112,
        tanggal: '10 Oktober 2024',
        alamat: 'Makassar, Sulawesi Selatan',
        pembayaran: [{ metode: 'Tunai', jumlah: 'Rp20.000' }],
        barang: [
            { item: 'Minyak Goreng', harga: 'Rp10.000' },
            { item: 'Sosis Sonice', harga: 'Rp2.000' },
        ],
        total: 'Rp12.000',
    };

    await page.setContent(mustache.render(htmlBody, data));
    const pdf = await page.pdf({ format: 'A4' });
    fs.writeFileSync('./invoice.pdf', pdf);
    page.close();
    browser.close();


})();