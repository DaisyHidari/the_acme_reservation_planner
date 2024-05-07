const { Client } = require('pg');





// GET reservations
const fetchReservations = async () => {
    try {
      await client.connect();
      const result = await client.query('SELECT * FROM reservations');
      return result.rows;
    } catch (error) {
      throw error;
    } finally {
      await client.end();
    }
  };
  
  module.exports = {
    
    fetchReservations,
  };


// CREATE a reservation
const createReservation = async (reservationData) => {
    try {
      await client.connect();
      const { customer_id, restaurant_id, date, party_count } = reservationData;
      const result = await client.query(
        'INSERT INTO reservations (customer_id, restaurant_id, date, party_count) VALUES ($1, $2, $3, $4) RETURNING *',
        [customer_id, restaurant_id, date, party_count]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    } finally {
      await client.end();
    }
  };
  
  module.exports = {
    // other methods...
    createReservation,
  };