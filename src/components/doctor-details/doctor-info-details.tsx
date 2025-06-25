import DoctorInfo from "./doctor-info";
import { formatDateTimeByLang, useTranslate } from "../../locales";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { DoctorData } from "../../apis/use-case/types";
import { useState } from "react";
import { ErrorStateContent } from "../error-state-content";
import DoctorMapView from "../overview/charts/doctor-map-view";
import ButtonAction from "../button-action";

const DoctorDetailsInfo = ({ data }: { data: DoctorData }) => {
  const { t } = useTranslate("appointment");
  const [openDialog, setDialog] = useState(false);

  const lat = data?.location?.lat;
  const lng = data?.location?.lng;

  // Check location only after we have data
  if (typeof lat !== "number" || typeof lng !== "number") {
    return (
      <ErrorStateContent
        icon="material-symbols:error-outline-rounded"
        title={t("locationError.title")}
        subtitle={t("locationError.subtitle")}
      />
    );
  }

  const markerLocation = { lat, lng };

  return (
    <>
      <DoctorInfo>
        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("doctorInfo.name")}</DoctorInfo.Label>
            <DoctorInfo.Value>{data.name}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>
              {t("doctorInfo.specialization")}
            </DoctorInfo.Label>
            <DoctorInfo.Value>{data.specialty}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("doctorInfo.experience")}</DoctorInfo.Label>
            <DoctorInfo.Value>{`${data.experience} ${t(
              "years"
            )}`}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("doctorInfo.contact")}</DoctorInfo.Label>
            <DoctorInfo.Value>{data.phone}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("doctorInfo.location")}</DoctorInfo.Label>
            <Button
              sx={{
                backgroundColor: (theme) => theme.palette.primary.lighter,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.light,
                },
              }}
              onClick={() => setDialog(true)}
            >
              <DoctorInfo.Value>{data.address}</DoctorInfo.Value>
            </Button>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("doctorInfo.governorate")}</DoctorInfo.Label>
            <DoctorInfo.Value>{data.governorate}</DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Row>
          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("doctorInfo.age")}</DoctorInfo.Label>
            <DoctorInfo.Value>{data.age}</DoctorInfo.Value>
          </DoctorInfo.Item>

          <DoctorInfo.Item>
            <DoctorInfo.Label>{t("doctorInfo.joinedAt")}</DoctorInfo.Label>
            <DoctorInfo.Value>
              {formatDateTimeByLang(data.createdAt)}
            </DoctorInfo.Value>
          </DoctorInfo.Item>
        </DoctorInfo.Row>

        <DoctorInfo.Item>
          <DoctorInfo.Label>{t("doctorInfo.biography")}</DoctorInfo.Label>
          <DoctorInfo.Value>
            {data.bio || t("doctorInfo.noBio")}
          </DoctorInfo.Value>
        </DoctorInfo.Item>
      </DoctorInfo>

      <Dialog
        open={openDialog}
        onClose={() => setDialog(false)}
        fullWidth
        sx={{ p: 0, m: 0, overflow: "hidden" }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: { xs: ".5rem", md: ".8rem", lg: "1rem" },
            color: (theme) => theme.palette.primary.darker,
          }}
        >
          {data.address}
        </DialogTitle>
        <DialogContent
          sx={{
            p: 0,
            overflow: "hidden",
            height: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <DoctorMapView markerLocation={markerLocation} />
          </Box>
        </DialogContent>

        <DialogActions>
          <ButtonAction
            title={t("mapDialog.close")}
            onClick={() => setDialog(false)}
            slotProps={{
              button: {
                sx: {
                  fontSize: { xs: ".5rem", md: ".5rem", lg: ".8rem" },
                  color: (theme) => theme.palette.common.white,
                  backgroundColor: (theme) => theme.palette.primary.dark,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.darker,
                  },
                },
              },
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DoctorDetailsInfo;
