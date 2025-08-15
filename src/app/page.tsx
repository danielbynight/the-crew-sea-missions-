"use client"
import {useEffect, useState} from "react"
import MISSIONS from "@/data/missions";

export default function Home() {
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [missionLevel, setMissionLevel] = useState(0)
    const [availableMissions, setAvailableMissions] = useState<{ [key: number]: Array<string> }>({
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
    })
    const [mission, setMission] = useState('')

    const missionsByLevel: (level: number) => Array<string> = level =>
        MISSIONS.filter((
            data) =>
            data[numberOfPlayers as (3 | 4 | 5)] === level,
        ).map(item => item.mission)

    useEffect(() => {
        setAvailableMissions({
            1: missionsByLevel(1),
            2: missionsByLevel(2),
            3: missionsByLevel(3),
            4: missionsByLevel(4),
            5: missionsByLevel(5),
        })
    }, [numberOfPlayers])

    const generateMission = () => {
        const missionsData = MISSIONS.filter((
            data) =>
            data[numberOfPlayers as (3 | 4 | 5)] === missionLevel,
        )
        if (missionsData.length === 0) {
            setMission('No mission found for this dificulty level')
            return
        }
        const index = Math.floor(Math.random() * missionsData.length)
        const missionData = missionsData[index]
        setMission(missionData.mission)
    }

    const missionLevelBlock = <>
        <h1 className="text-4xl">Which mission level?</h1>
        <div className="flex">
            {[1, 2, 3, 4, 5].map(
                (option, index) =>
                    availableMissions[option].length > 0 ?
                        <button key={index}
                                className={`m-4 p-4 border-2 border-blue-400 cursor-pointer ${missionLevel === option ? 'bg-blue-300' : ''}`}
                                onClick={() => {
                                    if (missionLevel === option) {
                                        return
                                    }
                                    setMission('')
                                    setMissionLevel(option);
                                }}>{option}</button> :
                        null)}
        </div>
    </>

    const generatorButton =
        <button className="m-4 p-4 border-2 border-blue-400 text-xl cursor-pointer"
                onClick={generateMission}>Generate mission
        </button>

    const missionDisplay = <>
        <p className="text-3xl font-bold">{mission}</p>
        <button className="m-2 p-2 border-2 border-blue-400 text-m cursor-pointer" onClick={() => {
            setMissionLevel(0)
            setMission('')
        }}>reset
        </button>
    </>


    return <div
        className="font-sans items-center justify-items-center flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1 className="text-4xl">How many players?</h1>
        <div className="flex">
            {[3, 4, 5].map((option, index) => <button key={index}
                                                      className={`m-5 p-5 border-2 border-blue-400 cursor-pointer ${numberOfPlayers === option ? 'bg-blue-300' : ''}`}
                                                      onClick={() => {
                                                          if (numberOfPlayers === option) {
                                                              return
                                                          }
                                                          setMission('')
                                                          setNumberOfPlayers(option)
                                                      }}>{option}</button>)}
        </div>
        {numberOfPlayers > 0 ? missionLevelBlock : null}
        {numberOfPlayers > 0 && missionLevel > 0 && mission === '' ? generatorButton : null}
        {mission ? missionDisplay : null}
    </div>;
}
