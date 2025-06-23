'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AdminDashboard() {
  type UpcomingEvent = { id: number; title: string | null; date: string | null; image: string };
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  type NewsEvent = { id: number; title: string | null; description: string | null; imageSrc: string };
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([]);
  const [feesPayments, setFeesPayments] = useState({
    applicationFee: '50,000 (e.g., Application & Admission Fee)',
    idCardFee: '10,000 (e.g., Identity Card Fee)',
    tuitionFee: '300,000 (e.g., Tuition per term)',
    uniformFee: '100,000 (e.g., Uniform Two Pairs)',
    songBookFee: '5,000 (e.g., Song Book Fee)',
    otherRequirements: '50,000 (e.g., Sports wear, Stationery)',
  });
  const [admissionSchedule, setAdmissionSchedule] = useState({
    applicationOpens: 'June 1, 2025 (e.g., Application Opens Date)',
    applicationDeadline: 'July 15, 2025 (e.g., Application Deadline Date)',
    documentDeadline: 'July 20, 2025 (e.g., Document Submission Deadline)',
    interviews: 'July 25–30, 2025 (e.g., Interview Dates)',
    results: 'August 5, 2025 (e.g., Results Announcement Date)',
    registrationDeadline: 'August 15, 2025 (e.g., Registration & Payment Deadline)',
    schoolReopens: 'September 1, 2025 (e.g., School Reopening Date)',
  });
  type SchoolEvent = { id: number; title: string | null; date: string | null; image?: string };
  const [schoolEvents, setSchoolEvents] = useState<SchoolEvent[]>([]);
  const [clubs, setClubs] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', imageSrc: '', date: '' });

  // Define placeholder image names for the entire website
  const placeholderImages = [
    'event1.jpg', 'event2.jpg', 'event3.jpg', // Upcoming Events
    'news1.jpg', 'news2.jpg', 'news3.jpg', // News & Events
    'school1.jpg', 'school2.jpg', // School Events
    'club-christian-prayer.jpg', 'club-christian-singing.jpg', 'club-christian-group.jpg', 'club-christian-event.jpg', // Christian Youth Fellowship
    'club-science-experiment.jpg', 'club-science-demo.jpg', 'club-science-team.jpg', 'club-science-fair.jpg', // Science Club
    'club-debate-discussion.jpg', 'club-debate-competition.jpg', 'club-debate-team.jpg', 'club-debate-event.jpg', // Debate Club
    'club-art-craft.jpg', 'club-art-painting.jpg', 'club-art-group.jpg', 'club-art-exhibit.jpg', // Art & Craft Society
    'sports-football.jpg', 'sports-netball.jpg', 'sports-athletics.jpg', 'sports-team.jpg', // Sports
    'arts-music.jpg', 'arts-dance.jpg', 'arts-drama.jpg', 'arts-performance.jpg', // Arts
    'assembly.jpg', 'classroom.jpg', 'hero-bg.jpg', 'placeholder.jpg', 'playground.jpg', 'school-building.jpg', 'school-logo.png', // General School
    'scouting-camp.jpg', 'scouting-skills.jpg', 'scouting-group.jpg', 'scouting-event.jpg', // Scouting
    'community-service.jpg', 'community-project.jpg', 'community-team.jpg', 'community-event.jpg', // Community
    'p1-happy.jpg', 'p1-learning.jpg', 'p1-playing.jpg', 'p1-group.jpg', 'p1-art.jpg', 'p1-sports.jpg', 'p1-prayer.jpg', 'p1-celebration.jpg', // P1
    'p2-happy.jpg', 'p2-learning.jpg', 'p2-playing.jpg', 'p2-group.jpg', 'p2-art.jpg', 'p2-sports.jpg', 'p2-prayer.jpg', 'p2-celebration.jpg', // P2
    'p3-happy.jpg', 'p3-learning.jpg', 'p3-playing.jpg', 'p3-group.jpg', 'p3-art.jpg', 'p3-sports.jpg', 'p3-prayer.jpg', 'p3-celebration.jpg', // P3
    'p4-happy.jpg', 'p4-learning.jpg', 'p4-playing.jpg', 'p4-group.jpg', 'p4-art.jpg', 'p4-sports.jpg', 'p4-prayer.jpg', 'p4-celebration.jpg', // P4
    'p5-happy.jpg', 'p5-learning.jpg', 'p5-playing.jpg', 'p5-group.jpg', 'p5-art.jpg', 'p5-sports.jpg', 'p5-prayer.jpg', 'p5-celebration.jpg', // P5
    'p6-happy.jpg', 'p6-learning.jpg', 'p6-playing.jpg', 'p6-group.jpg', 'p6-art.jpg', 'p6-sports.jpg', 'p6-prayer.jpg', 'p6-celebration.jpg', // P6
    'p7-happy.jpg', 'p7-learning.jpg', 'p7-playing.jpg', 'p7-group.jpg', 'p7-art.jpg', 'p7-sports.jpg', 'p7-prayer.jpg', 'p7-celebration.jpg', // P7
  ];

  useEffect(() => {
    // Fetch initial data from APIs
    Promise.all([
      fetch('/api/news').then(res => res.json()).then(data => setNewsEvents(data)),
      fetch('/api/events').then(res => res.json()).then(data => setUpcomingEvents(data)),
      fetch('/api/school-events').then(res => res.json()).then(data => setSchoolEvents(data)),
      fetch('/api/clubs').then(res => res.json()).then(data => setClubs(data)),
    ]).catch(error => console.error('Fetch error:', error));
  }, []);

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title');
    const date = formData.get('date');
    const image = formData.get('image');
    const newEvent = {
      id: Date.now(),
      title: typeof title === 'string' ? title : '',
      date: typeof date === 'string' ? date : '',
      image: `/images/${typeof image === 'string' && image ? image : 'event1.jpg'}`,
    };
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', data: newEvent }),
      });
      if (response.ok) {
        const result = await response.json();
        setUpcomingEvents(prev => [...prev, result.data]);
        console.log('Event added successfully:', result);
      } else {
        console.error('Failed to add event, server response:', await response.text());
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
    (e.target as HTMLFormElement).reset();
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', data: { id } }),
      });
      if (response.ok) setUpcomingEvents(prev => prev.filter(event => event.id !== id));
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleAddNewsEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title');
    const description = formData.get('description');
    const image = formData.get('image');
    const newEvent = {
      id: Date.now(),
      title: typeof title === 'string' ? title : '',
      description: typeof description === 'string' ? description : '',
      imageSrc: `/images/${typeof image === 'string' && image ? image : 'news1.jpg'}`,
    };
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', data: newEvent }),
      });
      if (response.ok) setNewsEvents(prev => [...prev, newEvent]);
    } catch (error) {
      console.error('Failed to add news:', error);
    }
    (e.target as HTMLFormElement).reset();
  };

  const handleDeleteNewsEvent = async (id: number) => {
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', data: { id } }),
      });
      if (response.ok) setNewsEvents(prev => prev.filter(event => event.id !== id));
    } catch (error) {
      console.error('Failed to delete news:', error);
    }
  };

  const handleEditNewsEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId !== null) {
      const updatedEvent = { id: editingId, ...editForm };
      try {
        const response = await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'edit', data: updatedEvent }),
        });
        if (response.ok) {
          setNewsEvents(prev => prev.map(event => event.id === editingId ? updatedEvent : event));
          setEditingId(null);
          setEditForm({ title: '', description: '', imageSrc: '', date: '' });
        }
      } catch (error) {
        console.error('Failed to edit news:', error);
      }
    }
  };

  const handleDeleteSchoolEvent = async (id: number) => {
    try {
      const response = await fetch('/api/school-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', data: { id } }),
      });
      if (response.ok) setSchoolEvents(prev => prev.filter(event => event.id !== id));
    } catch (error) {
      console.error('Failed to delete school event:', error);
    }
  };

  const handleAddSchoolEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title');
    const date = formData.get('date');
    const image = formData.get('image');
    const newEvent = {
      id: Date.now(),
      title: typeof title === 'string' ? title : '',
      date: typeof date === 'string' ? date : '',
      image: typeof image === 'string' && image ? `/images/${image}` : '/images/school1.jpg',
    };
    try {
      const response = await fetch('/api/school-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', data: newEvent }),
      });
      if (response.ok) {
        const result = await response.json();
        setSchoolEvents(prev => [...prev, result.data]);
      } else {
        console.error('Failed to add school event, server response:', await response.text());
      }
    } catch (error) {
      console.error('Failed to add school event:', error);
    }
    (e.target as HTMLFormElement).reset();
  };

  const handleAddClub = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newClub = formData.get('club');
    const image = formData.get('image');
    if (typeof newClub === 'string' && newClub && !clubs.includes(newClub)) {
      try {
        const response = await fetch('/api/clubs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            action: 'add', 
            data: { 
              id: Date.now(), 
              name: newClub, 
              image: typeof image === 'string' && image ? `/images/${image}` : '/images/club1.jpg' 
            } 
          }),
        });
        if (response.ok) setClubs(prev => [...prev, newClub]);
      } catch (error) {
        console.error('Failed to add club:', error);
      }
    }
    (e.target as HTMLFormElement).reset();
  };

  const handleDeleteClub = async (club: string) => {
    try {
      const id = clubs.indexOf(club); // Simple ID mapping; improve with actual IDs
      const response = await fetch('/api/clubs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', data: { id } }),
      });
      if (response.ok) setClubs(prev => prev.filter(c => c !== club));
    } catch (error) {
      console.error('Failed to delete club:', error);
    }
  };

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      const fileName = imageFile.name; // Use the uploaded file's original name
      formData.append('filename', fileName); // Pass filename to API
      try {
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (result.success) {
          console.log(`Uploaded ${result.fileName}`);
          // Update all sections using the uploaded image
          if (placeholderImages.includes(fileName)) {
            setUpcomingEvents(prev => prev.map(event => 
              ['event1.jpg', 'event2.jpg', 'event3.jpg'].includes(fileName) ? { ...event, image: `/images/${fileName}` } : event
            ));
            setNewsEvents(prev => prev.map(event => 
              ['news1.jpg', 'news2.jpg', 'news3.jpg'].includes(fileName) ? { ...event, imageSrc: `/images/${fileName}` } : event
            ));
            setSchoolEvents(prev => prev.map(event => 
              ['school1.jpg', 'school2.jpg'].includes(fileName) ? { ...event, image: `/images/${fileName}` } : event
            ));
            // Assuming clubs data structure supports images (adjust if needed)
            // For now, clubs remain as strings; you'd need to extend the type and state
          }
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
      setImageFile(null);
    }
  };

  const handleUpdateFees = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedFees = {
      applicationFee: formData.get('applicationFee') as string || '',
      idCardFee: formData.get('idCardFee') as string || '',
      tuitionFee: formData.get('tuitionFee') as string || '',
      uniformFee: formData.get('uniformFee') as string || '',
      songBookFee: formData.get('songBookFee') as string || '',
      otherRequirements: formData.get('otherRequirements') as string || '',
    };
    try {
      const response = await fetch('/api/fees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', data: updatedFees }),
      });
      if (response.ok) setFeesPayments(updatedFees);
    } catch (error) {
      console.error('Failed to update fees:', error);
    }
  };

  const handleUpdateSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedSchedule = {
      applicationOpens: formData.get('applicationOpens') as string || '',
      applicationDeadline: formData.get('applicationDeadline') as string || '',
      documentDeadline: formData.get('documentDeadline') as string || '',
      interviews: formData.get('interviews') as string || '',
      results: formData.get('results') as string || '',
      registrationDeadline: formData.get('registrationDeadline') as string || '',
      schoolReopens: formData.get('schoolReopens') as string || '',
    };
    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', data: updatedSchedule }),
      });
      if (response.ok) setAdmissionSchedule(updatedSchedule);
    } catch (error) {
      console.error('Failed to update schedule:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Upcoming Events</h2>
          <form onSubmit={handleAddEvent} className="space-y-4 mb-4">
            <input name="title" placeholder="Event Title" className="w-full px-4 py-2 border rounded-lg" required title="Event Title" />
            <input
              name="date"
              type="date"
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="Select event date"
              title="Event Date"
            />
            <input name="image" list="imageOptions" placeholder="Select or enter image filename" className="w-full px-4 py-2 border rounded-lg" title="Event Image Filename" />
            <datalist id="imageOptions">
              {placeholderImages.map(filename => (
                <option key={filename} value={filename} />
              ))}
            </datalist>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Add Event</button>
          </form>
          <ul className="space-y-2">
            {upcomingEvents.map(event => (
              <li key={event.id} className="flex items-center space-x-2">
                <span>
                  {event.title ?? ''} - {event.date ?? ''} -{' '}
                  <Image
                    src={event.image}
                    alt={event.title ?? 'Event image'}
                    className="inline-block w-12 h-12"
                    width={48}
                    height={48}
                  />
                </span>
                <button onClick={() => handleDeleteEvent(event.id)} className="text-red-500 hover:text-red-700">Delete</button>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">News & Events</h2>
          <form onSubmit={handleAddNewsEvent} className="space-y-4 mb-4">
            <input name="title" placeholder="Title" className="w-full px-4 py-2 border rounded-lg" required title="News Title" />
            <input name="description" placeholder="Description" className="w-full px-4 py-2 border rounded-lg" required title="News Description" />
            <input name="image" list="imageOptions" placeholder="Select or enter image filename" className="w-full px-4 py-2 border rounded-lg" title="News Image Filename" />
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Add News</button>
          </form>
          {editingId !== null && (
            <form onSubmit={handleEditNewsEvent} className="space-y-4 mb-4">
              <input name="title" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required title="Edit News Title" />
              <input name="description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required title="Edit News Description" />
              <input
                name="imageSrc"
                value={editForm.imageSrc}
                onChange={(e) => setEditForm({ ...editForm, imageSrc: e.target.value })}
                list="imageOptions"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Select or enter image filename"
                title="Edit News Image Filename"
              />
              <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Save Edit</button>
              <button type="button" onClick={() => setEditingId(null)} className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">Cancel</button>
            </form>
          )}
          <ul className="space-y-2">
            {newsEvents.map(event => (
              <li key={event.id} className="flex justify-between items-center">
                <span>
                  {event.title} -{' '}
                  <Image
                    src={event.imageSrc}
                    alt={event.title ?? 'News image'}
                    className="w-12 h-12 inline-block"
                    width={48}
                    height={48}
                  />
                </span>
                <div>
                  <button onClick={() => { setEditingId(event.id); setEditForm({ title: event.title ?? '', description: event.description ?? '', imageSrc: event.imageSrc ?? '', date: '' }); }} className="text-yellow-500 hover:text-yellow-700 mr-2">Edit</button>
                  <button onClick={() => handleDeleteNewsEvent(event.id)} className="text-red-500 hover:text-red-700">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Fees & Payments</h2>
          <form onSubmit={handleUpdateFees} className="space-y-4 mb-4">
            <input name="applicationFee" placeholder="Application Fee" defaultValue={feesPayments.applicationFee} className="w-full px-4 py-2 border rounded-lg" title="Application Fee" />
            <input name="idCardFee" placeholder="ID Card Fee" defaultValue={feesPayments.idCardFee} className="w-full px-4 py-2 border rounded-lg" title="ID Card Fee" />
            <input name="tuitionFee" placeholder="Tuition Fee" defaultValue={feesPayments.tuitionFee} className="w-full px-4 py-2 border rounded-lg" title="Tuition Fee" />
            <input name="uniformFee" placeholder="Uniform Fee" defaultValue={feesPayments.uniformFee} className="w-full px-4 py-2 border rounded-lg" title="Uniform Fee" />
            <input name="songBookFee" placeholder="Song Book Fee" defaultValue={feesPayments.songBookFee} className="w-full px-4 py-2 border rounded-lg" title="Song Book Fee" />
            <input name="otherRequirements" placeholder="Other Requirements" defaultValue={feesPayments.otherRequirements} className="w-full px-4 py-2 border rounded-lg" title="Other Requirements" />
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Update Fees</button>
          </form>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Admission Schedule</h2>
          <form onSubmit={handleUpdateSchedule} className="space-y-4 mb-4">
            <input name="applicationOpens" placeholder="Application Opens" defaultValue={admissionSchedule.applicationOpens} className="w-full px-4 py-2 border rounded-lg" title="Application Opens" />
            <input name="applicationDeadline" placeholder="Application Deadline" defaultValue={admissionSchedule.applicationDeadline} className="w-full px-4 py-2 border rounded-lg" title="Application Deadline" />
            <input name="documentDeadline" placeholder="Document Deadline" defaultValue={admissionSchedule.documentDeadline} className="w-full px-4 py-2 border rounded-lg" title="Document Deadline" />
            <input name="interviews" placeholder="Interviews" defaultValue={admissionSchedule.interviews} className="w-full px-4 py-2 border rounded-lg" title="Interviews" />
            <input name="results" placeholder="Results" defaultValue={admissionSchedule.results} className="w-full px-4 py-2 border rounded-lg" title="Results" />
            <input name="registrationDeadline" placeholder="Registration Deadline" defaultValue={admissionSchedule.registrationDeadline} className="w-full px-4 py-2 border rounded-lg" title="Registration Deadline" />
            <input name="schoolReopens" placeholder="School Reopens" defaultValue={admissionSchedule.schoolReopens} className="w-full px-4 py-2 border rounded-lg" title="School Reopens" />
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Update Schedule</button>
          </form>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">School Events</h2>
          <form onSubmit={handleAddSchoolEvent} className="space-y-4 mb-4">
            <input name="title" placeholder="Event Title" className="w-full px-4 py-2 border rounded-lg" required />
            <input
              name="date"
              type="date"
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="Select event date"
              title="Event Date"
            />
            <input name="image" list="imageOptions" placeholder="Select or enter image filename" className="w-full px-4 py-2 border rounded-lg" />
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Add Event</button>
          </form>
          <ul className="space-y-2">
            {schoolEvents.map(event => (
              <li key={event.id} className="flex justify-between items-center">
                <span>
                  {event.title} - {event.date} -{' '}
                  <Image
                    src={event.image ?? '/images/school1.jpg'}
                    alt={event.title ?? 'School event image'}
                    className="w-12 h-12 inline-block"
                    width={48}
                    height={48}
                  />
                </span>
                <button onClick={() => handleDeleteSchoolEvent(event.id)} className="text-red-500 hover:text-red-700">Delete</button>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Clubs at Bugema Primary School</h2>
          <form onSubmit={handleAddClub} className="space-y-4 mb-4">
            <input name="club" placeholder="Club Name" className="w-full px-4 py-2 border rounded-lg" required title="Club Name" />
            <input name="image" list="imageOptions" placeholder="Select or enter image filename" className="w-full px-4 py-2 border rounded-lg" title="Club Image Filename" />
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Add Club</button>
          </form>
          <ul className="space-y-2">
            {clubs.map(club => (
              <li key={club} className="flex justify-between items-center">
                <span>{club}</span>
                <button onClick={() => handleDeleteClub(club)} className="text-red-500 hover:text-red-700">Delete</button>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Picture Names Needed</h2>
          <div className="bg-white p-4 border rounded-lg">
            <div className="grid grid-cols-4 gap-2 text-base">
              {placeholderImages.map((name) => (
                <span key={name} className="p-1 bg-gray-200 rounded">{name}</span>
              ))}
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Upload Image (Site-Wide)</h2>
          <form onSubmit={handleImageUpload} className="space-y-4">
            <label htmlFor="imageUpload" className="block mb-1 font-medium">Choose an image file</label>
            <input
              id="imageUpload"
              type="file"
              title="Upload an image file"
              placeholder="Choose an image file"
              aria-label="Upload an image file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border rounded-lg"
              accept="image/*"
            />
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Upload Picture</button>
          </form>
        </section>
      </div>
    </div>
  );
}