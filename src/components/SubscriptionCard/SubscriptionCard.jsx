import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import herbalTeaImg from "../../assets/herbal_tea.jpeg"
import blackTeaImg from "../../assets/black_tea.jpeg"
import greenTeaImg from "../../assets/green_tea.jpg"
import whiteTeaImg from "../../assets/white_tea.jpg"

function SubscriptionCard({ sub, onCancel }) {
    const teaImages = (title) => {
        if (title.includes("Black")) return blackTeaImg
        if (title.includes("Green")) return greenTeaImg
        if (title.includes("White")) return whiteTeaImg
        if (title.includes("Herbal")) return herbalTeaImg
    }

    return (
        <section>
            <div className="tea-subscriptions" key={sub.id} style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}>
                <h3>🍵{sub.attributes.title} 🍵</h3>
                <p>Status: {sub.attributes.status} </p>    
                <p>Price: ${sub.attributes.price} </p>
                <Link to={`/subscriptions/${sub.id}`}>
                    <img className="sub-img" src={teaImages(sub.attributes.title)} alt={`${sub.attributes.title} image`} />
                </Link>
                {sub.attributes.status === "active" && (
                    <button onClick={() => onCancel(sub.id)}>Cancel Subscription</button>
                )}
            </div>
        </section>
    )
}

export default SubscriptionCard