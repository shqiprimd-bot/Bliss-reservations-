import { supabase } from "@/lib/supabase";


export async function PATCH(
request: Request
){

const {
id,
status
} = await request.json();


const allowedStatuses = [
"confirmed",
"seated",
"completed",
"cancelled",
"no-show"
];


if(
!allowedStatuses.includes(status)
){

return Response.json(
{
error:"Invalid status"
},
{
status:400
}
);

}



const {data,error} =
await supabase
.from("reservations")
.update({
status
})
.eq(
"id",
id
)
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
reservation:data
});

}
