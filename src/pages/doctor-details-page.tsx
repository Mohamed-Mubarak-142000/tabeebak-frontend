import { Box, Grid } from "@mui/material";
import { assets } from "../assets/assets_frontend/assets";
import { useParams } from "react-router-dom";
import { useGetDoctor } from "../apis/use-case/doctor/get-doctor";
import { EmptyStateContent } from "../components/empty-state-content";
import AvailableSlotsDoctor from "../components/doctor-details/available-slots";
import ShowVideoAndAppointmentBooking from "../components/doctor-details/show-video-appointment-booking";
import { PatientsComments } from "../components/doctor-details/comments";
import TitleSection from "../components/title-section";
import { useTranslate } from "../locales";
import DoctorDetailsInfo from "../components/doctor-details/doctor-info-details";
import DoctorDetailsSkeleton from "../components/skeletons/doctor-details";

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const { t } = useTranslate("appointment");
  const { data, isPending } = useGetDoctor(id || "", {
    enabled: !!id,
  });

  if (!id) {
    return (
      <EmptyStateContent
        title={t("doctorNotFound.title")}
        subtitle={t("doctorNotFound.subtitle")}
      />
    );
  }

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2, my: 5 }}>
        {isPending ? (
          <DoctorDetailsSkeleton />
        ) : (
          data && (
            <>
              <Grid item xs={12} md={6} lg={4}>
                <Box
                  component={"img"}
                  src={data?.data?.photo || assets.doc1}
                  alt="Doctor"
                  sx={{ width: "100%", height: "auto", borderRadius: 1 }}
                />
              </Grid>
              <DoctorDetailsInfo data={data?.data} />
            </>
          )
        )}
      </Grid>

      <TitleSection
        title={t("availableSlots.title")}
        subTitle={t("availableSlots.subtitle")}
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
              fontSize: { xs: ".5rem", md: ".75rem", lg: "1rem" },
              fontWeight: (theme) => theme.typography.fontWeightRegular,
            },
          },
        }}
      />
      <AvailableSlotsDoctor id={id} />
      <ShowVideoAndAppointmentBooking doctorId={id} />
      <PatientsComments doctorId={id} />
    </>
  );
};

export default DoctorDetailsPage;
