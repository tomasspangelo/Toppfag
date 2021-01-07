import React, { useEffect, useRef } from "react";
// import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
// import ToggleButton from "react-bootstrap/ToggleButton";
// import ButtonToolbar from "react-bootstrap/ButtonToolbar";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

const SemesterButtonGroup = ({ gradeData, setSemester }) => {
  let semesters = useRef([]);

  useEffect(() => {
    for (let i = 0; i < gradeData.length; i++) {
      semesters.current[i] = gradeData[i].semester_code;
    }
  }, [gradeData, semesters]);

  return (
    //     <ToggleButtonGroup
    //       vertical
    //       type="radio"
    //       name="semesters"
    //       value={semester}
    //       onChange={(val) => setSemester(val)}
    //     >
    //       {semesters.current.map((semester) => {
    //         return (
    //           <ToggleButton key={semester} value={semester}>
    //             {semester}
    //           </ToggleButton>
    //         );
    //       })}
    //     </ToggleButtonGroup>
    <Form style={{ width: "7rem" }}>
      <Form.Group controlId="SemesterSelect1">
        <Form.Label>Velg semester</Form.Label>
        <Form.Control as="select" onChange={(e) => setSemester(e.target.value)}>
          {semesters.current.map((semester) => {
            return <option key={semester}>{semester}</option>;
          })}
        </Form.Control>
      </Form.Group>
    </Form>
  );
};
export default SemesterButtonGroup;
