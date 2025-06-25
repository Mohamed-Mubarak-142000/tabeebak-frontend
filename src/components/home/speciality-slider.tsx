import { Box } from "@mui/material";
import Slider from "react-slick";
import { styled } from "@mui/system";
import ItemSpecial from "./item-special";
import type { Specialty } from "../../apis/use-case/get-all-specialiste";
import { assets } from "../../assets/assets_frontend/assets";

// صور التخصصات
export const specialityData = [
  assets.General_physician,
  assets.Gynecologist,
  assets.Dermatologist,
  assets.Pediatricians,
  assets.Neurologist,
  assets.Gastroenterologist,
];

// ستايل مخصص للـ dots
const StyledSliderWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(6), // مسافة لتحت علشان الـ dots

  "& .slick-dots": {
    position: "absolute",
    bottom: -40,
    display: "flex !important",
    justifyContent: "center",
    width: "100%",
  },

  "& .slick-dots li button:before": {
    fontSize: "10px",
    color: "#888",
    opacity: 0.8,
  },

  "& .slick-dots li.slick-active button:before": {
    color: theme.palette.primary.main,
    opacity: 1,
  },
}));

// المكون الرئيسي
const SpecialitySlider = ({ data }: { data: Specialty[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <StyledSliderWrapper>
      <Slider {...settings}>
        {data.map((item, index) => (
          <Box key={index} sx={{ px: 1 }}>
            <ItemSpecial item={item} image={specialityData[index]} />
          </Box>
        ))}
      </Slider>
    </StyledSliderWrapper>
  );
};

export default SpecialitySlider;
