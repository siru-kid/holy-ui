import React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";

import CustomDropdown from "~/components/CustomDropdown";
import CustomTextField from "~/components/CustomTextField";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";

const DictionaryForm = ({ dictionaryConfig: dictionary, handleChange, errors }) => {
  const { setting } = useGlobalSetting();

  return (
    <Grid container spacing={2} alignItems="baseline">
      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="Key"
          fullWidth
          name="key"
          value={dictionary.key}
          handleChange={handleChange}
          helperText={(errors && errors.key) || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDropdown
          label="Tenant-Name"
          options={setting.page_types}
          fullWidth
          name="tenant_name"
          value={dictionary?.tenant}
          handleChange={handleChange}
          helperText={(errors && errors.id) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="English"
          fullWidth
          name="english"
          value={dictionary.english}
          handleChange={handleChange}
          helperText={(errors && errors.english) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="ትግርኛ"
          options={setting.langs}
          fullWidth
          name="ትግርኛ"
          value={dictionary.ትግርኛ}
          handleChange={handleChange}
          helperText={(errors && errors.ትግርኛ) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="Spanilla"
          options={setting.langs}
          fullWidth
          name="spanilla"
          value={dictionary.spanilla}
          handleChange={handleChange}
          helperText={(errors && errors.spanilla) || ""}
        />
      </Grid>
    </Grid>
  );
};

DictionaryForm.propTypes = {
  dictionary: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default DictionaryForm;
