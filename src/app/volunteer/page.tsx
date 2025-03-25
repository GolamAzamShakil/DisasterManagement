"use client"

import { useQuery } from 'convex/react'
import React, { useId } from 'react'
import { api } from '../../../convex/_generated/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { arrangeVolunteerData } from '@/model/arrangeVolunteerData';
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectContent } from '@radix-ui/react-select';


interface VolunteerVitalDataModel {
  id: number,
  userName: string,
  assignedTask: string,
  location: string | undefined,
  status: string
}
interface VolunteerFullDataModel extends VolunteerVitalDataModel {
  mobileNumber: number,
  email: string,
  age: number
}

const Volunteer = () => {
  const idV = useId();
  let extractedVolunteerData: VolunteerFullDataModel[]
  let finalData: VolunteerFullDataModel[] | undefined
  
  const volunteerData = useQuery(api.volunteer.GetVolunteerData);
  if(volunteerData !== undefined && typeof volunteerData === "object") {
    //InitialData(),
    extractedVolunteerData = volunteerData.map(
      ({id, userName, assignedTask, location, status, mobileNumber, email, age}) => ({id, userName, assignedTask, location, status, mobileNumber, email, age})
    );
    
    finalData = arrangeVolunteerData(extractedVolunteerData);
  }
  /* function extractedVolunteerData(source: VolunteerFullDataModel[] | undefined): VolunteerFullDataModel[] {
    let extractedVolunteerData;
    if(volunteerData !== undefined && typeof volunteerData === "object") {
      extractedVolunteerData = volunteerData.map(
        ({id, userName, assignedTask, location, status, mobileNumber, email, age}) => ({id, userName, assignedTask, location, status, mobileNumber, email, age})
      );
      
    }
    return extractedVolunteerData;
  } */

  function tableContent(): any {
    if(!finalData) {
      return (
        <TableRow>
          <TableCell rowSpan={3} colSpan={3}>Fetching and loading data.</TableCell>
        </TableRow>
      );
    }

    return (
      finalData.map((item, index) => {
        return (
          <TableRow key={index} className="">
            <TableCell className="capitalize">{item.id}</TableCell>
            <TableCell className="capitalize">{item.userName}</TableCell>
            <TableCell className="capitalize">{item.assignedTask}</TableCell>
            <TableCell className=" capitalize">{item.location}</TableCell>
            <TableCell className=" capitalize">{item.status}</TableCell>
            <TableCell className=" capitalize">
              <Select defaultValue="Email">
                <SelectTrigger id={idV} className="w-full bg-muted border-transparent shadow-none">
                  <SelectValue placeholder="Details"/>
                </SelectTrigger>
                <SelectContent className="w-full rounded-md bg-white/90 dark:bg-black/90">
                    <SelectItem value="Mobile Number">Mobile Number - {item.mobileNumber}</SelectItem>
                    <SelectItem value="Email">Email - {item.email}</SelectItem>
                    <SelectItem value="Age">Age - {item.age}</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        );
      })
    );
  }

  return (
    <section>
      <div className="scroll-m-2 mx-auto p-5 max-w-[95%]">
        <Card className="">
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent >
            <Table className="max-w[95%]">
              <TableHeader>
                <TableRow className="">
                  <TableHead className="max-w-[12%] capitalize">id</TableHead>
                  <TableHead className="max-w-[25%] capitalize">Volunteer Name</TableHead>
                  <TableHead className="max-w-[25%] capitalize">Assigned Task</TableHead>
                  <TableHead className="max-w-[15%] capitalize">Location</TableHead>
                  <TableHead className="max-w-[15%] capitalize">Status</TableHead>
                  <TableHead className="min-w-[25%] capitalize">Additional Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
                  {tableContent()}
                
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Volunteer