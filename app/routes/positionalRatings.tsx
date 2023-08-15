import type { V2_MetaFunction } from "@remix-run/node";
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useState } from "react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Home - Eyeum" },
    { name: "description", content: "Welcome to Eyum!" },
  ];
};

export default function Index() {
  const [teamName, setTeamName] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can perform actions with the form data, like sending it to an API or processing it.
    console.log('Team Name:', teamName);
    console.log('Player Name:', playerName);
  };

  return (
    <Container>
      <h2 className="mb-4">Player Positional Rating</h2> {/* Title */}
      <Stack direction="horizontal"  gap={3}>
        <Form.Group controlId="teamName">
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            className="me-auto"
            type="text"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </Form.Group>
        <div className="vr" />

        <Form.Group controlId="playerName">
          <Form.Label>Player Name</Form.Label>
          <Form.Control
            type="text"
            className="me-auto"
            placeholder="Enter player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-auto" variant="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </Container>
  );
}
