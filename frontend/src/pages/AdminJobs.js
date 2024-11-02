import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import JobsTable from "../components/JobsTable";
import AddJob from "../components/AddJob";
import UpdateJob from "../components/UpdateJob";

function AdminJobs(props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [jobId, setJobId] = useState(null);

  useEffect(() => {
    props.setProgress(100);
    const timer = setTimeout(() => {
      props.setProgress(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, [props.setProgress]);

  const handleFormSubmission = () => {
    setIsFormOpen(false);
    setShowUpdateForm(false);
  };

  return (
    <>
      <div className="mr-auto -mt-14 md:mr-0 md:ml-auto md:mt-10 my-5">
        {!isFormOpen && !showUpdateForm ? (
          <Button text={"Add Jobs"} onClick={() => setIsFormOpen(true)} />
        ) : (
          ""
        )}
      </div>
      {showUpdateForm ? (
        <UpdateJob
          handleFormSubmission={handleFormSubmission}
          jobId={jobId}
          setShowUpdateForm={setShowUpdateForm}
        />
      ) : !isFormOpen ? (
        <JobsTable
          setIsFormOpen={setIsFormOpen}
          setShowUpdateForm={setShowUpdateForm}
          setJobId={setJobId}
        />
      ) : (
        <AddJob handleFormSubmission={handleFormSubmission} />
      )}
    </>
  );
}

export default AdminJobs;
