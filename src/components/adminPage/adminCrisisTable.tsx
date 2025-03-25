"use client"

import { CrisisDataModelAdmin, CrisisDataModelWithID } from '@/model/dataInterfaces'
import React, { useId } from 'react'
import { DataTable } from '../ui/data-table'
import { ColumnStructure } from '../crisisPage/columnStructure'
import { ColumnStructureA } from './columnStructureA'

function AdminCrisisTable ({data} : {data : CrisisDataModelWithID[]}) {
    const idT = useId()
    const length: number = data.length;

    function firstWord() {
        /* if (!length) {
            return "There's no data to view yet"
        } */
        if (length === 1 ) {
            return `Total ${length} crisis is pending to view`
        }
        if (length > 1) {
            return `Total ${length} crises are pending to view`
        }
        return "..Loading.."
    }

    return (
        <div className="mx-auto">
            <h3 className="text-center font-medium capitalize">{firstWord()}</h3>
            <DataTable columns={ColumnStructureA} data={data} />
        </div>
    )
}

export default AdminCrisisTable