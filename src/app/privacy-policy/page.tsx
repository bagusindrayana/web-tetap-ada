export default function Page() {
  return <div className="dark min-h-screen bg-[#0d0d0d] text-white">
    <header className="flex items-center justify-between p-6 bg-gray-900">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <nav className="space-x-4">
        <a className="text-gray-300 hover:text-white" href="/">
          Home
        </a>

      </nav>
    </header>
    <main className="p-6 space-y-8">
      <section>
        <h2 className="text-xl font-bold">Introduction</h2>
        <p>
          We value your privacy and are committed to protecting your personal information. This Privacy Policy
          outlines the types of information we collect, how we use it, and the measures we take to keep it secure.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">Information Collection</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc list-inside">
          <li>Name</li>
          <li>Email address</li>
          <li>IP address</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold">Use of Information</h2>
        <p>We may use the collected information for the following purposes:</p>
        <ul className="list-disc list-inside">
          <li>Account creation</li>
          <li>Personalization of content</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold">Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information, including
          encryption, firewalls, and secure server connections.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">Cookies</h2>
        <p>
          We use cookies to enhance your experience on our website. Cookies help us understand user behavior and
          improve our services.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">Third-Party Disclosure</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
          This does not include trusted third parties who assist us in operating our website, conducting our business,
          or servicing you, so long as those parties agree to keep this information confidential.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">User Rights</h2>
        <p>
          You have the right to access, update, and delete your personal information at any time. To exercise these
          rights, please contact us using the information provided below.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">Contact Information</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at: privacy@example.com
        </p>
      </section>
    </main>
    <footer className="p-6 bg-gray-900 text-center">
      <p>© Tetap Ada. All rights reserved.</p>

    </footer>
  </div>
}