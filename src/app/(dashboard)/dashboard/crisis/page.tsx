"use client"

import AdminCrisisForm from '@/components/adminPage/adminCrisisForm'
import AdminCrisisTable from '@/components/adminPage/adminCrisisTable'
import ArticleSelect from '@/components/adminPage/demoTable'
import { AllCrisisData, NVCrisisApi } from '@/model/admin/apiCall'
import { CrisisDataModelAdmin } from '@/model/dataInterfaces'
import React, { useEffect } from 'react'

const Crisis = () => {
  const data = NVCrisisApi()
  const dataWithID = AllCrisisData()

  useEffect(() => {}, [data])

  return (
    <section>
      <div className="scroll-m-5 pt-5 flex flex-col justify-center gap-10 pr-8 pl-8 pb-20">
      <div className="">
      <AdminCrisisTable  data={AllCrisisData()} />
    </div>
    <div className="">
      <AdminCrisisForm />
    </div>
      </div>
    </section>
  )
}

export default Crisis