import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();  // Destructure to extract reservation_id

  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1, // Default value as a number
  });

  // Load reservation by id //
  useEffect(() => {
    const abortController = new AbortController();  // Create AbortController

    async function loadReservation() {
      try {
        const response = await readReservation(Number(reservation_id), abortController.signal);  // Pass the signal
        // The date and time inputs only display YYYY-MM-DD and HH:MM values
        setReservation(formatReservationTime(formatReservationDate(response)));
      } catch (error) {
        if (error.name !== "AbortError") { // Only set error if not an abort error
          setError(error);
        }
      }
    }

    loadReservation();

    return () => abortController.abort();  // Abort the fetch if the component unmounts
  }, [reservation_id]);

  // Handlers //
  const handleChange = ({ target }) => {
    setReservation({ 
      ...reservation, 
      [target.name]: target.name === "people" ? Number(target.value) : target.value  // Ensure people is a number
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();  // Create AbortController

    try {
      await updateReservation(Number(reservation_id), reservation, abortController.signal);  // Pass the signal
      history.push(`/dashboard?date=${reservation.reservation_date.slice(0, 10)}`);
    } catch (error) {
      if (error.name !== "AbortError") { // Only set error if not an abort error
        setError(error);
      }
    }

    return () => abortController.abort();  // Ensure the fetch can be aborted if needed
  };

  return (
    <main>
      <div className="d-md-flex mb-3 flex-column">
        <h1>Edit Reservation</h1>
        <ErrorAlert error={error} setError={setError} />
      </div>

      <ReservationForm
        reservation={reservation}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </main>
  );
}

export default EditReservation;