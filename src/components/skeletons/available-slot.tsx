// components/skeletons/available-slots-skeleton.tsx
import { Skeleton, Stack, Box } from "@mui/material";

const AvailableSlotsSkeleton = () => {
  const items = Array.from({ length: 6 });

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
      {items.map((_, index) => (
        <Stack
          key={index}
          spacing={1}
          alignItems={"center"}
          sx={{
            padding: 2,
            backgroundColor: (theme) => theme.palette.grey[100],
            borderRadius: 1,
          }}
        >
          <Skeleton variant="circular" width={60} height={60} />

          <Stack spacing={1} sx={{ width: "100%" }}>
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
          </Stack>
        </Stack>
      ))}
    </Box>
  );
};

export default AvailableSlotsSkeleton;
