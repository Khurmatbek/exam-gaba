import { fetchUsers } from "@/functions/fetchUsers";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (page: number, limit: number, searchQuery: string) => {
  return useQuery({
    queryKey: ["users", page, limit, searchQuery],
    queryFn: () => fetchUsers(page, limit, searchQuery),
    placeholderData: (prev) => prev,
    staleTime: 5000,
  });
};
