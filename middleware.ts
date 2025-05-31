import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

   const user = 'k';

   if(!user) {
      return NextResponse.redirect(new URL('/login', request.url))
   }

   // if(request.nextUrl.pathname === '/chat'){
   //  return NextResponse.redirect(new URL('/chat', request.url))
   // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/chat/:path*', "/chat","/"],
}