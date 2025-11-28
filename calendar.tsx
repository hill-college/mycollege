import React, { useState } from 'react';
import { Calendar, Download, X, MapPin, Clock, Paperclip, ExternalLink, Plus, Copy, Check } from 'lucide-react';

const HillCollegeCalendar = () => {
  const [selectedCalendars, setSelectedCalendars] = useState(['community', 'term-dates', 'council']);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [exportCalendars, setExportCalendars] = useState(['community', 'term-dates', 'council']);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [suggestionForm, setSuggestionForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    calendar: 'community',
    fullDay: false
  });

  // Sample events data
  const events = [
    {
      id: 1,
      title: "New Student Orientation",
      description: "Welcome event for all new students joining Hill College this term.",
      date: new Date(2025, 10, 30),
      time: "09:00 AM - 12:00 PM",
      location: "Main Campus Auditorium",
      calendar: "community",
      attachments: ["orientation-guide.pdf"],
      links: ["https://hillcollege.edu/orientation"]
    },
    {
      id: 2,
      title: "Term 1 Begins",
      description: "First day of Term 1 for all students.",
      date: new Date(2025, 11, 2),
      fullDay: true,
      calendar: "term-dates"
    },
    {
      id: 3,
      title: "Council Meeting",
      description: "Monthly student council meeting to discuss campus initiatives.",
      date: new Date(2025, 11, 5),
      time: "02:00 PM - 04:00 PM",
      location: "Student Center Room 204",
      calendar: "council"
    },
    {
      id: 4,
      title: "Holiday Break Begins",
      description: "College closed for winter holidays.",
      date: new Date(2025, 11, 20),
      fullDay: true,
      calendar: "term-dates"
    },
    {
      id: 5,
      title: "Community Service Day",
      description: "Join us for a day of giving back to the local community.",
      date: new Date(2025, 11, 15),
      time: "08:00 AM - 05:00 PM",
      location: "Various Locations",
      calendar: "community",
      links: ["https://hillcollege.edu/volunteer"]
    }
  ];

  const calendars = [
    { id: 'community', name: 'Community', color: '#bb7321' },
    { id: 'term-dates', name: 'Term Dates', color: '#1f2437' },
    { id: 'council', name: 'Council', color: '#8b6914' }
  ];

  const toggleCalendar = (calendarId) => {
    setSelectedCalendars(prev =>
      prev.includes(calendarId)
        ? prev.filter(id => id !== calendarId)
        : [...prev, calendarId]
    );
  };

  const toggleExportCalendar = (calendarId) => {
    setExportCalendars(prev =>
      prev.includes(calendarId)
        ? prev.filter(id => id !== calendarId)
        : [...prev, calendarId]
    );
  };

  const generateCalendarLink = () => {
    const calendarNames = exportCalendars.map(id => 
      calendars.find(c => c.id === id)?.name
    ).join(', ');
    
    const baseUrl = window.location.origin + window.location.pathname;
    const link = `webcal://${baseUrl.replace(/^https?:\/\//, '')}?calendars=${exportCalendars.join(',')}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    console.log('Event suggestion submitted:', suggestionForm);
    alert('Thank you for your event suggestion! It has been submitted for review.');
    setSuggestionForm({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      calendar: 'community',
      fullDay: false
    });
    setShowSuggestModal(false);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDay = (day) => {
    return events.filter(event => {
      if (!selectedCalendars.includes(event.calendar)) return false;
      return event.date.getDate() === day &&
             event.date.getMonth() === currentMonth.getMonth() &&
             event.date.getFullYear() === currentMonth.getFullYear();
    });
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div style={{ fontFamily: '"Open Sauce Sans", -apple-system, sans-serif', minHeight: '100vh', background: '#fafafa' }}>
      {/* Header */}
      <header style={{ background: '#1f2437', color: 'white', padding: '24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cstyle%3E.scale%7Bfill:%23bb7321;%7D%3C/style%3E%3Cg class='scale'%3E%3Cellipse cx='70' cy='85' rx='25' ry='8'/%3E%3Cpath d='M55 85 L55 60 Q55 45 70 45 Q85 45 85 60 L85 85'/%3E%3Cellipse cx='130' cy='85' rx='25' ry='8'/%3E%3Cpath d='M115 85 L115 60 Q115 45 130 45 Q145 45 145 60 L145 85'/%3E%3Cpath d='M100 30 L100 45' stroke='%23bb7321' stroke-width='3' fill='none'/%3E%3Cpath d='M70 45 L130 45' stroke='%23bb7321' stroke-width='3' fill='none'/%3E%3Cpath d='M95 25 L100 30 L105 25 M90 20 L100 30 L110 20 M85 15 L100 30 L115 15' stroke='%23bb7321' stroke-width='2' fill='none'/%3E%3Cpath d='M30 30 Q30 15 45 15 Q50 15 55 20 L60 25 Q62 27 65 27 Q68 27 70 25 L75 20 Q80 15 85 15 Q100 15 100 30' stroke='%23bb7321' stroke-width='2.5' fill='none'/%3E%3Cpath d='M100 30 Q100 15 115 15 Q120 15 125 20 L130 25 Q132 27 135 27 Q138 27 140 25 L145 20 Q150 15 155 15 Q170 15 170 30' stroke='%23bb7321' stroke-width='2.5' fill='none'/%3E%3C/g%3E%3C/svg%3E" alt="Hill College" style={{ height: '60px', width: 'auto' }} />
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Hill College Calendar</h1>
              <p style={{ fontSize: '16px', opacity: 0.9 }}>Stay connected with campus events and important dates</p>
            </div>
          </div>
          <button
            onClick={() => setShowSuggestModal(true)}
            style={{
              padding: '12px 24px',
              background: '#bb7321',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#a06419'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#bb7321'}
          >
            <Plus size={18} />
            Suggest Event
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>
          {/* Sidebar */}
          <div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2437' }}>Calendars</h2>
              {calendars.map(cal => (
                <label key={cal.id} style={{ display: 'flex', alignItems: 'center', padding: '12px', cursor: 'pointer', borderRadius: '8px', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <input
                    type="checkbox"
                    checked={selectedCalendars.includes(cal.id)}
                    onChange={() => toggleCalendar(cal.id)}
                    style={{ marginRight: '12px', width: '18px', height: '18px', accentColor: cal.color }}
                  />
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: cal.color, marginRight: '12px' }}></span>
                  <span style={{ fontSize: '15px', color: '#1f2437' }}>{cal.name}</span>
                </label>
              ))}
            </div>

            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2437' }}>Export</h2>
              <button
                onClick={() => setShowExportModal(true)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#bb7321',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#a06419'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#bb7321'}
              >
                <Download size={18} />
                Export Calendars
              </button>
              <p style={{ fontSize: '13px', color: '#666', marginTop: '12px', lineHeight: '1.5' }}>
                Generate a subscription link for your selected calendars
              </p>
            </div>
          </div>

          {/* Calendar Grid */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2437' }}>{monthName}</h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  style={{ padding: '8px 16px', background: '#f5f5f5', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#1f2437' }}
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  style={{ padding: '8px 16px', background: '#f5f5f5', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#1f2437' }}
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  style={{ padding: '8px 16px', background: '#f5f5f5', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#1f2437' }}
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Calendar Header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '8px' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={{ textAlign: 'center', fontWeight: '600', fontSize: '14px', color: '#666', padding: '8px' }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
              {[...Array(startingDayOfWeek)].map((_, i) => (
                <div key={`empty-${i}`} style={{ aspectRatio: '1', minHeight: '100px' }}></div>
              ))}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDay(day);
                const isToday = new Date().getDate() === day && 
                               new Date().getMonth() === currentMonth.getMonth() && 
                               new Date().getFullYear() === currentMonth.getFullYear();
                
                return (
                  <div
                    key={day}
                    style={{
                      aspectRatio: '1',
                      minHeight: '100px',
                      border: isToday ? '2px solid #bb7321' : '1px solid #e5e5e5',
                      borderRadius: '8px',
                      padding: '8px',
                      background: isToday ? '#fff9f0' : 'white',
                      cursor: dayEvents.length > 0 ? 'pointer' : 'default'
                    }}
                  >
                    <div style={{ fontWeight: '600', fontSize: '14px', color: isToday ? '#bb7321' : '#1f2437', marginBottom: '4px' }}>
                      {day}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {dayEvents.map(event => (
                        <div
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          style={{
                            background: calendars.find(c => c.id === event.calendar)?.color,
                            color: 'white',
                            padding: '4px 6px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }} onClick={() => setSelectedEvent(null)}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            padding: '32px',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedEvent(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                color: '#666'
              }}
            >
              <X size={24} />
            </button>

            <div style={{ marginBottom: '8px', display: 'inline-block', padding: '4px 12px', borderRadius: '6px', background: calendars.find(c => c.id === selectedEvent.calendar)?.color, color: 'white', fontSize: '12px', fontWeight: '600' }}>
              {calendars.find(c => c.id === selectedEvent.calendar)?.name}
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2437', marginBottom: '16px' }}>
              {selectedEvent.title}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#666' }}>
                <Calendar size={20} style={{ color: '#bb7321' }} />
                <span>{selectedEvent.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>

              {selectedEvent.time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#666' }}>
                  <Clock size={20} style={{ color: '#bb7321' }} />
                  <span>{selectedEvent.time}</span>
                </div>
              )}

              {selectedEvent.fullDay && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#666' }}>
                  <Clock size={20} style={{ color: '#bb7321' }} />
                  <span>All Day Event</span>
                </div>
              )}

              {selectedEvent.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#666' }}>
                  <MapPin size={20} style={{ color: '#bb7321' }} />
                  <span>{selectedEvent.location}</span>
                </div>
              )}
            </div>

            {selectedEvent.description && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2437', marginBottom: '8px' }}>Description</h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>{selectedEvent.description}</p>
              </div>
            )}

            {selectedEvent.attachments && selectedEvent.attachments.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2437', marginBottom: '8px' }}>Attachments</h3>
                {selectedEvent.attachments.map((attachment, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#f5f5f5', borderRadius: '6px', marginBottom: '8px' }}>
                    <Paperclip size={16} style={{ color: '#bb7321' }} />
                    <span style={{ fontSize: '14px', color: '#1f2437' }}>{attachment}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedEvent.links && selectedEvent.links.length > 0 && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2437', marginBottom: '8px' }}>Links</h3>
                {selectedEvent.links.map((link, i) => (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#f5f5f5', borderRadius: '6px', marginBottom: '8px', textDecoration: 'none', color: '#bb7321', fontSize: '14px' }}>
                    <ExternalLink size={16} />
                    <span>{link}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }} onClick={() => setShowExportModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '100%',
            padding: '32px',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowExportModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                color: '#666'
              }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2437', marginBottom: '8px' }}>
              Export Calendars
            </h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              Select which calendars you'd like to include in your subscription link
            </p>

            <div style={{ marginBottom: '24px' }}>
              {calendars.map(cal => (
                <label key={cal.id} style={{ display: 'flex', alignItems: 'center', padding: '12px', cursor: 'pointer', borderRadius: '8px', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <input
                    type="checkbox"
                    checked={exportCalendars.includes(cal.id)}
                    onChange={() => toggleExportCalendar(cal.id)}
                    style={{ marginRight: '12px', width: '18px', height: '18px', accentColor: cal.color }}
                  />
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: cal.color, marginRight: '12px' }}></span>
                  <span style={{ fontSize: '15px', color: '#1f2437', fontWeight: '500' }}>{cal.name}</span>
                </label>
              ))}
            </div>

            <button
              onClick={generateCalendarLink}
              disabled={exportCalendars.length === 0}
              style={{
                width: '100%',
                padding: '12px',
                background: exportCalendars.length > 0 ? '#bb7321' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: exportCalendars.length > 0 ? 'pointer' : 'not-allowed',
                marginBottom: '16px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => exportCalendars.length > 0 && (e.currentTarget.style.background = '#a06419')}
              onMouseLeave={(e) => exportCalendars.length > 0 && (e.currentTarget.style.background = '#bb7321')}
            >
              Generate Link
            </button>

            {generatedLink && (
              <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px', fontWeight: '600' }}>
                  Subscription Link
                </p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '13px',
                      background: 'white',
                      fontFamily: 'monospace'
                    }}
                  />
                  <button
                    onClick={copyToClipboard}
                    style={{
                      padding: '8px 16px',
                      background: copied ? '#10b981' : '#bb7321',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'background 0.2s'
                    }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '12px', lineHeight: '1.5' }}>
                  Copy this link and add it to your calendar app (Google Calendar, Apple Calendar, Outlook, etc.) to subscribe to these calendars.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Suggest Event Modal */}
      {showSuggestModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }} onClick={() => setShowSuggestModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            padding: '32px',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowSuggestModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                color: '#666'
              }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2437', marginBottom: '8px' }}>
              Suggest an Event
            </h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              Share your event idea with us. We'll review it and add it to the calendar if approved.
            </p>

            <form onSubmit={handleSuggestionSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2437', marginBottom: '8px' }}>
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={suggestionForm.title}
                  onChange={(e) => setSuggestionForm({...suggestionForm, title: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontFamily: '"Open Sauce Sans", -apple-system, sans-serif'
                  }}
                  placeholder="Enter event title"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2437', marginBottom: '8px' }}>
                  Description
                </label>
                <textarea
                  value={suggestionForm.description}
                  onChange={(e) => setSuggestionForm({...suggestionForm, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontFamily: '"Open Sauce Sans", -apple-system, sans-serif',
                    minHeight: '100px',
                    resize: 'vertical'
                  }}
                  placeholder="Describe the event"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2437', marginBottom: '8px' }}>
                  Calendar Type *
                </label>
                <select
                  required
                  value={suggestionForm.calendar}
                  onChange={(e) => setSuggestionForm({...suggestionForm, calendar: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontFamily: '"Open Sauce Sans", -apple-system, sans-serif',
                    cursor: 'pointer'
                  }}
                >
                  {calendars.map(cal => (
                    <option key={cal.id} value={cal.id}>{cal.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2437', marginBottom: '8px' }}>
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={suggestionForm.date}
                  onChange={(e) => setSuggestionForm({...suggestionForm, date: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontFamily: '"Open Sauce Sans", -apple-system, sans-serif'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={suggestionForm.fullDay}
                    onChange={(e) => setSuggestionForm({...suggestionForm, fullDay: e.target.checked})}
                    style={{ marginRight: '8px', width: '18px', height: '18px', accentColor: '#bb7321' }}
                  />
                  <span style={{ fontSize: '14px', color: '#1f2437' }}>All-day event</span>
                </label>
              </div>

              {!suggestionForm.fullDay && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2437', marginBottom: '8px' }}>
                    Time
                  </label>
                  <input
                    type="text"
                    value={suggestionForm.time}
                    onChange={(e) => setSuggestionForm({...suggestionForm, time: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '15px',
                      fontFamily: '"Open Sauce Sans", -apple-system, sans-serif'
                    }}
                    placeholder="e.g., 2:00 PM - 4:00 PM"
                  />
                </div>
              )}

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1f2437', marginBottom: '8px' }}>
                  Location
                </label>
                <input
                  type="text"
                  value={suggestionForm.location}
                  onChange={(e) => setSuggestionForm({...suggestionForm, location: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontFamily: '"Open Sauce Sans", -apple-system, sans-serif'
                  }}
                  placeholder="Event location"
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#bb7321',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#a06419'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#bb7321'}
              >
                Submit Suggestion
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HillCollegeCalendar;