import {
  UseQueryResult,
  useQuery,
  UseMutationResult,
  useQueryClient,
  useMutation,
} from "react-query";
import * as api from "./api";
import { TasksStatus } from "./types";

const KEY = "TasksStatus";

// Fetch
export function useTaskStatus(
  props: TasksStatus.FetchProps = {},
): UseQueryResult<TasksStatus.FetchResponse> {
  return useQuery(KEY, () => api.fetch(props), {});
}

//Create
export function useCreateTaskStatus(
  props: TasksStatus.CreateProps = {},
): UseMutationResult<
  TasksStatus.CreateResponse,
  {
    message?: string;
  },
  TasksStatus.CreateMutationPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.create({ ...props, data: payload }), {
    mutationKey: `${KEY}|Create`,
    onSuccess: () => {
      queryClient.invalidateQueries(KEY);
    },
    retry: 0,
  });
}
