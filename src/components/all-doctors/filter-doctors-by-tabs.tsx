import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import CustomTabs from "../custom-tabs";
import DoctorItem from "../home/doctor-card";
import PaginationControlled from "../custom-pagination";
import { EmptyStateContent } from "../empty-state-content";
import { useGetAllDoctors } from "../../apis/use-case/doctor/get-all-doctors";
import { useSpecialties } from "../../apis/use-case/get-all-specialiste";
import { getCurrentLang } from "../../locales";
import TopDoctorsSkeleton from "../skeletons/doctor-card-skeleton";
import type { DoctorData } from "../../apis/use-case/types";

const FilterDoctorsByTabs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 8;

  const { data: specialtiesData, error: errorSpecialties } = useSpecialties();

  const specialties = useMemo(() => {
    const base = specialtiesData?.data || [];
    return [
      { id: "all", value: "All", label: { en: "All", ar: "الكل" } },
      ...base,
    ];
  }, [specialtiesData]);

  const currentSpecialty = specialties[activeTabIndex]?.value || "All";

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      limit: doctorsPerPage,
      sort: "-rating",
      ...(currentSpecialty !== "All" && { specialty: currentSpecialty }),
    }),
    [currentPage, doctorsPerPage, currentSpecialty]
  );

  const {
    data: doctorsData,
    isLoading: loadingDoctors,
    error: errorDoctors,
  } = useGetAllDoctors(queryParams);

  const handleTabChange = (newIndex: number) => {
    setActiveTabIndex(newIndex);
    setCurrentPage(1);
  };

  const renderDoctorGrid = (doctors: DoctorData[]) => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 2,
      }}
    >
      {loadingDoctors ? (
        <TopDoctorsSkeleton />
      ) : (
        doctors.map((doctor) => <DoctorItem key={doctor._id} doctor={doctor} />)
      )}
    </Box>
  );

  // Error loading specialties
  if (errorSpecialties) {
    return (
      <EmptyStateContent
        title="Error Loading Specialties"
        subtitle={errorSpecialties.message}
      />
    );
  }

  return (
    <CustomTabs
      tabs={specialties.map((spec) => ({
        label: getCurrentLang() === "ar" ? spec.label.ar : spec.label.en,
        value: spec.value,
      }))}
      spacing={2}
      onTabChange={handleTabChange}
      tabIndex={activeTabIndex}
    >
      {!loadingDoctors && errorDoctors ? (
        <EmptyStateContent
          title="Error Loading Doctors"
          subtitle={errorDoctors.message}
        />
      ) : doctorsData?.data.length === 0 ? (
        <EmptyStateContent
          title="No Doctors Found"
          subtitle={`No doctors found for ${currentSpecialty} specialty`}
          slotProps={{
            title: {
              variant: "h5",
              sx: {
                fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem" },
                fontWeight: (theme) => theme.typography.fontWeightBold,
              },
            },
            subtitle: {
              variant: "subtitle1",
              sx: {
                fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" },
                fontWeight: (theme) => theme.typography.fontWeightRegular,
              },
            },
          }}
        />
      ) : (
        <PaginationControlled
          items={doctorsData?.data || []}
          countPerPage={doctorsPerPage}
          initialPage={currentPage}
          onPageChange={(_items, page) => setCurrentPage(page)}
          sx={{ mt: 2, mb: 2 }}
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
          render={renderDoctorGrid}
        />
      )}
    </CustomTabs>
  );
};

export default FilterDoctorsByTabs;
