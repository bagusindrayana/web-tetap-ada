"use client"
import { Fragment, useRef, useState, useEffect,FormEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PlusIcon,TrashIcon,PencilSquareIcon,ArrowPathIcon,PowerIcon } from '@heroicons/react/24/solid'
import { set } from 'zod'



export default function Page() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const [searchQuery, setSearchQuery] = useState<string>("")

  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)

  const [dataId, setDataId] = useState<string>("")
  const [formUrl, setFormUrl] = useState<string>("")

  
  function editWebsite(index: number) {
    const curData = data[index];
    setDataId(curData.id)
    setFormUrl(curData.url)
    setOpen(true)
  }

  async function deleteWebsite(index: number) {
    const curData = data[index];
    let urlApi = `${process.env.NEXT_PUBLIC_MY_URL}/api/website?dataId=${curData.id}&method=DELETE`

    const response = await fetch(urlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    if (response.status === 200) {
      const json = await response.json();
      searchWebsite({ target: { value: "" } })
      setDataId("")
      setFormUrl("")
    } else {
      if (response.status === 401) {
        alert("Invalid credentials")
      } else {
        alert("Server Error")
      }
    }
  }


  async function getWebsite(searchQuery: string = "") {

    var r = await fetch(`${process.env.NEXT_PUBLIC_MY_URL}/api/website?search=${searchQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    return r.json()
  }

  async function saveWebsite(event: FormEvent<HTMLFormElement>) {
   
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.url.value;

    //validate email and password
    if (url.length < 1) {
      alert("Please enter a valid url")
      return
    }
    setLoading(true)

    const data = {
      url: url,
    }

    let urlApi = `${process.env.NEXT_PUBLIC_MY_URL}/api/website`
    if(dataId) {
      urlApi = `${process.env.NEXT_PUBLIC_MY_URL}/api/website?dataId=${dataId}&method=PUT`
    }

    const response = await fetch(urlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      const json = await response.json();
      setOpen(false)
      searchWebsite({ target: { value: "" } })
      setDataId("")
      setFormUrl("")
    } else {
      if (response.status === 401) {
        alert("Invalid credentials")
      } else {
        alert("Server Error")
      }
    }
    setLoading(false)
  }

  async function logout(e:any){
    e.preventDefault();
    const response = await fetch(`/api/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    if (response.status === 200) {
      const json = await response.json();
      window.location.href = "/"
    } else {
      if (response.status === 401) {
        alert("Invalid credentials")
      } else {
        alert("Server Error")
      }
    }
  }


  function searchWebsite(e: any) {
    var result: any[] = [];
    setSearchQuery(e.target.value)
    getWebsite(e.target.value).then((json) => {
      json.data.data.map((website: any) => {
        var statusClass = "text-green-400"
        if (website.last_status != 200) {
          statusClass = "text-red-400"
        }
        var last_request_time = new Date(website.last_request_time * 1000)
        result.push({
          id: website.id,
          url: website.url,
          status: website.last_status,
          statusClass: statusClass,
          response_time: website.last_response_time,
          cert_info: website.last_cert_check,
          last_request_time: last_request_time.toString(),
        })
      });
      setData(result)
    }).catch((error) => {
      alert(error.message)
    });

  }


  useEffect(() => {
    searchWebsite({ target: { value: "" } })
  }, [])
  return <div className="dark flex flex-col w-full min-h-screen p-4 md:p-6 bg-gray-800 text-white">
    {/* Modal */}
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-600 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form action="" onSubmit={saveWebsite}>
                  <div className="bg-gray-600 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-50">
                        {dataId ? "Edit Website" : "Add Website"}
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="w-full px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-50 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            URL
                          </label>
                          <input name="url" value={formUrl} onChange={(e) => {
                            setFormUrl(e.target.value)
                          }} className="appearance-none block w-full bg-gray-400 text-gray-100 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="https://example.com" />
                          <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    >
                      {loading ? "Loading..." : "Save"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

    <header className="flex items-center justify-between mb-6">
      <div className="flex gap-4">
        <h1 className="text-2xl font-bold">Website Uptime Dashboard</h1>
        {/* open modal button */}
        <button
          type="button"
          className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-1 bg-accent text-sm font-medium text-white hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent bg-green-500"
          onClick={() => setOpen(true)}
        ><PlusIcon className="fill-current w-5 h-5 mr-2" /> <span>Add Website</span></button>
      </div>

      <div className="flex gap-4">
      
      <button onClick={logout} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  h-10 px-4 py-2 flex items-center gap-2 text-gray-50 bg-red-500">
        <PowerIcon className='w-5 h-5 mr-2'/>
        Logout
      </button>
      <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center gap-2 text-gray-800 bg-white">
        <ArrowPathIcon className='w-5 h-5 mr-2'/>
        Refresh
      </button>
      </div>
    </header>
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      <div className="w-full md:w-1/3">
        <input
          className="flex h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-gray-700 text-white placeholder-gray-400"
          placeholder="Search by url or status"
          type="text"
          onKeyUp={searchWebsite}
        />
      </div>
    </div>
    <div className="mt-6">
      <div className="relative w-full overflow-auto">


        {/* if data not null */}

        {data &&
          <table className="w-full table-auto">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Website URL
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  HTTP Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Response Time
                </th>
                <th className="h-12 px-4 max-w-60 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Cert Info
                </th>
                <th>
                  Last Check
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((website: any, index: number) => (
                <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{website.url}</td>
                  <td className={'p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 ' + website.statusClass}>{website.status}</td>
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{website.response_time} ms</td>
                  <td className="p-4 align-middle max-w-60">{website.cert_info}</td>
                  <td className="p-4 align-middle max-w-60">{website.last_request_time}</td>
                  <td className="p-4 align-middle flex gap-1">
                    <button onClick={() => editWebsite(index)} className="justify-center rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-2 py-1 flex items-center gap-2 text-gray-800 bg-white">
                      <PencilSquareIcon className='h-4 w-4'/> Edit
                    </button>
                    <button onClick={() => deleteWebsite(index)} className="justify-center rounded-md text-xs font-medium ring-offset-background transition-colors h-10 px-2 py-1 flex items-center gap-2 text-gray-100 bg-red-500">
                    <TrashIcon className='h-4 w-4'/> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
      </div>
    </div>
  </div>
}