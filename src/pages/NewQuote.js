import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import QuoteForm from '../components/quotes/QuoteForm'
import useHttp from '../hooks/use-http'
import { addQuote } from '../lib/api'

const NewQuote = () => {

    const {sendRequest, status} =useHttp(addQuote);

    const hist=useHistory();

    useEffect(() => {
        if(status==='completed'){
            hist.push('/quotes')
        }
    }, [status,hist])

    const addQuoteHandler = (quoteData) => {
        sendRequest(quoteData)
        hist.push('/quotes')
    }


return <QuoteForm isLoading={status==='pending'} onAddQuote={addQuoteHandler}></QuoteForm>
};
export default NewQuote;