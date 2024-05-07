const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());


// to get all customers
app.get('/api/customers', async (req, res) => {
    try {
        const customers = await db.fetchCustomers();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET all restaurants
app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await db.fetchRestaurants();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});


// to get all reservations
app.get('/api/reservations', async (req, res) => {
    try {
        const reservations = await db.fetchReservations();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a reservation for a customer
app.post('/api/customers/:id/reservations', async (req, res) => {
    const customerId = req.params.id;
    const { restaurant_id, date, party_count } = req.body;

    try {
        const reservationData = {
            customer_id: customerId,
            restaurant_id,
            date,
            party_count,
        };

        const reservation = await db.createReservation(reservationData);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE a reservation
app.delete('/api/customers/:customer_id_reservation/:id', async (req, res) => {
    const customerId = req.params.customer_id;
    const reservationId = req.params.id;

    try {
        await db.destroyReservation(reservationId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong here.' });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});