import { Box, Skeleton } from "@mui/material";

const TopDoctorsSkeleton = () => {
  return (
    <>
      {[...Array(10)].map((_, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: 2,
            p: 2,
            boxShadow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Skeleton variant="rounded" width={300} height={250} />
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={18} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={40}
            sx={{ mt: 1, borderRadius: 1 }}
          />
        </Box>
      ))}
    </>
  );
};

export default TopDoctorsSkeleton;
