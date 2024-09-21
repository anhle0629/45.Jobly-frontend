import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";

//show information about a job posting

//it rendered by Joblist to show a card for each job

//JobList ->

function JobCard({id, title, salary, equity, companyName}){
    console.debug("JobCard")

    const{hasAppliedToJob, applyToJob} = useContext()
    const [applied, setApplied] = useState()

    React.useEffect(function updatedAppliedStatus(){
        console.log("JobCard useEffect updateAppliedStatus", "id=", id)

        setApplied(hasAppliedToJob(id))
    },[id, hasAppliedToJob])

    //apply for a job//

    async function handleApply(evt) {
        if(hasAppliedToJob(id)) return
        applyToJob(id)
        setApplied(true)
    }

    return(
        <div className="JobCard card">{applied}
            <div className="card-Body">
                <h6 className="card-title">{title}</h6>
                <p>{companyName}</p>
                {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
                {equity !== undefined && <div><small>Eqauity: {equity}</small></div>}
            </div>
        </div>
    )
}

function formatSalary(salary){
    const digitsRev = []
    const salaryStr = salary.toString();

    for (let i = salaryStr.length - 1; i>=0; i--){
        digitsRev.push(salaryStr[i])
        if(i>0 && i%3 === 0) return digitsRev.push(",")
    }

    return digitsRev.reverse().join("")
}

export default JobCard