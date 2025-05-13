import React from 'react'

const CreateEvent = () => {
  return (
    <>
          <body>
        <div className="flex flex-col justify-start items-center max-w-[90rem] mx-auto bg-white">
            <div className="flex flex-row gap-[3.75rem] justify-center items-center overflow-hidden w-[90rem] h-20 px-[3.13rem] py-5 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.1)]">
                <p className="block w-[4.81rem] text-[2rem] text-gray-50 ">Eventify</p>
                <div className="flex flex-row gap-1 justify-end items-center w-[25rem] p-2 border-gray-50 border rounded-md">
                    <p className="block w-full text-sm text-gray-50 ">Search in site</p>
                    <div>
                        <img className="block" src="./assets/image-39575.1946065225.png" />
                    </div>
                </div>
                <div className="flex flex-row gap-[3.75rem] justify-start items-center">
                    <div className="flex flex-row gap-10 justify-center items-center">
                        <div className="flex flex-row gap-20 justify-start items-center">
                            <p className="block text-lg text-gray-50 ">Home</p>
                            <p className="block text-lg text-gray-50 ">Events</p>
                            <p className="block text-lg text-gray-50 ">About</p>
                            <p className="block text-lg text-gray-50 ">Contact</p>
                            <p className="block text-lg text-gray-50 ">Create Event</p>
                        </div>
                    </div>
                    <img className="block" src="./assets/image-34056.967715468156.png" />
                </div>
            </div>
            <div className="flex flex-col gap-[3.13rem] justify-center items-center overflow-hidden w-full px-[10.63rem] py-[3.75rem]">
                <div className="flex flex-col gap-6 justify-start items-center w-full">
                    <p className="block w-[32.50rem] text-center text-[2.50rem] text-black  font-bold">Event Details</p>
                    <p className="block w-[32.50rem] text-center text-black ">Enter event specifics</p>
                </div>
                <div className="flex flex-row gap-[3.75rem] justify-start items-start w-full">
                    <div className="flex flex-col gap-1 justify-center items-start overflow-hidden w-full px-3">
                        <p className="block w-full text-sm text-black  font-medium">Event Title</p>
                        <div className="flex flex-row gap-1 justify-start items-center w-full px-3 py-2 border-black border rounded-md">
                            <p className="block text-sm text-black text-opacity-50 ">Enter event title</p>
                        </div>
                        <p className="block w-full text-xs text-black text-opacity-50 ">Title should be descriptive and engaging</p>
                    </div>
                </div>
                <div className="flex flex-row gap-[3.75rem] justify-start items-start w-full">
                    <div className="flex flex-col gap-1 justify-center items-start overflow-hidden w-full px-3">
                        <p className="block w-full text-sm text-black  font-medium">Event Date (start)</p>
                        <div className="flex flex-row gap-1 justify-start items-center w-full px-3 py-2 border-black border rounded-md">
                            <p className="block text-sm text-black text-opacity-50 ">Enter starting date</p>
                        </div>
                        <p className="block w-full text-xs text-black text-opacity-50 ">Choose the date on which the event will take place</p>
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-start overflow-hidden w-full px-3">
                        <p className="block w-full text-sm text-black  font-medium">Event Date (closing)</p>
                        <div className="flex flex-row gap-1 justify-start items-center w-full px-3 py-2 border-black border rounded-md">
                            <p className="block text-sm text-black text-opacity-50 ">Select ending date</p>
                        </div>
                        <p className="block w-full text-xs text-black text-opacity-50 ">Choose the date on which the event will end</p>
                    </div>
                </div>
                <div className="flex flex-row gap-[3.75rem] justify-start items-start w-full">
                    <div className="flex flex-col gap-1 justify-center items-start overflow-hidden w-full px-3">
                        <p className="block w-full text-sm text-black  font-medium">Location</p>
                        <div className="flex flex-row gap-1 justify-start items-center w-full px-3 py-2 border-black border rounded-md">
                            <p className="block text-sm text-black text-opacity-50 ">Enter event venue</p>
                        </div>
                        <p className="block w-full text-xs text-black text-opacity-50 ">Specify the physical location of the event</p>
                    </div>
                    <div className="flex flex-col gap-1 justify-start items-center overflow-hidden w-full px-3">
                        <p className="block w-full text-sm text-black  font-medium">Event Category</p>
                        <div className="flex flex-row gap-1 justify-start items-center w-full px-3 py-2 border-black border rounded-md">
                            <p className="block text-sm text-black text-opacity-50 ">Select Category</p>
                            <div>
                                <img className="block" src="./assets/image-66080.9708429319.png" />
                            </div>
                        </div>
                        <p className="block w-full text-xs text-black text-opacity-50 ">Select the category that best describes your event</p>
                    </div>
                </div>
                <div className="flex flex-row gap-[3.75rem] justify-start items-start w-full">
                    <div className="flex flex-col gap-1 justify-start items-center overflow-hidden w-full">
                        <p className="block w-full text-sm text-black  font-medium">Time</p>
                        <div className="flex flex-row gap-1 justify-start items-center w-full px-3 py-2 bg-white border-black border rounded-md">
                            <p className="block text-sm text-black text-opacity-50 ">Enter time duration</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-start overflow-hidden w-full px-3">
                        <p className="block w-full text-sm text-black  font-medium">Ticket Price</p>
                        <div className="flex flex-row gap-1 justify-start items-center w-full px-3 py-2 border-black border rounded-md">
                            <p className="block text-sm text-black text-opacity-50 ">Enter ticket price</p>
                        </div>
                        <p className="block w-full text-xs text-black text-opacity-50 ">Set the price for attendees to purchase tickets</p>
                    </div>
                </div>
                <div className="flex flex-row gap-[3.75rem] justify-start items-start w-full">
                    <div className="flex flex-col gap-1 justify-center items-start overflow-hidden w-full px-3">
                        <p className="block w-full text-sm text-black  font-medium">Description</p>
                        <div className="flex flex-row gap-1 justify-start items-center w-full px-3 py-2 border-black border rounded-md">
                            <p className="block text-sm text-black text-opacity-50 ">Enter brief description about the event</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-start items-start overflow-hidden w-full px-3">
                    <div className="flex flex-col justify-center items-center w-full px-3 py-2.5 bg-black rounded-lg">
                        <p className="block text-white  font-medium">Create Event</p>
                    </div>
                </div>
                <img className="block" src="./assets/image-70682.8629116952.png" />
            </div>
            <div className="flex flex-row gap-[3.75rem] justify-center items-center overflow-hidden w-full px-[3.75rem] pt-[3.75rem]">
                <div>
                    <div className="flex flex-row gap-[6.25rem] justify-start items-start">
                        <div className="flex flex-row gap-[15.63rem] justify-start items-start w-[58.25rem]">
                            <div className="flex flex-row gap-[6.44rem] justify-start items-start w-[57.56rem]">
                                <p className="block w-[27.25rem] text-lg text-gray-50 ">We worried for the job seeker and employer that is why we are here. We
                                    feel how difficult it is to get right job, for company an individual candidate
                                    and right candidate for companies. We serve for small business to large
                                    business and fresher to highly skilled.</p>
                                <div className="flex flex-col gap-2.5 justify-start items-start">
                                    <p className="block w-full text-lg text-gray-50 ">User</p>
                                    <p className="block w-full text-lg text-gray-50 ">User SignIn</p>
                                    <p className="block w-full text-lg text-gray-50 ">User Login</p>
                                </div>
                                <div className="flex flex-col gap-2.5 justify-start items-start">
                                    <p className="block w-full text-lg text-gray-50 ">Club</p>
                                    <p className="block w-full text-lg text-gray-50 ">Club SignIn</p>
                                    <p className="block w-full text-lg text-gray-50 ">Club Login</p>
                                    <p className="block w-full text-lg text-gray-50 ">Create Event</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-[2.31rem] justify-start items-center">
                                <div>
                                    <img className="block" src="./assets/image-84186.2415131224.png" />
                                    <img className="block" src="./assets/image-86410.53132028271.png" />
                                </div>
                                <div>
                                    <div>
                                        <img className="block" src="./assets/image-58956.54691258636.png" />
                                        <img className="block" src="./assets/image-58769.53441926686.png" />
                                        <img className="block" src="./assets/image-16422.202185734648.png" />
                                    </div>
                                </div>
                                <div>
                                    <img className="block" src="./assets/image-36829.67285597562.png" />
                                </div>
                                <div>
                                    <div>
                                        <img className="block" src="./assets/image-12195.854423466868.png" />
                                        <img className="block" src="./assets/image-26951.551696178645.png" />
                                        <img className="block" src="./assets/image-85264.55766996303.png" />
                                    </div>
                                </div>
                                <div>
                                    <img className="block" src="./assets/image-56208.87360369142.png" />
                                    <img className="block" src="./assets/image-24082.629756065187.png" />
                                </div>
                                <div>
                                    <img className="block" src="./assets/image-82150.11805559207.png" />
                                </div>
                                <div>
                                    <div>
                                        <img className="block" src="./assets/image-25636.657247814677.png" />
                                        <img className="block" src="./assets/image-90044.71848877995.png" />
                                        <img className="block" src="./assets/image-22175.85593024376.png" />
                                        <img className="block" src="./assets/image-75822.04473952512.png" />
                                        <img className="block" src="./assets/image-89497.88956719855.png" />
                                        <img className="block" src="./assets/image-47364.88304460309.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[0.56rem] justify-start items-start">
                            <p className="block text-lg text-gray-50 ">Contact Us</p>
                            <p className="block underline text-lg text-gray-50 ">Mobile Number: 9800000000</p>
                            <p className="block underline text-lg text-gray-50 ">Email: eventify@gmail.com</p>
                            <p className="block underline text-lg text-gray-50 ">Address: Maitidevi, Kathmandu, Nepal</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-[50.19rem] justify-start items-center">
                        <p className="block underline text-xs text-gray-50 ">Eventify</p>
                        <div className="flex flex-row gap-[18.75rem] justify-start items-center">
                            <p className="block underline text-xs text-gray-50 ">Terms of Services</p>
                            <p className="block underline text-xs text-gray-50 ">Privacy Policy</p>
                        </div>
                    </div>
                    <p className="block text-xs text-gray-50 ">Copyright © 2023, House of Job</p>
                    <img className="block" src="./assets/image-84047.79785587672.png"
                    />
                </div>
            </div>
        </div>
    </body>

    </>
  )
}

export default CreateEvent