export const authConfig = {
    providers:[],
    pages: {
        signIn: '/Login',
    },
    callbacks: {
        authorized({auth,request}:any){
            const isLoggedIn = auth?.user;
            const isOnDashboard = request.nextUrl.pathname.startsWith('/Dashboard');
            const isOnHome = request.nextUrl.pathname.startsWith('/Stream');

            if (isOnDashboard || isOnHome) {
                if(isLoggedIn) return true;
                return false
            }else if (isLoggedIn) {
                return Response.redirect(new URL('/Stream', request.nextUrl))
            }

            return true
        }
    }
}

