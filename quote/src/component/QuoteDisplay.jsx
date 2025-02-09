import { useState, useEffect } from "react";
import './QuoteDisplay.css';

const QuoteDisplay = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [error, setError] = useState(null);

    const fetchQuote = async () => {
        setError(null);
        try {
            const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
                headers: { 'X-Api-Key': import.meta.env.VITE_API_KEY },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch quote");
            }
            const data = await response.json();
            setQuote(data[0].quote);
            setAuthor(data[0].author);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="quote-container">
            <div className="quote-card">
                {error ? (
                    <p className="error-text">{error}</p>
                ) : (
                    <>
                        <p className="quote-text">{quote}</p>
                        <p className="author-text">- {author}</p>
                    </>
                )}
                <button className="quote-button" onClick={fetchQuote}>New Quote</button>
            </div>
        </div>
    );
};

export default QuoteDisplay;
