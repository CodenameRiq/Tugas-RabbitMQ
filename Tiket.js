const amqp = require('amqplib');

console.log("Masukkan Pesanan Tiket Bioskop :")
process.stdin.once('data', (chunk) => {
    let pesanan = chunk.toString().trim()
    console.log("Pesanan Tiket Bioskopmu adalah : " + pesanan + "!")

    console.log("Jumlah Pesanan :")
    process.stdin.once('data', (chunk) => {
        let jumlah = chunk.toString().trim()
        console.log("Jumlah : " + jumlah + " tiket")

        amqp.connect('amqp://localhost')
            .then(conn => {
                return conn.createChannel().then(ch => {
                    const q = 'Tiket';
                    const msg = pesanan + " " + jumlah + " tiket";

                    const ok = ch.assertQueue(q, { durable: false });
                    return ok.then(() => {
                        ch.sendToQueue(q, Buffer.from(msg));
                        return ch.close();
                    });
                }).finally(() => conn.close());
            })
            .catch(console.warn);
    });
});
