import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

function useRegister(){
    return useMutation({
        mutationFn: ({ username, email, password }) =>
            apiClient.post('/auth/register', { username, email, password})
    });
};

function useVerifyOtp(){
    return useMutation({
        mutationFn: ({email, otp}) => 
            apiClient.post('/auth/verify-otp', { email, otp})
    })
}

function useLogin(){
    return useMutation({
        mutationFn: ({ email, password}) =>
            apiClient.post('/auth/login', { email, password})
    });
};


function useLogout(){
    return useMutation({
        mutationFn: () => apiClient.post('/auth/logout', {})
    })
};


function useForgetPassword(){
    return useMutation({
        mutationFn: ({ email}) => 
            apiClient.post("/auth/forget-password", { email})
    })
};

function useResetPassword(){
    return useMutation({
        mutationFn: ({ email, otp, newPassword, confirmPassword }) =>
            apiClient.post("/auth/reset-password", {
                email,
                otp,
                newPassword,
                confirmPassword
            })
    });
};

function useGetUserProfile(){
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: () => apiClient.get("/auth/user")
    })
};



export { 
    useRegister, 
    useVerifyOtp, 
    useLogin, 
    useLogout, 
    useForgetPassword, 
    useResetPassword, 
    useGetUserProfile
}