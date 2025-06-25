import { Box, Skeleton, Stack } from "@mui/material";

const SpecialitySliderSkeleton = () => {
  return (
    <Stack direction="row" spacing={2} sx={{ overflowX: "auto", py: 2 }}>
      {[...Array(6)].map((_, index) => (
        <Box key={index} sx={{ minWidth: 120 }}>
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
        </Box>
      ))}
    </Stack>
  );
};

export default SpecialitySliderSkeleton;
