import { Box } from "@mui/material";
import { videos } from "../../assets/videos";
import AppointmentBooking from "./appointment-booking";
import ShowVideo from "../show-video";

const ShowVideoAndAppointmentBooking = ({ doctorId }: { doctorId: string }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        },
        gap: 3,
      }}
    >
      <ShowVideo video={videos.intro} />
      <AppointmentBooking doctorId={doctorId} />
    </Box>
  );
};

export default ShowVideoAndAppointmentBooking;
