import { Box } from "@mui/material";
import BookingAppointmentImage from "./booking-appointment-img";
import ContactInfo from "./contact-info";

const BookingAppointment = () => {
  return (
    <Box
      sx={{
        maxHeight: 500,
        backgroundColor: "primary.darker",
        width: "100%",
        mx: "auto",
        mt: 5,
        p: 2,
        borderRadius: 2,
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        },
        gap: 2,
        overflow: "hidden",
      }}
    >
      <ContactInfo />
      <BookingAppointmentImage />
    </Box>
  );
};

export default BookingAppointment;
