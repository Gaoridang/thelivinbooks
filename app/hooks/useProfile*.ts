import { useQuery } from "@tanstack/react-query";

export const useProfile = (userId: string) => {
  const {} = useQuery({
    queryKey: ["profile", userId],
  });
};
