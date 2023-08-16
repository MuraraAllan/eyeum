import { useQuery } from "@apollo/client";

import { PLAYER_POSITIONAL_ATTRIBS_QUERY } from "~/graphql/Player";
export function useFindPlayerPositionalAttributes(searchString : string) {

  const data = useQuery(PLAYER_POSITIONAL_ATTRIBS_QUERY, { variables : {
    searchString
  } });
  

  return data

}