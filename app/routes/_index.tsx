import type { V2_MetaFunction } from "@remix-run/node";
import Stack from 'react-bootstrap/Stack';

import Button from 'react-bootstrap/Button';


export const meta: V2_MetaFunction = () => {
  return [
    { title: "Home - Eyeum" },
    { name: "description", content: "Welcome to Eyum!" },
  ];
};

export default function Index() {

  return (
    <Stack direction="horizontal" gap={2}>
    <Button as="a" variant="primary" href="positionalRatings">
      Positional & Individual Ratings
    </Button>
    <Button as="a" variant="success" href="tournamentStats">
      Tournament Stats
    </Button>
    <Button as="a" variant="success" href="matchStats">
      Match Stats
    </Button>
  </Stack>
  );
}
