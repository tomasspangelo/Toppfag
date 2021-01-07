import React from "react";
import Card from "react-bootstrap/Card";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import RangeSlider from "react-bootstrap-range-slider";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

const SearchMenu = ({
  setQuery,
  numPages,
  setNumPages,
  semester,
  setSemester,
}) => {
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Header>Valg</Card.Header>
      <Card.Body>
        <Form
          onKeyDown={(e) => {
            if (e.keyIdentifier === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <FormControl
            type="text"
            placeholder="Søk..."
            className="mr-sm-2"
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form>
        <br />
        <b>Antall treff per side</b>
        <RangeSlider
          value={numPages}
          onChange={(changeEvent) => setNumPages(changeEvent.target.value)}
          min={1}
          max={50}
        />
        {/* <br />
                  <b>Studienivå</b>
                  <Form.Control as="select" defaultValue="Alle">
                    <option>Alle</option>
                    <option>Grunnleggende emner, nivå 1</option>
                    <option>Videregående emner, nivå 2</option>
                    <option>Tredjeårsemner, nivå 3</option>
                    <option>Høyere grads nivå (masternivå)</option>
                  </Form.Control> */}
        <br />
        <ToggleButtonGroup
          type="radio"
          name="options"
          defaultValue={1}
          value={semester}
          onChange={(val) => setSemester(val)}
        >
          <ToggleButton value={"Begge"}>Begge</ToggleButton>
          <ToggleButton value={"Vår"}>Vår</ToggleButton>
          <ToggleButton value={"Høst"}>Høst</ToggleButton>
        </ToggleButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default SearchMenu;
