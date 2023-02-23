import {
  UseQueryResult,
  useQuery,
  UseMutationResult,
  useQueryClient,
  useMutation,
} from "react-query";
import * as api from "./api";
import { Tasks } from "./types";

const KEY = "Tasks";

export function getKeyFromProps(
  props: any,
  type: "Tasks" | "Reference" | "DETAIL",
): string[] {
  const key = [KEY, type];
  key.push(props);
  return key;
}

// Fetch
export function useTasks(
  props: Tasks.FetchProps = {},
): UseQueryResult<Tasks.FetchResponse> {
  return useQuery(KEY, () => api.fetch(props), {});
}

// Detail
export function useTaskDetail(
  props: Tasks.DetailProps,
): UseQueryResult<Tasks.DetailResponse> {
  return useQuery(getKeyFromProps(props, "DETAIL"), () => api.detail(props));
}


// Refrence
export function useTaskRefrence(
  props: Tasks.DetailProps,
): UseQueryResult<Tasks.DetailResponse> {
  return useQuery(getKeyFromProps(props, "Reference"), () => api.reference(props));
}

//Create
export function useCreateTask(props: Tasks.CreateProps = {}): UseMutationResult<
  Tasks.CreateResponse,
  {
    message?: string;
  },
  Tasks.CreateMutationPayload
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


// Remove
export function useRemoveTask(
  props: Tasks.RemoveProps = {},
): UseMutationResult<
  Tasks.RemoveResponse,
  {
    message?: string;
  },
  Tasks.RemoveMutationPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.remove(payload), {
    mutationKey: `${KEY}|Remove`,
    onSuccess: () => {
      queryClient.invalidateQueries(KEY);
    },
    retry: 0,
  });
}

// Update
export function useUpdateTask(
  props: Tasks.UpdateProps,
): UseMutationResult<
  Tasks.UpdateResponse,
  {
    message?: string;
  },
  Tasks.UpdateMutationPayload
> {
  const queryClient = useQueryClient();
  return useMutation((payload) => api.update({ ...props, data: payload }), {
    mutationKey: `${KEY}|Update`,

    onSuccess: () => {
      queryClient.invalidateQueries(KEY);
    },

    retry: 0,
  });
}