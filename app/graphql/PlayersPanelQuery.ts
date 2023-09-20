query PlayersPanel_Query($searchString: String!, $searchString2: String!) {
  fixtures(where: { clubFixtures: { some : {
    OR: [
            { club: { is: { name: { contains : $searchString, mode: insensitive }}}},
         { club: { is: { name: { contains : $searchString2, mode: insensitive }}}},

          ]
  } }}) {
    id
  }
}