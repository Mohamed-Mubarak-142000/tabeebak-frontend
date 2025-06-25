// components/skeletons/doctor-details-skeleton.tsx
import { Grid, Skeleton, Stack } from "@mui/material";

const DoctorDetailsSkeleton = () => {
  return (
    <>
      {/* صورة الدكتور */}
      <Grid item xs={12} md={6} lg={4}>
        <Skeleton variant="rectangular" width="100%" height={250} />
      </Grid>

      {/* معلومات الدكتور */}
      <Grid item xs={12} md={6} lg={8}>
        <Stack spacing={2}>
          <Skeleton variant="text" width="50%" height={40} />
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="text" width="70%" height={30} />
          <Skeleton variant="text" width="50%" height={30} />
          <Skeleton variant="text" width="100%" height={80} />
        </Stack>
      </Grid>
    </>
  );
};

export default DoctorDetailsSkeleton;
