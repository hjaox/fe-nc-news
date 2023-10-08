import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getAllTopics } from "../lib/axios";
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

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

        window.addEventListener('click', e => {
            if(Object.values(e.target.classList).filter(item => !['topicsBar', 'topicsBar__dropdown', 'selectedTopic'].includes(item)).length) {
                setShowTopicsMenu(showTopicsMenu => false)
            }
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
                        <span key={i} className="topic__item" onClick={() => handleTopic(topic)}>
                            {topic}
                        </span>
                    )
                })
            }
            </>
        )
    }

    return (
        <div className="topicsBarWrapper">
        <section
        className={showTopicsMenu ? 'topicsBar--expanded' : 'topicsBar'}
        onClick={() => handleShowTopicsMenu()}>

        <div className="topicsBar__dropdown" >
            <span className="selectedTopic">
                Topic: {selectedTopic}
            </span>
            {
                showTopicsMenu ? (
                    <AiFillCaretUp/>
                ) : (
                    <AiFillCaretDown/>
                )
            }
        </div>
            {
                showTopicsMenu && (
                    <div className="topicsBar__dropdown__menu">
                    {displayAllTopics(allTopics)}
                    </div>
                    )
            }
        </section>
        </div>
    )
}