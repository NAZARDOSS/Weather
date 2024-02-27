import React, { useState } from "react";
import styles from "../styles/main.css";
import skeleton from './assets/skeleton.png'
import Week from "./Week"
import Widget from "./Widget/Widget";
import Modal from "./Modal/Modal";

function Main(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripData, setTripData] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const updateUpcomingTrips = (newTrip) => {
    setTripData([...tripData, newTrip]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTrip = (trip) => {
    setTripData([...tripData, trip]);
    handleCloseModal();
  };

  const handleSelectTrip = (selectedTrip) => {
    setSelectedTrip(selectedTrip);
  };
  

  const getUpcomingTrips = () => {

    const upcomingTrips = tripData
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      .slice(0, 3);

    return upcomingTrips;
  };


  return (
    <div className="main">
      <div className="main-top">
        <p>
          Weather <b>Forecast</b>
        </p>
        <input type="text" placeholder=" Search your trip" />
      </div>

      <div className="trips">
        {getUpcomingTrips().map((trip, index) => (
          <div className="trip-block" onClick={() => handleSelectTrip(trip)} key={index}>

            <div className="image-block">
               <img src={trip.image} alt={trip.city} className="trip-block-image" />
            </div>
           
            <div className="trip-block-info">
              <h4>{trip.city}</h4>
              <p>{trip.startDate} - {trip.endDate}</p>
            </div>
          </div>
        ))}

        {[...Array(3 - getUpcomingTrips().length)].map((_, index) => (
          <div className="trip-block" key={index + getUpcomingTrips().length}>
            <div className="image-block" style={{ backgroundColor: "grey" }}>
                <img
                  src={skeleton}
                  alt=''
                  className="trip-block-image"
                />
            </div>
            <div className="trip-block-info">
              <h4>City</h4>
              <p>xx/xx/xxxx - xx/xx/xxxx</p>
            </div>
          </div>
        ))}
       
          <div className="trip-block">
            <div className="add" onClick={handleOpenModal}>
              <p>Add trip</p>
              <p>+</p>
            </div>
            {tripData.length > 3 && (
              <button onClick={handleOpenModal} className="see-more">
                see more
                &#10132;
              </button>
            )}
          </div>
      </div>
        
      <h3>Week</h3>
      {selectedTrip && (
         <Week startDate={selectedTrip.startDate} endDate={selectedTrip.endDate} city = {selectedTrip && selectedTrip.city} />
      )}

      <Widget city={selectedTrip && selectedTrip.city} />
      

      {isModalOpen && (
        <Modal onClose={handleCloseModal} onSave={handleSaveTrip} updateUpcomingTrips={updateUpcomingTrips} >
          {tripData.slice(3).map((trip, index) => (
            <div className="trip-block" key={index}>
              <img src={trip.image} alt={trip.city} className="trip-block-image" />
              <div className="trip-block-info">
                <h4>{trip.city}</h4>
                <p>{trip.startDate} - {trip.endDate}</p>
              </div>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
}

export default Main;
