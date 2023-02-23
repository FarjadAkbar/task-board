import { Code } from "@mui/icons-material";
import { database } from "platform/initFirebase";
import { Tasks } from "./types";


const dbInstance = database.collection("tasks");

// Fetch
export async function fetch(
  props: Tasks.FetchAPIPayload,
): Promise<Tasks.FetchResponse> {
  const { docs } = await dbInstance.get();
  const data  = docs.map((item) => item.data())
  console.log('dATAATATTA', data)
  return data;
}


// Detail
export async function detail(props: Tasks.DetailAPIPayload): Promise<any> {
  const result = await dbInstance.doc(`${props.id}`).get();
  // const data  = data.map((item) => item.data())
  return result.data();
}


// Create
export async function create(props: Tasks.CreateAPIPayload): Promise<any> {
  const { id } = await dbInstance.add({
    ...props.data,
    created: new Date().toISOString(),
  });
  return id;
}



// Detail
export async function reference(props: Tasks.DetailAPIPayload): Promise<any> {
  const data = await dbInstance.where('status', '==', `tasks-status/ ${props.id}`).get();
  return data.docs;
}



// Remove
export async function remove(
  props: Tasks.RemoveAPIPayload,
): Promise<Tasks.RemoveResponse> {
  const data = await dbInstance.doc(`${props.id}`).delete();
  return true;
}

// Update
export async function update(
  props: Tasks.UpdateAPIPayload,
): Promise<Tasks.UpdateResponse> {
  const data = await dbInstance.doc(`${props.id}`).update({
    ...props.data,
  });

  return true;
}