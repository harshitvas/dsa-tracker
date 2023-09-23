import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "@mui/material/Checkbox";
import ChartRepresentation from "./ChartRepresentation";
import client from "../sanity/client";
// import ProgressBar from "./ProgressBar";
import ProgressBar from "@ramonak/react-progress-bar";
import Confetti from "react-confetti";

const Dashboard = () => {
  const LOCAL_STORAGE_KEY = "dsa-tracker";
  const [data, setData] = useState([]);
  const [openSections, setOpenSections] = useState([]);
  const [questionDone, setQuestionDone] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
  const [showCongratulations, setShowCongratulations] = useState(false);

  // Initialize selectedCheckboxes based on questionDone
  const initialSelectedCheckboxes = {};
  questionDone.forEach((questionId) => {
    initialSelectedCheckboxes[questionId] = true;
  });

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    initialSelectedCheckboxes
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await client.fetch(`*[_type == "weekwise"]`);
      setData(res);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(questionDone));
  }, [questionDone]);

  useEffect(() => {
    sortedWeeks.forEach((weeknumber) => {
      const isCurrentWeek = openSections.includes(weeknumber);
      if (isCurrentWeek) {
        const allWeekQuestionsCompleted = groupedQuestions[weeknumber].every(
          (question) => selectedCheckboxes[`${question._id}`]
        );

        if (allWeekQuestionsCompleted) {
          setShowCongratulations(true);
          setTimeout(() => {
            setShowCongratulations(false);
          }, 2300);
        }
      }
    });
  }, [selectedCheckboxes]);

  const groupedQuestions = data.reduce((acc, question) => {
    const weeknumber = question.weeknumber;
    if (!acc[weeknumber]) {
      acc[weeknumber] = [];
    }
    acc[weeknumber].push(question);
    return acc;
  }, {});

  const sortedWeeks = Object.keys(groupedQuestions).sort((a, b) => {
    const weekA = parseInt(groupedQuestions[a][0].weeknumber.substring(5), 10);
    const weekB = parseInt(groupedQuestions[b][0].weeknumber.substring(5), 10);
    return weekA - weekB;
    // console.log("hello", groupedQuestions[a][0].weeknumber);
  });

  // console.log("sortedWeeks:", sortedWeeks);
  // console.log("groupedQuestions:", groupedQuestions);

  const toggleAccordion = (weeknumber) => {
    if (openSections.includes(weeknumber)) {
      setOpenSections((prevOpenSections) =>
        prevOpenSections.filter((item) => item !== weeknumber)
      );
    } else {
      setOpenSections((prevOpenSections) => [...prevOpenSections, weeknumber]);
    }
  };

  const toggleCheckbox = (weeknumber, questionSlug) => {
    const questionId = `${questionSlug}`;
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      const updatedSelectedCheckboxes = { ...prevSelectedCheckboxes };

      if (updatedSelectedCheckboxes[questionId]) {
        delete updatedSelectedCheckboxes[questionId];
        setQuestionDone((prevQuestionDone) =>
          prevQuestionDone.filter((id) => id !== questionId)
        );
      } else {
        updatedSelectedCheckboxes[questionId] = true;
        setQuestionDone((prevQuestionDone) => [
          ...prevQuestionDone,
          questionId,
        ]);
      }

      return updatedSelectedCheckboxes;
    });
  };

  return (
    <div className="text-white mt-10 flex flex-col">
      {showCongratulations && (
        <div className="bg-green-500 text-2xl md:text-4xl text-white fixed top-0 left-0 right-0 p-16 z-10 text-center">
          <Confetti />
          <span className="block lg:inline">🎉🎉</span>Congratulations on
          completing all questions of the week!
          <span className="block lg:inline">🎉🎉</span>
        </div>
      )}
      <div className="block lg:hidden w-full px-10">
        <div className="w-full flex flex-col space-y-5">
          <h1 className="text-xl md:text-2xl">Questions Status</h1>
          <ProgressBar
            completed={Number(((questionDone.length / 169) * 100).toFixed(1))}
            bgColor="#EF4444"
          />
        </div>
      </div>
      <div className="text-white mt-10 flex flex-row">
        <div className="w-full lg:w-1/2 px-10 space-y-5">
          {/* {console.log(questionDone)} */}
          {sortedWeeks.map((weeknumber) => (
            <div key={weeknumber}>
              <div>
                <h1
                  onClick={() => toggleAccordion(weeknumber)}
                  className="cursor-pointer text-xl md:text-2xl border pl-4 font-bold py-1 border-red-500 flex flex-col sm:flex-row justify-between items-center"
                >
                  {`${weeknumber}`}
                  {openSections.includes(weeknumber) ? (
                    <div className="text-sm flex items-center">
                      <ProgressBar
                        bgColor="#EF4444"
                        completed={Number(
                          (
                            (groupedQuestions[weeknumber].filter(
                              (question) =>
                                selectedCheckboxes[`${question._id}`]
                            ).length /
                              groupedQuestions[weeknumber].length) *
                            100
                          ).toFixed(1)
                        )}
                        height={"15px"}
                        width={"200px"}
                        borderRadius={"5px"}
                      />
                      <KeyboardArrowUpIcon />
                    </div>
                  ) : (
                    <div className="text-sm flex items-center">
                      <ProgressBar
                        bgColor="#EF4444"
                        completed={Number(
                          (
                            (groupedQuestions[weeknumber].filter(
                              (question) =>
                                selectedCheckboxes[`${question._id}`]
                            ).length /
                              groupedQuestions[weeknumber].length) *
                            100
                          ).toFixed(1)
                        )}
                        height={"15px"}
                        width={"200px"}
                        borderRadius={"5px"}
                      />
                      <KeyboardArrowDownIcon />
                    </div>
                  )}
                </h1>
              </div>
              {openSections.includes(weeknumber) ? (
                <div className="mt-2 border-2 border-red-500 text-lg divide-y-2 divide-red-500">
                  {groupedQuestions[weeknumber].map((question) => (
                    <div className="flex flex-row pl-2 py-1" key={question._id}>
                      <div>
                        <Checkbox
                          checked={
                            selectedCheckboxes[`${question._id}`] === true
                          }
                          onChange={() =>
                            toggleCheckbox(weeknumber, question._id)
                          }
                          style={{
                            color: "#3da9fc",
                          }}
                        />
                        <Link
                          to={question.questionlink}
                          target="_blank"
                          className="hover:text-blue-400"
                        >
                          {question.questionname}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="w-0 lg:w-1/2 hidden lg:block">
          <ChartRepresentation
            data={[questionDone.length, 169 - questionDone.length]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
