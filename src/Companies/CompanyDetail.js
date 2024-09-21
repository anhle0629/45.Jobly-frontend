import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import JoblyApi from "../api"
import LoadingSpinner from "../Common/LoadingSpinner"

//props: job title, salary, equity, company name 
//state: moving apply to applied 

/** Company Detail page.
 *
 * Renders information about company, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyDetail -> JobCardList
 */


function CompanyDetail (){
    const {handle} = useParams();
    console.debug("CompanyDetail", 'handle=', handle)


    const [company, setCompany] = useState(null)

    useEffect(function getCompanyAndJobForUser(){
        async function getCompany(){
           setCompany( await JoblyApi.getCompany(handle))
        }

        getCompany()
    }, [handle])

    if(!company) return <LoadingSpinner />

    return(
        <div className='CompanyDetail col-md-8 offset-md-2'>
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            {/* <JobCardList jobs={company.jobs}/> */}
        </div>
    )
}

export default CompanyDetail
