import { Box, Button, Typography } from "@mui/material";
import { useTranslate } from "../../locales";

const ContactInfo = () => {
  const { t } = useTranslate("home");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        gap: { xs: 1, md: 2, lg: 3 },
        flexDirection: "column",
        width: "100%",
        height: "100%",
        p: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "common.white",
          fontSize: { xs: "1.5rem", md: "2rem", lg: "4rem" },
          fontWeight: (theme) => theme.typography.fontWeightBold,
          lineHeight: 1.2,
        }}
      >
        {t("booking_appointment.title")}
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 2,
          width: "fit-content",
          fontSize: { xs: "0.8rem", md: "1rem", lg: "1.2rem" },
          fontWeight: (theme) => theme.typography.fontWeightRegular,
          backgroundColor: "primary.main",
          color: "common.white",
          borderRadius: 5,
          textTransform: "capitalize",
          p: 2,
          "&:hover": {
            backgroundColor: "primary.dark",
            color: "common.white",
            boxShadow: "none",
          },
        }}
      >
        {t("booking_appointment.contact_us")}
      </Button>
    </Box>
  );
};

export default ContactInfo;
