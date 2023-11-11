import { NextResponse }  from "next/server";

export function middleware(request : any){
    const origin = request.headers.get('origin');
    console.log(origin);

    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers","Content-Type: Authorization");
    response.headers.set("Access-Control-Max-Age", "86499");

    console.log('Middleware!');
    console.log(request.method);
    console.log(request.url);

    return response;
}

export const config = {
    matcher: '/api/register',
    
}