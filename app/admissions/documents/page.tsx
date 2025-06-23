export default function RequiredDocuments() {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Required Documents</h1>
          <p className="text-gray-700 mb-4">Please prepare the following documents for your child’s admission to Bugema Adventist Primary School:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Completed application form (submitted online).</li>
            <li>Copy of the student’s birth certificate.</li>
            <li>Two recent passport-sized photographs of the student.</li>
            <li>Proof of residence (e.g., utility bill or parent’s ID).</li>
            <li>Previous school report card (if transferring).</li>
            <li>Medical certificate from a recognized health provider.</li>
            <li>Parent/guardian identification (e.g., national ID or passport).</li>
          </ul>
          <p className="mt-4 text-gray-600">Submit documents to the school office at P.O. Box 6529, Kampala, Uganda, or email scans to admissions@bugemaaps.org.</p>
        </div>
      </div>
    );
  }