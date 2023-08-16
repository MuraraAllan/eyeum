import { gql } from "@apollo/client";

export const PLAYER_POSITIONAL_ATTRIBS_QUERY = gql`
query PlayersPanel_Query($searchString: String!) {
  players(
    where: {
      AND: [
        {
          OR: [
            { club: { is: { name: { contains : $searchString, mode: insensitive }}}},
            { firstName: { contains: $searchString, mode: insensitive } },
            { lastName: { contains: $searchString, mode: insensitive } },
            { fullName: { contains: $searchString, mode: insensitive } }
          ]
        },
        { isReserve: { equals: false } }
      ]
    }
    take: 40
    orderBy: { overallRating: desc }
  ) {
    id
    ...PlayerCard_Fragment
    __typename
  }
}

fragment PlayerCard_Fragment on Player {
  id
  firstName
  lastName
  fullName
  overallRating
  rarity
  preferredPosition
  playerAttributes(orderBy: [{ timestamp: desc }], take: 1) {
    preferredPosition
    playerAttributesPositionalRating(take: 15, orderBy: { position : desc }) {
      position
      type
      positionalRating
    }
  }
 
  __typename
}

`;