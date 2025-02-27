"use client"

import { useState } from "react"
import Navbar from "./Navbar"
import SmartBanner from "./SmartBanner"

export const MainWrapper = ({ children }) => {
  const [isBannerVisible, setIsBannerVisible] = useState(true)

  return (
    <>
      <SmartBanner onVisibilityChange={setIsBannerVisible} />
      <Navbar />
      <main className={`${isBannerVisible ? "pt-20 md:pt-0" : ""}`}>
        {children}
      </main>
    </>
  )
}

export default MainWrapper
