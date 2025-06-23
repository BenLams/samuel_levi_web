'use client';

import { useState, useEffect } from 'react';

export default function FeesPayments() {
  const [fees, setFees] = useState({
    applicationFee: '50,000',
    idCardFee: '10,000',
    tuitionFee: '300,000',
    uniformFee: '100,000',
    songBookFee: '5,000',
    otherRequirements: '50,000',
  });

  useEffect(() => {
    const fetchFees = async () => {
      const response = await fetch('/api/fees');
      const data = await response.json();
      setFees(data);
    };
    fetchFees();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Fees & Payments</h1>
        <p className="text-gray-700 mb-4">Below is the fee structure for Bugema Adventist Primary School for the 2025 academic year (in UGX):</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Application & Admission Fee: {fees.applicationFee}</li>
          <li>Identity Card (Annual): {fees.idCardFee}</li>
          <li>Tuition (per term): {fees.tuitionFee}</li>
          <li>Uniform (Two Pairs): {fees.uniformFee}</li>
          <li>Song Book: {fees.songBookFee}</li>
          <li>Other Requirements (e.g., sports wear, stationery): {fees.otherRequirements}</li>
        </ul>
        <p className="mt-4 text-gray-600">Total estimated cost per term: {(parseInt(fees.applicationFee.replace(',', '')) + parseInt(fees.idCardFee.replace(',', '')) + parseInt(fees.tuitionFee.replace(',', '')) + parseInt(fees.uniformFee.replace(',', '')) + parseInt(fees.songBookFee.replace(',', '')) + parseInt(fees.otherRequirements.replace(',', ''))).toLocaleString()} UGX. Payments should be made to the school bank account or at the office. Contact +256 414-408456 for payment details.</p>
      </div>
    </div>
  );
}