import { Box, Stack, Typography } from "@mui/material";
import { Iconify } from "../iconify";
import { useTranslate } from "../../locales";
import { useGetAvailableSlotsForPatient } from "../../apis/use-case/doctor/get-available-slots";
import AvailableSlotsSkeleton from "../skeletons/available-slot";

const AvailableSlotsDoctor = ({ id }: { id: string }) => {
  const { t } = useTranslate("appointment");
  const { data: availableSlots, isPending: isPendingAvailableSlots } =
    useGetAvailableSlotsForPatient({
      id: id || "",
      showAll: false,
    });

  if (isPendingAvailableSlots) {
    return <AvailableSlotsSkeleton />;
  }

  if (!availableSlots || !availableSlots?.slots?.length) {
    return (
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Typography variant="body1">{t("availableSlots.noSlots")}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(6, 1fr)",
        },
        gap: 2,
      }}
    >
      {availableSlots?.slots?.map((slot) => (
        <Stack
          spacing={1}
          alignItems={"center"}
          sx={{
            padding: 2,
            backgroundColor: (theme) => theme.palette.primary.light,
            borderRadius: 1,
          }}
        >
          <Iconify icon="noto-v1:alarm-clock" width={60} />

          <Stack
            spacing={1}
            sx={{ width: "100%" }}
            alignItems={"start"}
            justifyContent={"start"}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6">
                {t("availableSlots.dayLabel")}
              </Typography>
              <Typography variant="body1">{slot.day}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6">
                {t("availableSlots.startTimeLabel")}
              </Typography>
              <Typography variant="body1">{slot.startTime}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6">
                {t("availableSlots.endTimeLabel")}
              </Typography>
              <Typography variant="body1">{slot.endTime}</Typography>
            </Box>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
};

export default AvailableSlotsDoctor;
