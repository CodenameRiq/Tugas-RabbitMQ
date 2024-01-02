const amqp = require('amqplib');

amqp.connect('amqp://localhost')
    .then(conn => {
        return conn.createChannel().then(ch => {
            const ok = ch.assertQueue('Tiket', { durable: false });
            return ok.then(() => {
                console.log('Mencari Pesanan Tiket yang Masuk!');
                
            }).then(() => {
                return ch.consume('Tiket', msg => console.log('Pesanan Tiket Masuk: ', msg.content.toString()));
            });
        });
    })
    .catch(console.warn);