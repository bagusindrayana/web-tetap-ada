
export default function Home() {
  return (
    <main className="bg-[#0d0d0d] text-white min-h-screen">

      <nav className="flex justify-between items-center py-4 px-8">
        <h1 className="text-3xl font-bold">Tetap Ada</h1>
        <div className="flex space-x-6">
          <a className="hover:text-gray-300" href="/privacy-policy">
            Privacy Policy
          </a>
          <a className="hover:text-gray-300" href="#">
            Terms Of Service
          </a>
      
          
        </div>
      </nav>
      <header className="px-8 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-sm uppercase tracking-widest mb-2">Website availability monitoring</h2>
              <h1 className="text-6xl font-bold mb-4">Pastikan Tetap Ada!</h1>
              <p className="mb-6">
                Pastikan websitemu tetap berjalan dengan baik dengan selalu memonitoring website kamu.
              </p>
             
              <div className="flex space-x-4">
                {/* <a className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300" href="#">
                  Masuk
                </a> */}
                <a className="px-6 py-3 bg-gray-300 text-gray-900 hover:bg-gray-200 transition-colors duration-300" href="/login">
                  Masuk
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="space-y-4">
                <img src="/undraw_server_status_re_n8ln.svg" alt="Illustration server status" />
                
              </div>
            </div>
          </div>
        </div>
      </header>
    </main>
  )
}
