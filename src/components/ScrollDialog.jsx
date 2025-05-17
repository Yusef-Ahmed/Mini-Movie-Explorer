import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useMovie } from "../modules/movies/movies.hooks";
import CloseIcon from "@mui/icons-material/Close";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import {
  CircularProgress,
  Rating,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { forwardRef } from "react";

export default function ScrollDialog({ id, openDialog, setOpenDialog }) {
  const { data, isPending } = useMovie(id);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpenDialog(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDialog]);

  const Transition = forwardRef(function Transition(props, ref) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        }}
        exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
        {...props}
        className="w-full h-full outline-none"
      />
    );
  });

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          style: {
            maxWidth: isMobile ? "90%" : "70%",
            backgroundColor: "#1c1c1c",
            color: "azure",
          },
        }}
        TransitionComponent={Transition}
        keepMounted
      >
        {isPending ? (
          <DialogContent dividers={true} className="w-[70vw] h-[50vh]">
            <CircularProgress
              size="5rem"
              className="absolute left-1/2 top-1/2 translate-[-50%]"
            />
          </DialogContent>
        ) : (
          <>
            <div className="flex justify-between items-center mt-4">
              <p className="text-2xl font-bold ml-6 truncate">{data.title}</p>
              <DialogActions>
                <CloseIcon
                  onClick={handleClose}
                  className="cursor-pointer mx-4"
                />
              </DialogActions>
            </div>
            <DialogContent dividers={true}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
                className="flex flex-col md:flex-row gap-10 justify-between"
              >
                <img
                  className="mx-auto"
                  src={
                    "https://image.tmdb.org/t/p/w220_and_h330_face" +
                    data.poster_path
                  }
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "../assets/alt-image.png";
                  }}
                />
                <section className="text-gray-300 text-lg flex flex-col gap-4">
                  <div>
                    <p className="font-semibold text-cyan-100">Description:</p>
                    <p>{data.overview}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="font-semibold text-cyan-100">Release Date:</p>
                    <p>{data.release_date}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="font-semibold text-cyan-100">Rating:</p>
                    <Rating
                      name="read-only"
                      size={isMobile ? "medium" : "large"}
                      value={data.vote_average}
                      max={10}
                      precision={0.1}
                      readOnly
                      sx={{
                        "& .MuiRating-iconEmpty": {
                          color: "#d1d5dc",
                        },
                      }}
                    />
                  </div>
                </section>
              </DialogContentText>
            </DialogContent>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
}
