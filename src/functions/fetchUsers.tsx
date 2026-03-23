import apiClient from '@/settings/axios';
import { UsersResponse } from '@/types/types';

export const fetchUsers = async (page: number, limit: number, searchQuery: string): Promise<UsersResponse> => {
  const skip = (page - 1) * limit;
  const { data } = await apiClient.get<UsersResponse>('/users', {
    params: { limit, skip },
  });

  if (searchQuery.trim()) {
    const { data } = await apiClient.get<UsersResponse>('/users/search', {
      params: { q: searchQuery },
    });

    const paginated = data.users.slice(skip, skip + limit);
    return { ...data, users: paginated };
  }

  return data;
};
