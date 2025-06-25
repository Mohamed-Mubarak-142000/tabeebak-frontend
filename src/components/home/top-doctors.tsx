import { Box, Stack } from "@mui/material";
import TitleSection from "../title-section";
import DoctorItem from "./doctor-card";
import { useTranslate } from "../../locales";
import { useNavigate } from "react-router-dom";
import { useGetAllDoctors } from "../../apis/use-case/doctor/get-all-doctors";
import TopDoctorsSkeleton from "../skeletons/doctor-card-skeleton";
import ButtonAction from "../button-action";
import { ErrorStateContent } from "../error-state-content";

const TopDoctors = () => {
  const { t } = useTranslate("home");
  const { data, isPending, isError } = useGetAllDoctors({
    limit: 8,
  });
  const navigate = useNavigate();
  const navigateToShowAll = () => {
    navigate("/doctors");
  };

  return (
    <Stack spacing={5}>
      <TitleSection
        title={t("top_doctors.title")}
        subTitle={t("top_doctors.description")}
        slotProps={{
          title: {
            variant: "h3",
            sx: {
              fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem" },
              fontWeight: (theme) => theme.typography.fontWeightBold,
            },
          },
          subTitle: {
            variant: "body1",
            sx: {
              textAlign: "center",
              fontSize: { xs: ".8rem", md: "1rem", lg: "1.2rem" },
              fontWeight: (theme) => theme.typography.fontWeightRegular,
            },
          },
        }}
      />

      {isError && (
        <ErrorStateContent
          icon="material-symbols:error-outline-rounded"
          title="خطأ"
          subtitle="حدث خطأ أثناء تحميل الموقع"
        />
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {isPending ? (
          <TopDoctorsSkeleton />
        ) : (
          data?.data.map((item, index) => (
            <DoctorItem doctor={item} key={index} />
          ))
        )}
      </Box>

      <ButtonAction
        title={t("top_doctors.view_all")}
        onClick={navigateToShowAll}
        slotProps={{
          button: {
            variant: "contained",
            size: "large",
            sx: {
              mx: "auto",
              mt: 5,
              borderRadius: 3,
              py: 1,
              px: 3,
              width: "fit-content",
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "common.white",
                transition: (theme) =>
                  theme.transitions.create(["background-color", "color"], {
                    duration: theme.transitions.duration.shortest,
                  }),
              },
            },
          },
          title: {
            variant: "h3",
            sx: {
              fontSize: { xs: "0.8rem", md: ".75rem", lg: "1rem" },
              fontWeight: (theme) => theme.typography.fontWeightBold,
              color: "common.white",
            },
          },
        }}
      />
    </Stack>
  );
};

export default TopDoctors;
