import React from 'react'
import {motion} from 'framer-motion'
import { styles } from '../style'
import { ComputersCanvas } from './canvas'
import { cover } from '../assets'

const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915eff]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>
        <div >
          <div className='flex '>
          <h1 className={`${styles.heroHeadText} leading-none`}>Hi, I'm <span className='cursor-pointer text-[#915eff]'>Austine Ebogu </span></h1>
          <img src={cover} className='w-[100px]  lg:h-[100px] lg:ml-3 h-[120px] sm:h-[180px] object-cover hover:object-scale-down focus:object-fill cursor-pointer rounded-full'/>
          </div>
          <p className={`${styles.heroSubText} text-white-100 mt-2 `}>
            I'm a Full Stack Developer with a good knowledge of Data Structures and Algorithms, also I build 3D Web Applications.
          </p>

        </div>
      </div>
      <ComputersCanvas/>
      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div animate={{y: [0,24,0]}} transition={{ duration:1.5, repeat: Infinity, repeatType: 'loop'}} className="w-3 h-3 rounded-full bg-secondary mb-1"/>
          </div>
        </a>

      </div>
    </section>
  )
}

export default Hero