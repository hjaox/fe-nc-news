import { useEffect, useState } from "react"
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function TopicsBar() {
    const [selectedTopic, setSelectedTopic] = useState('All');
    const [topicsArr, setTopicsArr] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        axios.get('https://nc-news-ee7w.onrender.com/api/topics')
        .then(({data}) => {
            const topics = data.map(topic => topic.slug)
            handleTopicsDisplay(topics)
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
        nav(`/articles/${topic}`)
    }


    return (
        <>
            <Dropdown>
                <Dropdown.Toggle>
                    {selectedTopic}
                </Dropdown.Toggle>
        
                <Dropdown.Menu className="topics-dropdown-menu">
                    <Dropdown.Item key="topic-All" onClick={() => handleTopic('All')}>
                        All
                    </Dropdown.Item>
                    {topicsArr}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}