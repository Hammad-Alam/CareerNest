import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import JobsTable from "../components/JobsTable";
import AddJob from "../components/AddJob";
import UpdateJob from "../components/UpdateJob";

function AdminJobs(props) {
  // State to manage form visibility
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [jobId, setJobId] = useState(null);

  // Reset progress bar after loading
  useEffect(() => {
    props.setProgress(100);
    const timer = setTimeout(() => {
      props.setProgress(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, [props.setProgress]);

  // Callback for form submission
  const handleFormSubmission = () => {
    setIsFormOpen(false);
    setShowUpdateForm(false);
  };

  return (
    <>
      {/* Add job button */}
      <div className="mr-auto -mt-14 md:mr-0 md:ml-auto md:mt-10 my-5">
        {!isFormOpen && !showUpdateForm ? (
          <Button text={"Add Jobs"} onClick={() => setIsFormOpen(true)} />
        ) : (
          ""
        )}
      </div>

      {/* Conditional rendering of job table, add job form, or update job form */}
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
