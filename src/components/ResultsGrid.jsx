import React from 'react'
import Result from './Result';

const ResultsGrid = ({ results }) => {
    return (
        <section className="results">
            {results.map((result,i) => 
                {return (<Result key={i} result={ result }/>)}
            )}
        </section>
    )
}

export default ResultsGrid
