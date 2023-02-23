

export namespace Tasks {
  export type Item = {
    title: string;
    text: string;
    status: any;
  };

  // Fetch
  export type FetchProps = {};
  export type FetchResponse = {
    [key: string]: any;
  };
  export interface FetchAPIPayload extends FetchProps {}

   // Detail
   export type DetailProps = {
    id: string | null;
  };
  export type DetailResponse = {
    [key:string]: any;
  };
  export interface DetailAPIPayload extends DetailProps {}


  // Create
  export type CreateProps = {};
  export type CreateResponse = {
    data: Item;
  };
  export type CreateMutationPayload = {
    title: string;
    text: string;
    status: any;
  };
  export interface CreateAPIPayload extends CreateProps {
    data: CreateMutationPayload;
  }


   // Remove
   export type RemoveProps = {};
   export type RemoveResponse = {};
   export type RemoveMutationPayload = {
     id: string;
   };
   export interface RemoveAPIPayload extends RemoveMutationPayload {}


   
  //Update
  export type UpdateProps = {
    id: string;
  };
  export type UpdateResponse = {};
  export type UpdateMutationPayload = {
    title: string;
    text: string;
    status: any;
  };
  export interface UpdateAPIPayload extends UpdateProps {
    data: UpdateMutationPayload;
  }
}

