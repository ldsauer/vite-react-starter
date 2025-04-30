import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SubscriptionList from '../SubscriptionsList/SubscriptionsList'
import SubscriptionDetails from '../SubscriptionDetails/SubscriptionDetails'
import './App.css'

function App() {
    return (
    <div>
      <Routes>
        <Route path="/" element={<SubscriptionList />} />
        <Route path={"/subscriptions/:id"} element={<SubscriptionDetails />} />
      </Routes>
    </div>
  )
}

export default App
