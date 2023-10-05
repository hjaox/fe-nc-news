import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getAllTopics } from "../lib/axios";

export default function TopicsBar() {
    const [selectedTopic, setSelectedTopic] = useState('All');
    const [allTopics, setAllTopics] = useState([]);
    const [showTopicsMenu, setShowTopicsMenu] = useState(false)
    const nav = useNavigate();

    useEffect(() => {
        getAllTopics()
        .then(data => {
            const topics = data.map(topic => topic.slug)
            setAllTopics(allTopics => ['All', ...topics])
        })
        .catch((err) => {
            alert('Server Error in fetching topics')
        })
    },[])

    function handleTopic(topic) {
        setSelectedTopic(topic)
        nav(`/${topic}`)
    }

    function handleShowTopicsMenu() {
        setShowTopicsMenu(showTopicsMenu => !showTopicsMenu)
    }

    function displayAllTopics(topics) {
        return (
            <>
            {
                topics.map((topic, i) => {
                    return (
                        <span key={i} onClick={() => handleTopic(topic)}>
                            {topic}
                        </span>
                    )
                })
            }
            </>
        )
    }

    return (
        <>
        <div className="topicsBar__dropdown" onClick={() => handleShowTopicsMenu()}>
            <span className="selectedTopic">
                Topic: {selectedTopic}
            </span>
            <div className="topicsBar__dropdown__menu">
            {
                showTopicsMenu && (displayAllTopics(allTopics))
            }
            </div>
        </div>
        
        </>
    )
}