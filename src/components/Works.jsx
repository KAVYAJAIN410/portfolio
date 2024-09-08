import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import SectionWrapper from "../hoc/SectionWrapper";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  video, // Change from 'image' to 'video'
  source_code_link,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className='flex flex-col h-full bg-tertiary p-5 rounded-2xl'
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='flex flex-col h-full'
      >
        <div className='relative w-full h-[230px]'>
          {isLoading && (
            <div className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-2xl'>
              <div className='loader'>Loading...</div>
            </div>
          )}
          <video
            src={video} // Video source
            className={`w-full h-full object-cover rounded-2xl ${isLoading ? 'hidden' : 'block'}`}
            autoPlay // Autoplay the video
            loop // Loop the video
            muted // Mute the video
            playbackRate={1.5} // Increase playback speed to 1.5x
            onLoadedMetadata={(e) => {
              e.target.playbackRate = 1.5; // Ensure playback rate is set
              setIsLoading(false); // Hide loader once metadata is loaded
            }}
            onCanPlay={() => setIsLoading(false)} // Hide loader when video is ready to play
            onError={() => setIsLoading(false)} // Hide loader if there's an error
          />
          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5 flex-1'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()} id="work">
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
