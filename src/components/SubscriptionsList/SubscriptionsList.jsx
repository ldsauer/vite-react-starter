import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import SubscriptionDetails from "../SubscriptionDetails/SubscriptionDetails";
import SubscriptionCard from "../SubscriptionCard/SubscriptionCard";
import "./SubscriptionsList.css"

function SubscriptionList() {
    const [subscriptions, setSubscriptions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        fetch('http://localhost:3000/api/v1/subscriptions')
        .then((response) => response.json())
        .then((data) => {
            setSubscriptions(data.data)
            setLoading(false)
        })
        .catch((error) => {
            setError(error)
            setLoading(false)
        })
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    function sortPrice() {
        const sorted = [...subscriptions].sort((a,b) => {
            return parseFloat(b.attributes.price) - parseFloat(a.attributes.price)
        })
        setSubscriptions(sorted)
    }

    function handleCancel(id) {
        fetch(`http://localhost:3000/api/v1/subscriptions/${id}/cancel`, {
            method: "PATCH"
        })
        .then((response) => response.json())
        .then((data) => {
            const updated = data.data
            setSubscriptions((prevSubs) =>
                prevSubs.map((sub) => 
                    sub.id === updated.id ? updated : sub
                )
            )
        })
        .catch((error) => {
            console.error("Error cancelling subscription:", error)
        })
    }

    return (
        <main>
            <header>
                <h1>🐉The Jasmine Dragon🐉</h1>
                <h2>🫖 Tea Subscriptions 🫖</h2>
                <button className="sort-button" onClick={sortPrice}>Sort by Price (High to Low)</button>
            </header>
            <div className="sub-list">
                {subscriptions.map((sub) => (
                    <SubscriptionCard
                    key={sub.id}
                    sub={sub}
                    onCancel={handleCancel}
                    />
                ))}
            </div>
        </main>
    )
}

export default SubscriptionList