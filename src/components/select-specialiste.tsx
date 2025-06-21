import {
  useSpecialties,
  type Specialty,
} from "../apis/use-case/get-all-specialiste";
import { getCurrentLang, useTranslate } from "../locales";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

export function SpecialtySelector({
  control,
  name = "specialty",
  placeholder,
  error,
  helperText,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}) {
  const { t } = useTranslate("common");
  const { data, isPending, error: apiError } = useSpecialties();

  if (isPending) {
    return <CircularProgress size={24} />;
  }

  if (apiError) {
    return <Typography color="error">Error loading specialties</Typography>;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={error}>
          <Select {...field} displayEmpty value={field.value || ""}>
            <MenuItem value="">
              {placeholder ||
                t("register_form.doctor_register.specialty_placeholder")}
            </MenuItem>
            {data?.data.map((specialty: Specialty) => (
              <MenuItem key={specialty.id} value={specialty.value}>
                {getCurrentLang() === "ar"
                  ? specialty.label.ar
                  : specialty.label.en}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
