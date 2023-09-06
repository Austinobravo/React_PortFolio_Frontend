import React, {useEffect,useState} from 'react'
import { SectionWrapper } from '../hoc'
// import { technologies } from '../constants'
import {BallCanvas} from './canvas'
import axios from 'axios'
const Tech = () => {
  const [loading, setLoading] = useState(false)
  const [technologies, setTechnology] = useState([]);
  useEffect(() => {
    setLoading(true)
    const TechData = async () => {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/technology/`
      );
      try {
        setTechnology(response.data);
        setLoading(false)
        // console.log(response.data);
      } catch (err) {
        setTechnology(response.data.message)
        setLoading(false)
      }
    };
    TechData();
  }, [])
  return (
    <>
    {loading ? (
      <div className="spinner-border spinner-border-sm mt-20 flex flex-wrap gap-7" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

    ):(
      <div className='flex flex-row flex-wrap justify-center gap-10'>
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
              <BallCanvas icon={technology.icon}/>
          </div>
        ))}
        </div>

    )}
    </>
  )
}

export default SectionWrapper(Tech, "")