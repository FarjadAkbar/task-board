import { database } from "platform/initFirebase";
import { TasksStatus } from "./types";


const dbInstance = database.collection("tasks-status");

// Fetch
export async function fetch(
  props: TasksStatus.FetchAPIPayload,
): Promise<TasksStatus.FetchResponse> {
  const { docs } = await dbInstance.get();
  // const data  = docs.map((item) => item.data())
  // return data;
  console.log(docs,'dataaaaaaaaaa')
  return docs;
}


// Create
export async function create(props: TasksStatus.CreateAPIPayload): Promise<any> {
  const { id } = await dbInstance.add({
    ...props.data,
    created: new Date().toISOString(),
  });
  return id;
}