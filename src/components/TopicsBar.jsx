import { useEffect, useState } from "react"
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'
import { getAllTopics } from "./DisplayRoutes/axios";

export default function TopicsBar() {
    const [selectedTopic, setSelectedTopic] = useState('All');
    const [topicsArr, setTopicsArr] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        getAllTopics()
        .then(data => {
            const topics = data.map(topic => topic.slug)
            handleTopicsDisplay(topics)
        })
        .catch((err) => {
            alert('Server Error in fetching topics')
        })
    },[])

    function handleTopicsDisplay(topics) {
        setTopicsArr(topics.map(topic => {
            return (
                <Dropdown.Item key={`topic-${topic}`} onClick={() => handleTopic(topic)}>
                    {topic}
                </Dropdown.Item>
            )
        }))
    }

    function handleTopic(topic) {
        setSelectedTopic(topic)
        nav(`/${topic}`)
    }


    return (
        <Dropdown>
            <Dropdown.Toggle>
                Topic:{selectedTopic}
            </Dropdown.Toggle>
    
            <Dropdown.Menu className="topics-dropdown-menu">
                <Dropdown.Item key="topic-All" onClick={() => handleTopic('All')}>
                    All
                </Dropdown.Item>
                {topicsArr}
            </Dropdown.Menu>
        </Dropdown>
    )
}