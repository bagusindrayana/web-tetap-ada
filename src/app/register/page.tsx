"use client"
import { getGoogleUrl } from '../../utils/getGoogleUrl';
import { FormEvent, useState } from 'react'
export default function Page() {
    const [loading, setLoading] = useState(false)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const name = form.nama.value;
        const email = form.email.value;
        const password = form.password.value;

        //validate email and password
        if (name.length < 1 || email.length < 1 || password.length < 1) {
            alert("Please fill all the fields")
            return
        }
        setLoading(true)

        const data = {
            name: name,
            email: email,
            password: password,
        }

        const response = fetch(`/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => {
            const json = response.json();
            if (response.status === 200) {
                

                window.location.href = "/my/website"
            } else {
                json.then((data) => {
                    alert(data.error)
                })
            }
        }).catch((error) => {
            alert("Invalid credentials")
        }).finally(() => {
            setLoading(false)
        })



    }
    return <main className=" text-white min-h-screen">
        <div className="dark min-h-screen bg-[#0d0d0d]">
            <header className="flex items-center justify-between p-6 bg-gray-900">
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <nav className="space-x-4">
                    <a className="text-gray-300 hover:text-white" href="/">
                        Home
                    </a>

                </nav>
            </header>
            <div className="flex items-center justify-center mt-20">
                <form action="/api/register"  method="POST" onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="nama">
                            Nama
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="nama"
                            required
                            name='name'
                            placeholder="Nama"
                            type="text"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            required
                            name='email'
                            placeholder="Email"
                            type="email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            placeholder="******************"
                            required
                            type="password"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <button
                            className="bg-blue-500 w-full  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {loading ? "Loading..." : "Sign Up"}
                        </button>

                    </div>
                    <div className="w-full text-center my-4">
                        Or
                    </div>
                    <div className="flex items-center justify-center">
                    <a href={getGoogleUrl("/login-google")} type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55">
                            <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            Sign in with Google
                        </a>
                    </div>
                    <div className="w-full my-4">
                        <p className="text-center text-gray-300 text-sm">
                            Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Sign in</a>.
                        </p>
                    </div>
                </form>
            </div>
        </div>

    </main>
}