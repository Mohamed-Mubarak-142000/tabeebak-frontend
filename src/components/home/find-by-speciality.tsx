import { Stack } from "@mui/material";
import TitleSection from "../title-section";
import { useTranslate } from "../../locales";
import { useSpecialties } from "../../apis/use-case/get-all-specialiste";
import SpecialitySlider from "./speciality-slider";
import SpecialitySliderSkeleton from "../skeletons/speciality-item";
import { ErrorStateContent } from "../error-state-content";

const FindBySpecialty = () => {
  const { t } = useTranslate("home");
  const { data, isPending, isError } = useSpecialties();

  return (
    <Stack spacing={5}>
      <TitleSection
        title={t("speciality.title")}
        subTitle={t("speciality.subtitle")}
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

      {!data && isPending ? (
        <SpecialitySliderSkeleton />
      ) : (
        data && <SpecialitySlider data={data && data.data} />
      )}
    </Stack>
  );
};

export default FindBySpecialty;
