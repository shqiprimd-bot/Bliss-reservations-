"use client";

import { useState } from "react";


export default function Waitlist(){

const [guest,setGuest] =
useState({
name:"",
phone:"",
partySize:2
});


const [message,setMessage] =
useState("");



async function addGuest(){

const response =
await fetch(
"/api/waitlist",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:
JSON.stringify(guest)
}
);


const result =
await response.json();


if(result.error){

setMessage(result.error);

return;

}


setMessage(
"Guest added to waitlist"
);


}



return (

<div className="border rounded p-5">

<h2 className="text-xl font-bold mb-4">
Walk-In / Waitlist
</h2>


<input

className="border p-2 w-full mb-2"

placeholder="Guest name"

onChange={(e)=>
setGuest({
...guest,
name:e.target.value
})
}

/>


<input

className="border p-2 w-full mb-2"

placeholder="Phone"

onChange={(e)=>
setGuest({
...guest,
phone:e.target.value
})
}

/>


<select

className="border p-2 w-full mb-2"

onChange={(e)=>
setGuest({
...guest,
partySize:
Number(e.target.value)
})
}

>

<option value="2">
2 Guests
</option>

<option value="3">
3 Guests
</option>

<option value="4">
4 Guests
</option>

<option value="5">
5 Guests
</option>

<option value="6">
6 Guests
</option>


</select>


<button

className="bg-black text-white p-2 w-full"

onClick={addGuest}

>

Add to Waitlist

</button>


<p className="mt-3">
{message}
</p>


</div>

);

}
