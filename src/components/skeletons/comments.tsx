// components/skeletons/comment-list-skeleton.tsx
import { Avatar, Box, Skeleton, Stack, Divider } from "@mui/material";

const CommentListSkeleton = () => {
  const skeletons = Array.from({ length: 3 });

  return (
    <Box>
      {skeletons.map((_, index) => (
        <Box
          key={index}
          sx={{
            mb: 3,
            p: 3,
            borderRadius: 2,
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>

            <Box sx={{ flexGrow: 1 }}>
              <Skeleton width="40%" height={20} />
              <Skeleton width="30%" height={16} />
            </Box>

            <Skeleton width={80} height={20} />
          </Stack>

          <Skeleton variant="rectangular" height={40} width="100%" />

          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default CommentListSkeleton;
