// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "motion/react";
import { useRef } from "react";

function Card({ movie, handleClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5 }}
      ref={ref}
      onClick={() => handleClick(movie.id)}
      className="border cursor-pointer rounded-lg grow text-center flex flex-col gap-4 py-4 max-w-[270px]"
    >
      <h1 className="text-xl font-semibold truncate mx-5">{movie.title}</h1>
      <img
        className="px-3"
        src={
          "https://image.tmdb.org/t/p/w220_and_h330_face" + movie.poster_path
        }
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "../assets/alt-image.png";
        }}
        loading="lazy"
      />
      <p>
        <b>Release Date: </b>
        {movie.release_date}
      </p>
    </motion.div>
  );
}
export default Card;
