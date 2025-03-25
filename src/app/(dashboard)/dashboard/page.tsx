"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { NVCrisisApi } from '@/model/admin/apiCall'
import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
  let NVCrisisLength: number | undefined
  NVCrisisLength = NVCrisisApi().length;

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-center gap-3">

        <Card className="min-w-[25%] max-w-[30%]">
          <CardContent>
            <p className="capitalize font-medium">There's total {NVCrisisLength} Not-viewable crises data</p>
          </CardContent>
          <CardFooter className="flex flex-row justify-end">
          <Button asChild>
              <Link href="/dashboard/crisis">Crisis</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="min-w-[25%] max-w-[30%]">
          <CardContent>
          <p className="capitalize font-medium">Create and edit volunteer data.</p>
          </CardContent>
          <CardFooter className="flex flex-row justify-end">
          <Button asChild>
              <Link href="/dashboard/volunteer">Volunteer</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="min-w-[25%] max-w-[30%]">
          <CardContent>
          <p className="capitalize font-medium">Manage inventory data.</p>
          </CardContent>
          <CardFooter className="flex flex-row justify-end">
            <Button asChild>
              <Link href="/dashboard/inventory">Inventory</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-row items-center justify-center gap-3"></div>
    </div>
  )
}

export default Dashboard