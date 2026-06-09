import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../apiClient"


const TASK_QUERY_KEY = ["tasks"]

// queries
export function useGetAllTasks(){
    return useQuery({
        queryKey: TASK_QUERY_KEY,
        queryFn: () => apiClient.get('/tasks/all-tasks')
    })
};


// mutation
export function useCreateTask(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ title, priority}) =>
            apiClient.post("/tasks/create-task", { title, priority}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEY})
        }
    })
}

export function useUpdateTask(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ taskId, title, priority, activity}) =>
            apiClient.put(`/tasks/update-task/${taskId}`, { title, priority, activity}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEY})
        },
    })
};


export function useDeleteTask(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ taskId}) => 
            apiClient.delete(`/tasks/delete-task/${taskId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TASK_QUERY_KEY})
        },
    })
};