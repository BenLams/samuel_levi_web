'use client';

import { useState, useEffect } from 'react';

export default function AdmissionSchedule() {
  const [schedule, setSchedule] = useState({
    applicationOpens: 'June 1, 2025',
    applicationDeadline: 'July 15, 2025',
    documentDeadline: 'July 20, 2025',
    interviews: 'July 25–30, 2025',
    results: 'August 5, 2025',
    registrationDeadline: 'August 15, 2025',
    schoolReopens: 'September 1, 2025',
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch('/api/schedule');
      const data = await response.json();
      setSchedule(data);
    };
    fetchSchedule();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Admission Schedule</h1>
        <p className="text-gray-700 mb-4">Key dates for the 2025 admission cycle at Bugema Adventist Primary School:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Application Opens: {schedule.applicationOpens}</li>
          <li>Application Deadline: {schedule.applicationDeadline}</li>
          <li>Document Submission Deadline: {schedule.documentDeadline}</li>
          <li>Admission Interviews: {schedule.interviews}</li>
          <li>Admission Results Announced: {schedule.results}</li>
          <li>Registration & Payment Deadline: {schedule.registrationDeadline}</li>
          <li>School Reopens: {schedule.schoolReopens}</li>
        </ul>
        <p className="mt-4 text-gray-600">Check back for updates or contact admissions@bugemaaps.org for clarifications.</p>
      </div>
    </div>
  );
}