import { supabase } from "@/lib/supabase";


export async function POST(
request: Request
){

const body =
await request.json();


const {
name,
phone,
partySize
}=body;



const {data:restaurant} =
await supabase
.from("restaurants")
.select("*")
.eq(
"name",
"Bliss Caffeine Bar"
)
.single();



if(!restaurant){

return Response.json(
{
error:"Restaurant not found"
},
{
status:400
}
);

}



const {data,error} =
await supabase
.from("waitlist")
.insert({

restaurant_id:
restaurant.id,

guest_name:
name,

phone,

party_size:
partySize,

status:
"waiting"

})
.select()
.single();



if(error){

return Response.json(
{
error:error.message
},
{
status:500
}
);

}



return Response.json({
waitlist:data
});


}
