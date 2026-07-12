"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Login(){

const router = useRouter();

const [email,setEmail] =
useState("");

const [message,setMessage] =
useState("");



async function login(){

const response =
await fetch(
"/api/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:
JSON.stringify({
email
})
}
);


const result =
await response.json();


if(result.error){

setMessage(result.error);

return;

}


router.push("/dashboard");

}



return (

<div className="
min-h-screen
flex
items-center
justify-center
">

<div className="border rounded p-6 w-96">

<h1 className="text-2xl font-bold mb-5">
Bliss Owner Login
</h1>


<input

className="border p-3 w-full mb-4"

placeholder="Owner email"

onChange={(e)=>
setEmail(e.target.value)
}

/>


<button

className="
bg-black
text-white
p-3
w-full
"

onClick={login}

>

Login

</button>


<p className="mt-3">
{message}
</p>


</div>

</div>

);

}
