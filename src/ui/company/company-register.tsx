import {
  AlertColor,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import cities from "hanhchinhvn/dist/tinh_tp.json";
import { District, Ward } from "../../core/types/administrative";
import {
  getDistrictsByCityCode,
  getWardsByDistrictCode,
} from "../../core/utils/administrative-utils";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateForm } from "../../core/constants/validate";
import MessageShow from "../../shared-components/message/message";
import { postCompany } from "../../services/company-service";
import { useNavigate } from "react-router-dom";
import { UrlFeApp } from "../../core/constants/common";

const currentDateTime = new Date()
  .toISOString()
  .substring(0, 11)
  .concat(new Date().toTimeString().substring(0, 5));

const initialValues = {
  company: {
    companyName: "",
    cpEmail: "",
    cpTelNo: "",
    taxNo: "",
    city: "",
    district: "",
    ward: "",
    street: "",
    startDate: currentDateTime,
    expiredDate: currentDateTime,
  },
  user: {
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    uTelNo: "",
    uEmail: "",
    enabled: false,
    role: "admin",
  },
};

export default function CompanyRegister() {
  const [formValues, setFormValues] = useState(initialValues);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [companyMsg, setCompanyMsg] = useState("");
  const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>("success");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateForm),
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      company: {
        ...formValues.company,
        [name]: value,
      },
      user: {
        ...formValues.user,
        [name]: value,
      },
    });
  };

  const handleCityChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      company: {
        ...formValues.company,
        [name]: value,
      },
    });

    setDistricts(getDistrictsByCityCode(value));
  };

  const handleDistrictChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      company: {
        ...formValues.company,
        [name]: value,
      },
    });

    setWards(getWardsByDistrictCode(value));
  };

  const handleWardChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      company: {
        ...formValues.company,
        [name]: value,
      },
    });
  };

  const handleAllowLoginChange = (event: any) => {
    const { name } = event.target;

    setFormValues({
      ...formValues,
      user: {
        ...formValues.user,
        [name]: !formValues.user.enabled,
      },
    });
  };

  const handleClearCompany = () => {
    setFormValues({
      ...formValues,
      company: initialValues.company,
    });
    reset();
  };

  const handleClearUser = () => {
    setFormValues({
      ...formValues,
      user: initialValues.user,
    });
    reset();
  };

  const handleMessage = (showMsg: boolean, msg: string, type: AlertColor) => {
    setIsShowMessage(showMsg);
    setCompanyMsg(msg);
    setTypeCompanyMsg(type);
  };

  const handleResponse = (resp: any) => {
    switch (resp.status) {
      case "OK":
        handleMessage(true, resp.message, "success");
        navigate(UrlFeApp.COMPANY.SEACH);
        break;
      case "ERROR":
        handleMessage(true, resp.message, "error");
        break;
      default:
        handleMessage(true, resp.message, "warning");
        break;
    }
  };

  const handleSubmitForm = (event: any) => {
    postCompany(formValues)
      .then((resp) => {
        handleResponse(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseMsg = () => {
    setIsShowMessage(false);
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <Typography
          variant="h5"
          className="mb-4"
          color="textSecondary"
          gutterBottom
        >
          COMPANY REGISTER
          <Divider />
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Card w-full>
              <CardHeader
                avatar={<Avatar aria-label="recipe">C</Avatar>}
                title="Register a new company"
                subheader={new Date().toLocaleDateString()}
                action={
                  <Button variant="outlined" onClick={handleClearCompany}>
                    Clear
                  </Button>
                }
              />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div className="row justify-center m-1">
                    <div className="col-12 col-sm-6 d-block p-1">
                      <InputLabel
                        htmlFor="outlined-adornment-amount"
                        error={Boolean(errors.companyName)}
                      >
                        Company Name:
                      </InputLabel>
                      <TextField
                        size="small"
                        value={formValues.company.companyName}
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        required
                        id="outlined-required"
                        label="Required"
                        placeholder="Please input a new value"
                        error={Boolean(errors.companyName)}
                        helperText={errors.companyName?.message?.toString()}
                        {...register("companyName", {
                          onChange: (e) => handleInputChange(e),
                        })}
                      />
                    </div>
                    <div className="col-12 col-sm-6 d-block p-1">
                      <InputLabel
                        htmlFor="outlined-adornment-amount"
                        error={Boolean(errors.cpEmail)}
                      >
                        Email:
                      </InputLabel>
                      <TextField
                        size="small"
                        value={formValues.company.cpEmail}
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        required
                        id="outlined-required"
                        label="Required"
                        placeholder="Please input a new value"
                        error={Boolean(errors.cpEmail)}
                        helperText={errors.cpEmail?.message?.toString()}
                        {...register("cpEmail", {
                          onChange: (e) => handleInputChange(e),
                        })}
                      />
                    </div>
                  </div>
                  <div className="row justify-center m-1">
                    <div className="col-12 col-sm-6 d-block p-1">
                      <InputLabel
                        htmlFor="outlined-adornment-amount"
                        error={Boolean(errors.cpTelNo)}
                      >
                        Tel-no:
                      </InputLabel>
                      <TextField
                        size="small"
                        value={formValues.company.cpTelNo}
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        id="outlined-required"
                        label="Required *"
                        placeholder="Please input a new value"
                        error={Boolean(errors.cpTelNo)}
                        helperText={errors.cpTelNo?.message?.toString()}
                        {...register("cpTelNo", {
                          onChange: (e) => handleInputChange(e),
                        })}
                      />
                    </div>
                    <div className="col-12 col-sm-6 d-block p-1">
                      <InputLabel
                        htmlFor="outlined-adornment-amount"
                        error={Boolean(errors.taxNo)}
                      >
                        Tax-no:
                      </InputLabel>
                      <TextField
                        size="small"
                        value={formValues.company.taxNo}
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        required
                        id="outlined-required"
                        label="Required"
                        placeholder="Please input a new value"
                        error={Boolean(errors.taxNo)}
                        helperText={errors.taxNo?.message?.toString()}
                        {...register("taxNo", {
                          onChange: (e) => handleInputChange(e),
                        })}
                      />
                    </div>
                  </div>
                  <div className="row justify-center m-1">
                    <div className="col-12 col-sm-6 p-1">
                      <InputLabel id="demo-simple-select-outlined-label">
                        City/Provice
                      </InputLabel>
                      <FormControl
                        size="small"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        variant="outlined"
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          non-required
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          name="city"
                          value={formValues.company.city}
                          onChange={handleCityChange}
                          label="non-required"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {Object.values(cities).map((city) => (
                            <MenuItem value={city.code}>{city.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-12 col-sm-6 p-1">
                      <InputLabel id="demo-simple-select-outlined-label">
                        District/Town:
                      </InputLabel>
                      <FormControl
                        size="small"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        variant="outlined"
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          non-required
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          name="district"
                          value={formValues.company.district}
                          onChange={handleDistrictChange}
                          label="non-required"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {districts.map((dis) => (
                            <MenuItem value={dis.code}>{dis.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="row justify-center m-1">
                    <div className="col-12 col-sm-6 d-block p-1">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Ward/Township:
                      </InputLabel>
                      <FormControl
                        size="small"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        variant="outlined"
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          non-required
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          name="ward"
                          value={formValues.company.ward}
                          onChange={handleWardChange}
                          label="non-required"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {wards.map((ward) => (
                            <MenuItem value={ward.code}>{ward.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-12 col-sm-6 d-block p-1">
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Street:
                      </InputLabel>
                      <TextField
                        name="street"
                        size="small"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        id="outlined-required"
                        label="non-required"
                        placeholder="Please input a new value"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row justify-center m-1">
                    <div className="col-12 col-sm-6 d-block p-1">
                      <InputLabel
                        htmlFor="outlined-adornment-amount"
                        error={Boolean(errors.startDate)}
                      >
                        Start Date/Time (UTC):
                      </InputLabel>
                      <TextField
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        value={formValues.company.startDate}
                        id="dateStart"
                        label="start"
                        type="datetime-local"
                        defaultValue="2017-05-23T10:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={Boolean(errors.startDate)}
                        helperText={errors.startDate?.message?.toString()}
                        {...register("startDate", {
                          onChange: (e) => handleInputChange(e),
                        })}
                      />
                    </div>
                    <div className="col-12 col-sm-6 d-block p-1">
                      <InputLabel
                        htmlFor="outlined-adornment-amount"
                        error={Boolean(errors.expiredDate)}
                      >
                        End Date/Time (UTC):
                      </InputLabel>
                      <TextField
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        value={formValues.company.expiredDate}
                        id="dateEnd"
                        label="end"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={Boolean(errors.expiredDate)}
                        helperText={errors.expiredDate?.message?.toString()}
                        {...register("expiredDate", {
                          onChange: (e) => handleInputChange(e),
                        })}
                      />
                    </div>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card w-full>
              <CardHeader
                avatar={<Avatar aria-label="recipe">U</Avatar>}
                title="Register a new admin user"
                subheader={new Date().toLocaleDateString()}
                action={
                  <Button variant="outlined" onClick={handleClearUser}>
                    Clear
                  </Button>
                }
              />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div className="row justify-center m-1">
                    <div className="col-12 col-sm-6 d-block p-1">
                      <InputLabel
                        htmlFor="outlined-adornment-amount"
                        error={Boolean(errors.userName)}
                      >
                        User Name:
                      </InputLabel>
                      <TextField
                        value={formValues.user.userName}
                        size="small"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        required
                        id="outlined-required"
                        label="Required"
                        placeholder="Please input a new value"
                        error={Boolean(errors.userName)}
                        helperText={errors.userName?.message?.toString()}
                        {...register("userName", {
                          onChange: (e) => handleInputChange(e),
                        })}
                      />
                    </div>
                    <div className="col-12 col-sm-6 d-block p-1">
                      <InputLabel
                        htmlFor="outlined-adornment-amount"
                        error={Boolean(errors.password)}
                      >
                        Password:
                      </InputLabel>
                      <TextField
                        type={"password"}
                        value={formValues.user.password}
                        size="small"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        required
                        id="outlined-required"
                        label="Required"
                        placeholder="Please input a new value"
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message?.toString()}
                        {...register("password", {
                          onChange: (e) => handleInputChange(e),
                        })}
                      />
                    </div>
                  </div>
                  <div className="row justify-center m-1">
                    <div className="col-12 col-sm-6 d-block p-1">
                      <InputLabel htmlFor="outlined-adornment-amount">
                        First Name:
                      </InputLabel>
                      <TextField
                        name="firstName"
                        value={formValues.user.firstName}
                        size="small"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        id="outlined-required"
                        label="non-required"
                        placeholder="Please input a new value"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12 col-sm-6 d-block p-1">
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Last Name:
                      </InputLabel>
                      <TextField
                        name="lastName"
                        value={formValues.user.lastName}
                        size="small"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        id="outlined-required"
                        label="non-required"
                        placeholder="Please input a new value"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row justify-center m-1">
                    <div className="col-12 col-sm-12 d-block p-1">
                      <InputLabel
                        htmlFor="outlined-adornment-amount"
                        error={Boolean(errors.uTelNo)}
                      >
                        Tel-no:
                      </InputLabel>
                      <TextField
                        value={formValues.user.uTelNo}
                        size="small"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        id="outlined-required"
                        label="Required *"
                        placeholder="Please input a new value"
                        error={Boolean(errors.uTelNo)}
                        helperText={errors.uTelNo?.message?.toString()}
                        {...register("uTelNo", {
                          onChange: (e) => handleInputChange(e),
                        })}
                      />
                    </div>
                  </div>
                  <div className="row justify-center m-1">
                    <div className="col-12 col-sm-12 d-block p-1">
                      <InputLabel
                        htmlFor="outlined-adornment-amount"
                        error={Boolean(errors.uEmail)}
                      >
                        Email:
                      </InputLabel>
                      <TextField
                        value={formValues.user.uEmail}
                        size="small"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        id="outlined-required"
                        label="Required *"
                        placeholder="Please input a new value"
                        error={Boolean(errors.uEmail)}
                        helperText={errors.uEmail?.message?.toString()}
                        {...register("uEmail", {
                          onChange: (e) => handleInputChange(e),
                        })}
                      />
                    </div>
                  </div>
                  <div className="row justify-center m-1">
                    <div className="col-12 col-lg-6 d-block p-3">
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Allow Login</FormLabel>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={formValues.user.enabled}
                              name="enabled"
                              onChange={handleAllowLoginChange}
                            />
                          }
                          label="Enabled"
                        />
                      </FormControl>
                    </div>
                    <div className="col-12 col-md-6 d-block p-3">
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Role Assigned:</FormLabel>
                        <RadioGroup
                          row
                          aria-label="role"
                          name="role"
                          value={formValues.user.role}
                          defaultValue="admin"
                        >
                          <FormControlLabel
                            value="admin"
                            control={<Radio color="primary" />}
                            label="Admin"
                          />
                          <FormControlLabel
                            value="user"
                            control={<Radio color="primary" />}
                            label="User"
                            disabled
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} className="text-center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(handleSubmitForm)}
            >
              SAVE
            </Button>
          </Grid>
        </Grid>
      </form>
      <MessageShow
        message={companyMsg}
        showMessage={isShowMessage}
        type={typeCompanyMsg}
        handleCloseMsg={handleCloseMsg}
      />
    </>
  );
}
