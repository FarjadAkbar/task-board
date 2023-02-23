

export namespace TasksStatus {
  export type Item = {
    color: string;
    name: string;
  };

  // Fetch
  export type FetchProps = {};
  export type FetchResponse = {
    [key: string]: any;
  };
  export interface FetchAPIPayload extends FetchProps {}

  // Create
  export type CreateProps = {};
  export type CreateResponse = {
    data: Item;
  };
  export type CreateMutationPayload = {
    color: string;
    name: string;
  };
  export interface CreateAPIPayload extends CreateProps {
    data: CreateMutationPayload;
  }
}
