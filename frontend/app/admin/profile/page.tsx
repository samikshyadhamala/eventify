import Link from 'next/link'
import React from 'react'

const ClubProfile = () => {
  return (
    <>
        <div className="d-flex p-3">
            <div className="div col-md-5 col-sm-12 flex-wrap">
                <div className="img">
                    <img src="" alt="profile.pic" className='rounded-circle w-10 ' />
                </div>
                <div className="club-detail">
                    <h3>Club name</h3>
                    <div>description Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ratione nesciunt a sequi corrupti vel totam nihil eaque aliquam nemo voluptatum aspernatur maxime earum amet modi, sapiente autem sint distinctio.
                    </div>
                    <button><Link href="./signup">Logout</Link></button>
                </div>
            </div>
            <div className="div col-md-7 col-sm-12 flex-wrap">
                <div className="joined-event">
                    <div className="event1">
                        <h3>Event History</h3>
                        <div className="event1">
                            <img src="" alt="event image" className="w-10" />
                            <p>Event name</p>
                        </div>
                    </div>
                </div>
                <div className="upcomming">
                    <div className="event1">
                        <h3>Upcomming Event</h3>
                        <div className="event1">
                            <img src="" alt="event image" className="w-10" />
                            <p>Event name</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ClubProfile