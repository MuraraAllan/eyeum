import type { V2_MetaFunction } from "@remix-run/node";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useMemo, useState } from "react";
import { Badge, Col, Row, Spinner, Stack } from "react-bootstrap";
import { useFindPlayerPositionalAttributes } from "~/hooks/PlayerHooks";
import { BasicTable } from "~/components/BasicTable";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Home - Eyeum" },
    { name: "description", content: "Welcome to Eyum!" },
  ];
};

export default function Index() {
  const [teamName, setTeamName] = useState('');
  const [playerName, setPlayerName] = useState('');
  
  const searchString = useMemo(() => {
    if (teamName.length > 0) return teamName 
    if (playerName.length > 0) return playerName
    return "Sam Cox"
  }, [teamName, playerName])

  const data = useFindPlayerPositionalAttributes(searchString)
  console.log('it is', data)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can perform actions with the form data, like sending it to an API or processing it.
    console.log('Team Name:', teamName);
    console.log('Player Name:', playerName);
  };
  
  return (
    <Stack gap={5} direction="vertical" className="justify-content-md-center align-items-center">
      <h2 className="mb-4">Player Positional Rating</h2> {/* Title */}
      <Row>
        <Form.Label>Team Name</Form.Label>
          <Form.Control
            className="me-auto"
            type="text"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => {
              setPlayerName('')
              setTeamName(e.target.value)
            }}
          />
        <Form.Label>Player Name</Form.Label>
          <Form.Control
            type="text"
            className="me-auto"
            placeholder="Enter player name"
            value={playerName}
            onChange={(e) => {
              setTeamName('')  
              setPlayerName(e.target.value)
            }}
          />
      </Row>
      <Row  className="justify-content-center">
        { data.loading ?
          <>
            <span  className="text-center">Loading...</span>
            <Spinner animation="border" role="status">
            </Spinner>
          </> 
          : <>
            {data.data?.players.length > 0 ? 
              <>
                <h3> Results for : {searchString} </h3>
                <h5> Total : {data.data?.players.length} </h5>
                <BasicTable data={data.data?.players ?? []} />
              </>
            : null}
          </>
        }
      </Row>
     
    </Stack>
  );
}
