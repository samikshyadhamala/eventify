'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import data from './eventData.js'; // Adjust path as needed
import styles from './EventDetails.module.css'; // Ensure this matches your CSS file name

export default function EventDetails() {
  const { id } = useParams();
  console.log('ID from params:', id);

  if (!id) return <p>Invalid event ID...</p>;
  const eventId = parseInt(id as string);
  if (isNaN(eventId)) return <p>Invalid event ID format...</p>;

  const event = data.find((e) => e.id === eventId);
  if (!event) return <p>Event not found...</p>;

  // Check if the event is free (null, "Free", or "$0")
  const isFreeEvent = !event.ticket_price || event.ticket_price.toLowerCase() === 'free' || event.ticket_price === '$0';

  // Google Maps Embed API URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(event.location)}`;

  return (
    <div className={styles.eventDetailsContainer}>
      <div className={styles.eventBannerWrapper}>
        {event.image_file ? (
          <img
            src={`/image/event/${event.image_file}`}
            alt={event.event_name}
            onError={(e) => {
              e.currentTarget.style.display = 'none'; // Hide the image if it fails to load
              console.error(`Failed to load image: /image/event/${event.image_file}`);
            }}
          />
        ) : (
          <div className={styles.imagePlaceholder}>No Image Available</div>
        )}
      </div>

      <div className={styles.eventContent}>
        <div className={styles.eventMain}>
          <div className={styles.eventDateTime}>
            <p>
              <strong>{event.start_date}</strong> at {event.start_time}
            </p>
          </div>
          <h1 className={styles.eventTitle}>{event.event_name}</h1>
          <p className={styles.eventHost}>Hosted by: Placeholder Club</p>

          <div className={styles.eventDescription}>
            <h3>About this event</h3>
            <p>{event.description}</p>
            <div className={styles.eventMap}>
              <iframe
                width="100%"
                height="300"
                style={{ border: 0 }}
                src={mapUrl}
                allowFullScreen
                loading="lazy"
                title="Event Location Map"
              ></iframe>
            </div>
          </div>

          <div className={styles.eventOrganizer}>
            <h3>Organizer</h3>
            <p>Placeholder Club</p>
            <p>A community dedicated to hosting exciting events.</p>
          </div>
        </div>

        <div className={styles.ticketSection}>
          <div className={styles.ticketBox}>
            <h3>Tickets</h3>
            <p className={styles.ticketPrice}>{isFreeEvent ? 'Free' : event.ticket_price}</p>
            <button className={isFreeEvent ? styles.registerButton : styles.buyTicketButton}>
              {isFreeEvent ? 'Register' : 'Get Tickets'}
            </button>
            <div className={styles.eventInfo}>
              <p><strong>Date:</strong> {event.start_date}</p>
              <p><strong>Time:</strong> {event.start_time}</p>
              <p><strong>Location:</strong> {event.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}