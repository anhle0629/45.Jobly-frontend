import React, {useState} from "react";

//search widget
//appear on CompanyList and Job to filter job and company
// * This component doesn't *do* the searching, but it renders the search
// * form and calls the `searchFor` function prop that runs in a parent to do the
// * searching.

function SearchForm({searchFor}){
    console.debug("SearchForm", "searchFor=", typeof searchFor);

    const [searchTerm, setSearchTerm] = useState("")

    //tell parent to filter//
    function handleSubmitt(evt){
        // take care of accidentally trying to search for just spaces
        evt.preventDefault()
        searchFor(searchTerm.trim() || undefined)
        setSearchTerm(searchTerm.trim())
    }

    //Update form Fields//
    function handlecChange(evt){
        setSearchTerm(evt.target.value)
    }

    return(
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmitt}>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    name="searchTerm"
                    placeholder="Enter search term.."
                    value={searchTerm}
                    onChange={handlecChange}
                />
                <button type="submit" className="btn btn-lg btn-primary"
                >
                Submit
                </button>
            </form>
        </div>
    )
}

export default SearchForm