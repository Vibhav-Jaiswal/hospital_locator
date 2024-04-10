import React, { useState } from 'react'

const Locator = () => {
  return (
    <div className="flex p-3">
  <div className="flex flex-1/5 flex-col">
    <h1 className="text-3xl text-center font-semibold my-7">
      See Hospitals near by your location
    </h1>
    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
      See Hospitals
    </button>
  </div>
  <div className="flex flex-4/5">
  </div>
</div>
  )
}

export default Locator