"use client";

import { useState } from "react";


export default function BookingForm(){

const [message,setMessage] = useState("");

const [form,setForm] = useState({

name:"",
phone:"",
email:"",
partySize:2,
reservationTime:"",
notes:""

});


function update(
field:string,
value:any
){

setForm({
...form,
[field]:value
});

}



async function submitReservation(){

setMessage("Checking availability...");


const response =
await fetch(
"/api/reservations",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:
JSON.stringify(form)
}
);


const result =
await response.json();


if(result.error){

setMessage(result.error);

return;

}


setMessage(
`Confirmed! Your table is ${result.assignedTable}`
);


}



return (

<div className="max-w-md mx-auto p-6">

<h1 className="text-3xl font-bold mb-6">
Bliss Caffeine Bar
</h1>

<h2 className="text-xl mb-4">
Reserve a Table
</h2>


<input
className="border rounded p-3 w-full mb-3"
placeholder="Name"
onChange={(e)=>
update(
"name",
e.target.value
)}
/>


<input
className="border rounded p-3 w-full mb-3"
placeholder="Phone"
onChange={(e)=>
update(
"phone",
e.target.value
)}
/>


<input
className="border rounded p-3 w-full mb-3"
placeholder="Email"
onChange={(e)=>
update(
"email",
e.target.value
)}
/>



<select

className="border rounded p-3 w-full mb-3"

value={form.partySize}

onChange={(e)=>
update(
"partySize",
Number(e.target.value)
)}

>

<option value={2}>
2 Guests
</option>

<option value={3}>
3 Guests
</option>

<option value={4}>
4 Guests
</option>

<option value={5}>
5 Guests
</option>

<option value={6}>
6 Guests
</option>

</select>



<input

className="border rounded p-3 w-full mb-3"

type="datetime-local"

onChange={(e)=>
update(
"reservationTime",
e.target.value
)}

 />



<textarea

className="border rounded p-3 w-full mb-3"

placeholder="Notes or requests"

onChange={(e)=>
update(
"notes",
e.target.value
)}

 />



<button

className="bg-black text-white rounded p-3 w-full"

onClick={submitReservation}

>

Confirm Reservation

</button>


<p className="mt-4">
{message}
</p>


</div>

);

}
