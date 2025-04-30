import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SubscriptionDetails.css"

function SubscriptionDetails() {
    const { id } = useParams()
    const [subscriptions, setSubscriptions] = useState(null)
    const [included, setIncluded] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/subscriptions/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setSubscriptions(data.data)
            setIncluded(data.included || [])
            setLoading(false)
          })
          .catch((error) => {
            setError(error)
            setLoading(false)
          })
      }, [id])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <section className="sub-details">
            <h1>🐉The Jasmine Dragon🐉</h1>
            <Link to="/">
                <button>Home</button>
            </Link>
            <h2>🫖 {subscriptions.attributes.title} 🫖</h2>
            <p>Customers: {subscriptions.attributes.customer_name}</p>
            <p>Frequency: {subscriptions.attributes.frequency} </p>
            <h3>Teas in this box:</h3>
            <ul>
            {subscriptions.relationships.teas.data.map((teaRef) => {
                const tea = included.find((item) => item.type === "tea" && item.id === teaRef.id)
                if (!tea) return null

                return (
                <div key={tea.id}>
                    <strong>{tea.attributes.title}</strong>: {tea.attributes.description}
                </div>
                )
            })}
            </ul>
        </section>
    )
}

export default SubscriptionDetails