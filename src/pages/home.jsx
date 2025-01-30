import React from 'react'
import Header from '../components/header'
import SpecialityMenu from '../components/specialityMenu'
import TopDoctors from '../components/topDoct'
import Banner from '../components/banner'

function Home() {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home