import React, { useEffect, useState } from "react";
import GradeBarChart from "./GradeBarChart";
import SemesterButtonGroup from "./SemesterButtonGroup";

const GradeStats = ({ courseCode, data }) => {
  const [semester, setSemester] = useState("");
  const [graphData, setGraphData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [isLetterGrade, setIsLetterGrade] = useState(true);

  const url = `https://grades.no/api/v2/courses/${courseCode}/grades/`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((newData) => {
        setGradeData(newData);
        setSemester(newData.length > 0 ? newData[0].semester_code : "");
        setIsLetterGrade(
          newData.length > 0 && newData[0].passed > 0 ? false : true
        );
      });
  }, [url]);

  useEffect(() => {
    setGraphData([]);
    if (gradeData.length !== 0) {
      let semesterData = gradeData.filter((s) => s.semester_code === semester);
      if (
        (semesterData.length > 0 && semesterData[0].passed > 0) ===
        isLetterGrade
      ) {
        setIsLetterGrade(
          semesterData.length > 0 && semesterData[0].passed > 0 ? false : true
        );
      }
      if (isLetterGrade) {
        setGraphData([
          {
            name: "A",
            antall: semesterData.length > 0 ? semesterData[0].a : 0,
          },
          {
            name: "B",
            antall: semesterData.length > 0 ? semesterData[0].b : 0,
          },
          {
            name: "C",
            antall: semesterData.length > 0 ? semesterData[0].c : 0,
          },
          {
            name: "D",
            antall: semesterData.length > 0 ? semesterData[0].d : 0,
          },
          {
            name: "E",
            antall: semesterData.length > 0 ? semesterData[0].e : 0,
          },
          {
            name: "F",
            antall: semesterData.length > 0 ? semesterData[0].f : 0,
          },
        ]);
      }
      if (!isLetterGrade) {
        setGraphData([
          {
            name: "Bestått",
            antall: semesterData.length > 0 ? semesterData[0].passed : 0,
          },
          {
            name: "Stryk",
            antall: semesterData.length > 0 ? semesterData[0].f : 0,
          },
        ]);
      }
    }
  }, [semester, gradeData, isLetterGrade]);

  return (
    <>
      <GradeBarChart graphData={graphData}></GradeBarChart>

      <SemesterButtonGroup
        gradeData={gradeData}
        setSemester={setSemester}
      ></SemesterButtonGroup>
    </>
  );
};

export default GradeStats;
