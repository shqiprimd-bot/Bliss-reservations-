import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";


export async function POST(
request: Request
){

const { email } =
await request.json();



const {data,error} =
await supabase
.from("owner_users")
.select("*")
.eq(
"email",
email
)
.single();



if(error || !data){

return NextResponse.json(
{
error:"Access denied"
},
{
status:401
}
);

}



const response =
NextResponse.json({
success:true
});



response.cookies.set(
"bliss-owner-session",
data.id,
{
httpOnly:true,
secure:true,
sameSite:"strict",
maxAge:60*60*24*7
}
);



return response;

}
