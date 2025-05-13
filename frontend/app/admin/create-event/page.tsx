'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Createevent.css'

interface EventData {
  title: string;
  isLiveEvent: boolean;
  startDate: string;
  endDate: string;
  lastEventCallSession: string;
  location: string;
  timeDuration: string;
  initialPrice: string;
  eventEndBeforeDate: string;
  description: string;
}

const CreateEventForm = () => {
  const [eventData, setEventData] = useState<EventData>({
    title: '',
    isLiveEvent: false,
    startDate: '',
    endDate: '',
    lastEventCallSession: '',
    location: '',
    timeDuration: '',
    initialPrice: '',
    eventEndBeforeDate: '',
    description: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;

    setEventData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Event created:', eventData);
    alert('Event created successfully!');
  };

  return (
    <div className="create-event-container max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Event Details</h1>
      
      <form onSubmit={handleSubmit}>
        {/* All your form JSX from the previous example */}
        <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Event specific:</h2>
          
          <div className="form-group">
            <label htmlFor="title"><strong>Event Title:</strong></label>
            <input
              type="text"
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
          </div>
          
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="isLiveEvent"
              name="isLiveEvent"
              checked={eventData.isLiveEvent}
              onChange={handleChange}
            />
            <label htmlFor="isLiveEvent">Live events: event/event/events</label>
          </div>
        </div>

        <hr />

        <div className="form-section">
          <div className="form-row d-flex justify-content-between">
            <div className="form-group">
              <label htmlFor='startDate'>Event Date (starting):</label>
              <input
                type="date"
                className='w-fill'
                id="startDate"
                name="startDate"
                value={eventData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor='endDate'>Event Date (closing):</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={eventData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="time">Time / Duration</label>
            <input
              type="time"
              id="lastEventCallSession"
              name="lastEventCallSession"
              value={eventData.lastEventCallSession}
              onChange={handleChange}
              placeholder="Enter last event at start as event call session"
              className=''
            />
          </div>
        </div>

        <hr />

        <div className="form-section">
          <h3>Location</h3>
          
          <div className="form-group">
            <input
              type="text"
              id="location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              placeholder="Enter event name"
              required
            />
          </div>
        </div>

        <hr />

        <div className="form-section">
          <h3>Price</h3>
          
          <div className="form-group">
            <input
              type="text"
              id="timeDuration"
              name="timeDuration"
              value={eventData.timeDuration}
              onChange={handleChange}
              placeholder="Enter time duration"
            />
          </div>
          
          <div className="form-group">
            <input
              type="number"
              id="initialPrice"
              name="initialPrice"
              value={eventData.initialPrice}
              onChange={handleChange}
              placeholder="Enter initial price"
            />
          </div>
          
          <div className="form-group">
            <input
              type="date"
              id="eventEndBeforeDate"
              name="eventEndBeforeDate"
              value={eventData.eventEndBeforeDate}
              onChange={handleChange}
              placeholder="Enter end of the event date before date"
            />
          </div>
        </div>

        <hr />

        <div className="form-section">
          <h3>FACILITIES</h3>
          
          <div className="form-group">
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Enter final description about the event"
              rows={4}
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Create Event</button>
      </form>
        {/* ... */}
      </form>
    </div>
  );
};

export default CreateEventForm;