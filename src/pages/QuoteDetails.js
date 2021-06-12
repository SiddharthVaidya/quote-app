import React, {Fragment, useEffect} from 'react'
import { useParams, Route, Link , useRouteMatch} from 'react-router-dom'
import Comments from '../components/comments/Comments'
import HighloghtedQuote from '../components/quotes/HighlightedQuote'
import useHttp from '../hooks/use-http'
import {getSingleQuote} from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'



const QuoteDetails = () => {
    const match=useRouteMatch();
    const params = useParams();
    const {quoteId}=params;
    
    const {sendRequest, status, data: loadedQuotes, error}= useHttp(getSingleQuote,true)
    
    useEffect(() => {
        sendRequest(quoteId)
    }, [sendRequest,quoteId])

    if(status=== 'pending'){
        return(
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        )
    }
    if(error){
        return(
            <p className='centered focussed'>{error}</p>
        )
    }


    if(!loadedQuotes.text){
        return <p>NOt Found</p>
    }
    
    return (
            <Fragment>
                <HighloghtedQuote text={loadedQuotes.text} author={loadedQuotes.author}/>
                <Route path= {`${match.path}`} exact>
                <div className='centered'>
                    <Link className= 'btn--flat' to={`${match.url}/comment`}>
                        Load Comments</Link>
                </div>
                </Route>
                
                <Route path= {`${match.path}/comment`}>
                    <Comments/>
                </Route>
            </Fragment>
            )
            };
            export default QuoteDetails;