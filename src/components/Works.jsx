import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../style";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import axios from "axios";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => (
  // <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
    <div>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="rounded-full items-center cursor-pointer black-gradient w-10 h-10 flex justify-center"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px] ">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag} className={`text-[14px] `}>
              {" "}
              #{tag}
            </p>
          ))}
        </div>
      </Tilt>

    </div>
  // </motion.div>
);
const Works = () => {
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    setLoading(true)
    const ProjectsData = async () => {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/projects/`
      );
      try {
        setProjects(response.data);
        setLoading(false)
        console.log(response.data);
      } catch (err) {
        setProjects(response.data.message)
        setLoading(false)
      }
    };
    ProjectsData();
  }, []);
  return (
    <>
      {/* <motion.div variants={textVariant()}> */}
        <div>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects</h2>

        </div>
      {/* </motion.div> */}
      <div className="w-full flex">
        {/* <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        > */}
        <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          Building Projects is one thing and building awesome and beautiful projects is another. Some of my projects both Local and real life projects. I've also had the priviledge to work with awesome team members developing and delivering on this projects.

        </p>
        {/* </motion.p> */}
      </div>
      {loading ? (
          <div className="spinner-border spinner-border-sm mt-20 flex flex-wrap gap-7" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
      ) : (
      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={project.id} {...project} />
        ))}
      </div>
      )}
    </>
  );
};

export default SectionWrapper(Works, "");
