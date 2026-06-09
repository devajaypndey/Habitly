import { QueryClient } from "@tanstack/react-query";


const queryClient = new QueryClient({

    defaultOptions: {

        queries: {
            staleTime: 1000 * 60 * 5, // 5 min
            retry: 1,
            refetchOnWindowFocus: false
        },

        mutations: {
            retry: 1
        },

    },

});

export {queryClient}