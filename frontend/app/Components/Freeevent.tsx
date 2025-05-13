import React from 'react'
import styles from './Freeevent.module.css'
import data from './eventData' 


const TrendingEvent = () => {
  return (
    <div>
      <div className="upcoming-section">
        <h2 className="section-title">Free Events</h2>

        <div className="upcoming-events-container">
          {data.map((item) => {
            if (item?.ticket_price) return; // Skip events with a ticket price

            return (
              <div className="upcoming-event-card" key={item?.id}>
                <div className="event-image">
                  <img
                    src={item?.image_file || "https://api.unsplash.com/photos/random?query=crowd,location&count=1"}
                    alt={item?.event_name || "Event"}
                  />
                </div>
                <div className="event-details">
                  <h3>{item.event_name}</h3>
                  <p className="event-type">{item?.description}</p>
                  <h4 className="event-location">{item?.location}</h4>
                  <p>{item.start_date} — {item.start_time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="upcoming-section">
        <h2 className="section-title">Paid Events</h2>

        <div className="upcoming-events-container">
          {data.map((item) => {
            if (!item?.ticket_price) return; // Skip free events

            return (
              <div className="upcoming-event-card" key={item?.id}>
                <div className="event-image">
                  <img
                    src={item?.image_file || "https://api.unsplash.com/photos/random?query=crowd,location&count=1"}
                    alt={item?.event_name || "Event"}
                  />
                </div>
                <div className="event-details">
                  <h3>{item.event_name}</h3>
                  <p className="event-type">{item?.description}</p>
                  <h4 className="event-location">{item?.location}</h4>
                  <p>{item.start_date} — {item.start_time}</p>
                  <p className="ticket-price">{item.ticket_price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingEvent;