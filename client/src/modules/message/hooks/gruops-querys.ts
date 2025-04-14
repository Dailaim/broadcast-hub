import { useQuery } from '@tanstack/react-query';
import { groupService } from '../services/groups';


export const useGetGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: () => groupService.getAll(),
  });
};