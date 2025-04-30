import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

function SubscriptionList() {
    const [subscriptions, setSubscriptions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useSate(null)

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/subscriptions')
        .then((response) => response.json())
        .then((data) => setSubscriptions(data))
        .catch((error) => console.error("Error fetching subscriptions:", error));
    }, [])

    return (
        <section>
            <h1>🐉The Jasmine Dragon🐉</h1>
            <h2>🫖Tea Subscriptions🫖</h2>
            {subscriptions.map((sub) => (
                <div key={sub.id} style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}>
                    <h3>🍵{sub.attributes.title} 🍵</h3>
                    <p>Status: {sub.attributes.status} </p> {/* do we really want this here? Status should be for each individual customer, not for the whole page? */}
                    <p>Frequency: {sub.attributes.frequency} </p>
                    <Link to={`/subscriptions/${sub.id}`}>
                        <button>View Details</button> {/* Would also like to have it so that you click on the photo to take you to the subscription, not an actual button */}
                    </Link>
                </div>
            ))}
        </section>
    )
}