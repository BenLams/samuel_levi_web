export default function AdmissionProcess() {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Admission Process</h1>
          <p className="text-gray-700 mb-4">Bugema Adventist Primary School welcomes applications for a holistic Christian education. Follow these steps to enroll your child:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Complete the online registration form available at <a href="/register" className="text-blue-600 hover:underline">/register</a>.</li>
            <li>Submit required documents (see Required Documents page) to the school office or via email.</li>
            <li>Attend an admission interview with the school administration, scheduled after document review.</li>
            <li>Receive confirmation of admission and payment instructions upon approval.</li>
            <li>Pay the application and admission fees, then report with uniform and other requirements on the scheduled date.</li>
          </ol>
          <p className="mt-4 text-gray-600">For inquiries, contact the school at +256 414-408456 or email admissions@bugemaaps.org.</p>
        </div>
      </div>
    );
  }