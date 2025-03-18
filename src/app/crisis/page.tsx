"use client"

import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../convex/_generated/api';

const Crisis = () => {
  const crisis = useQuery(api.tasks.GetTasksData);
  console.log(crisis);

  return (
    <section>
        <div className="flex">Crisis</div>
    </section>
  )
}

export default Crisis