"use client";

import { useState } from "react";


export default function FloorPlan({
tables
}:{
tables:any[]
}){


const [selected,setSelected] =
useState<any>(null);



function statusColor(status:string){

switch(status){

case "reserved":
return "bg-blue-200";

case "seated":
return "bg-red-200";

case "cleaning":
return "bg-yellow-200";

default:
return "bg-green-200";

}

}



return (

<div className="grid grid-cols-4 gap-4">


{
tables.map((table)=>(

<button

key={table.id}

onClick={()=>
setSelected(table)
}

className={`
border rounded-lg p-5
${statusColor(table.status)}
`}

>

<div className="font-bold">

{table.table_name}

</div>


<div>

{table.seats} seats

</div>


</button>

))

}


{
selected && (

<div className="
fixed bottom-5 right-5
bg-white border shadow
p-5 rounded
">

<h2 className="font-bold">

{selected.table_name}

</h2>


<p>
Seats:
{selected.seats}
</p>


<button

className="
mt-3 border p-2 rounded
"

>

Change Status

</button>


</div>

)

}


</div>

);

}
