"use client"

import React, { useEffect, useId, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { DataTable } from '../ui/data-table'
import { ColumnStructure } from './columnStructure'
import { CrisisDataModel } from '@/model/dataInterfaces'
import { arrangeCrisisData, extractCrisisData } from '@/model/crisisDataProcess'



export function CrisisTable() {
  let crisisGeneralData: CrisisDataModel[] | undefined
  let crisisSeverityData: CrisisDataModel[] | undefined
  let crisisStatusData: CrisisDataModel[] | undefined
  let finalData: CrisisDataModel[] | undefined
  let select: string | undefined

  const idF = useId()
  const idFS = useId()
  const [selectShow, setSelectShow] = useState(false)
  const [data, setData] = useState(false)
  /* const [dataF, setDataF] = useState([
    {data: finalData, sss: false}
  ]) */

  const limit = 20
  const crisisGeneral = extractCrisisData(useQuery(api.crisis.FilterViewableCrisisData, {limit}))
  const crisisSeverity = extractCrisisData(useQuery(api.crisis.FilterSevereCrisisData, {limit}))
  const crisisStatus = extractCrisisData(useQuery(api.crisis.FilterStatusCrisisData, {limit}))
    //console.log(crisisGeneral)
   const DataG = arrangeCrisisData(crisisGeneral)
   const DataSe = arrangeCrisisData(crisisSeverity)
   const DataSt = arrangeCrisisData(crisisStatus)


    function dataView(value: string): CrisisDataModel[] | undefined {
        let Data: CrisisDataModel[] | undefined
        if (value === "Severity") {
            setSelectShow(true)
            Data = arrangeCrisisData(crisisSeverity);
            console.log(Data)
            //setDataF([{data: finalData, sss:true}])
        }
        else if (value === "All") {
            setSelectShow(false)
            Data = arrangeCrisisData(crisisGeneral);
            console.log(Data)
            //setDataF([{data: finalData, sss:false}])
        }
        console.log(Data)
        return Data;
    }


    function tableContent(source: CrisisDataModel[] | undefined): any {
        console.log(finalData)
        if(!source) {
            return (
              <TableRow>
                <TableCell rowSpan={3} colSpan={3}>Fetching and loading data.</TableCell>
              </TableRow>
            );
        }

        return source.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell className="capitalize">{item.title}</TableCell>
                    <TableCell className="capitalize">{item.location}</TableCell>
                    <TableCell className="capitalize">{item.severity}</TableCell>
                    <TableCell className="capitalize">{item.status}</TableCell>
                </TableRow>
            );
        });
    }


  return (
    <div className="min-w[95%]">
        <Card className="min-w-[90%]">
            <CardHeader>
                <CardTitle>
                    <div className="flex flex-row justify-items-start items-center gap-3.5">
                        <p className="">Filter - </p>
                        <Select defaultValue="All" onValueChange={(value: string) => {
                            //selectVal(value);
                            if (value === "All") {
                                select = value
                                tableContent(DataG);
                                console.log(DataG)
                            }
                            if (value === "Severity") {
                                select = value
                                tableContent(DataSe);
                                console.log(DataSe)
                            }
                        }}>
                            <SelectTrigger id={idF} className="bg-muted border-transparent shadow-none">
                                <SelectValue placeholder ="Field" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All" className="capitalize">All Data</SelectItem>
                                <SelectItem value="Severity" className="capitalize">Severity</SelectItem>
                            </SelectContent>
                        </Select>
                        {selectShow && 
                        <Select defaultValue="1" onValueChange={(value: string) => {}}>
                            <SelectTrigger id={idFS} className="bg-muted border-transparent shadow-none">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1" className="capitalize">Phase One</SelectItem>
                                <SelectItem value="2" className="capitalize">Phase Two</SelectItem>
                                <SelectItem value="3" className="capitalize">Phase Three</SelectItem>
                            </SelectContent>
                        </Select>}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="max-w[95%]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[25%]">Title</TableHead>
                            <TableHead className="min-w-[25%]">Location</TableHead>
                            <TableHead className="min-w-[15%]">Severity</TableHead>
                            <TableHead className="min-w-[15%]">Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {tableContent(DataG)}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        {/* <DataTable columns={ColumnStructure} data={finalData} /> */}
    </div>
  )
}



export default CrisisTable