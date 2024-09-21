import React, {useState, useEffect} from "react";
import SearchForm from "../Common/SearchForm"
import LoadingSpinner from "../Common/LoadingSpinner"
import JoblyApi from "../api"

//show page with list of jobs
// on mount, loads jobs from API.
//re-load filtered jobs on submit form search form
//  JobList -> JobCardList -> JobCard
// This is routed to at /jobs

function JobList(){
    console.debug("JobList")

    const [jobs, setJobs] = useState(null)

    useEffect(function getAllJobsOnMount(){
        console.debug("JobList useEffect getAllJobsOnMount")
        SearchForm()
    }, [])

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title)
        setJobs(jobs)
    }

    if(!jobs) return <LoadingSpinner />

    return(
        <div className="JobList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {jobs.length
                ? <JobList jobs={jobs} />
                : <p className="lead">Sorry, no results were found!</p>
            }
        </div>

    )
}

export default JobList