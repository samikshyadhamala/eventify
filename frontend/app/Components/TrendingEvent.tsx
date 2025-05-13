import React from "react";
import styles from './Freeevent.module.css';
import Link from 'next/link';
import ImageComponent from './ImageComponent';
import data from './eventData';

export default function Home() {
  const trendingEvents = data.slice(0, 6);
  const upcomingEvents = data.slice(6, 16);

  const renderEventCards = (events: typeof data) => (
    <div className={styles.cardContainer}>
      {events.map((item) => (
        <Link href={`/event/${item.id}`} key={item.id} className={styles.card}>
          <div className={styles.cardInner}>
            <ImageComponent imageFile={item.image_file} alt={item.event_name} />
            <div className={styles.details}>
              <h3>{item.event_name}</h3>
              <div className={styles.location}>{item.location}</div>
              <div>{item.start_date} — {item.start_time}</div>
              {item.ticket_price && (
                <div className={styles.price}>{item.ticket_price}</div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.title}>Trending Events</h2>
        {renderEventCards(trendingEvents)}
        <button className={styles.seeMoreBtn}>See More</button>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Upcoming Events</h2>
        {renderEventCards(upcomingEvents)}
        <button className={styles.seeMoreBtn}>See More</button>
      </section>
    </>
  );
}
