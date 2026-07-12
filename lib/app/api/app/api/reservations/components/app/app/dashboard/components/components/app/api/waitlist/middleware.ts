import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(
request: NextRequest
){

const path =
request.nextUrl.pathname;


const protectedRoutes = [
"/dashboard"
];


const requiresAuth =
protectedRoutes.some(
(route)=>
path.startsWith(route)
);


const session =
request.cookies.get(
"bliss-owner-session"
);



if(
requiresAuth &&
!session
){

return NextResponse.redirect(
new URL(
"/login",
request.url
)
);

}



return NextResponse.next();

}


export const config = {

matcher:[
"/dashboard/:path*"
]

};
