import React from 'react'
import { useState, useEffect } from 'react'
import JoblyApi from '../api'
import CompanyCard from './CompanyCard'
import LoadingSpinner from '../Common/LoadingSpinner'

//showing a list of companies
// props: companies name, description, maybe photo
// state: filter the comapanie

function CompanyList () {
    console.debug("CompanyList")

    const [companies, setCompanies] = useState(null)

    useEffect( function getCompaniesOnMount(){
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search()
    }, [])

    async function search(name) {
        let companies = await JoblyApi.getComapnies(name);
        setCompanies(companies)
    }

    if(!companies) return <LoadingSpinner />

    return(
        <div className="CompanyList col-md-8 offset-md-2">
        <SearchForm searchFor={search} />
        {companies.length
            ? (
                <div className="CompanyList-list">
                  {companies.map(c => (
                      <CompanyCard
                          key={c.handle}
                          handle={c.handle}
                          name={c.name}
                          description={c.description}
                          logoUrl={c.logoUrl}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}           
        </div>
    )
}

export default CompanyList
