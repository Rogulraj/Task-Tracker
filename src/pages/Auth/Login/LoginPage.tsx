// packages
import React, { FC, FormEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "sonner";
import { YupFormValidator } from "@utils/yupFormValidator";
import { useNavigate } from "react-router-dom";

// css
import ds from "./LoginPage.module.css";

// redux
import { useUserLoginMutation } from "@services/auth.service";

// helper
import { GetSessionToken, SetSessionToken } from "@helper/sessionToken.helper";

// constants
import { routePaths } from "@constants/routesPath";

// components
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";
import MaxWidthLayout from "@components/Layout/MaxWidthLayout/MaxWidthLayout";
import PrimaryButton from "@components/Elements/Buttons/PrimaryButton/PrimaryButton";

// types
interface LoginPagePropsType {}

const yupValidationSchema = Yup.object({
  username: Yup.string().required("Enter Username"),
  password: Yup.string().required("Enter Password"),
});

const LoginPage: FC<LoginPagePropsType> = ({}) => {
  /** states */
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  /** apis */
  const [UserLogin, { data: loginData, isError: isLoginError }] =
    useUserLoginMutation();

  const sessionToken = GetSessionToken();

  /** router-dom */
  const navigate = useNavigate();

  /** methods */
  const handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const validationData = {
        username,
        password,
      };
      const yupValidation = new YupFormValidator(
        yupValidationSchema,
        validationData,
        (errors: string[]) => setValidationErrors(errors)
      );
      const validate = await yupValidation.validate();

      if (validate) {
        await UserLogin({ userData: validationData });
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  /** useEffects */
  useEffect(() => {
    if (isLoginError) {
      toast.error("Login Failed");
    } else if (!isLoginError && loginData?.statusCode === 200) {
      SetSessionToken(loginData.data);
      toast.success("Login Success");
      navigate(routePaths.taskHome, { replace: true });
    }
  }, [loginData, isLoginError]);

  useEffect(() => {
    console.log("sessionToken", sessionToken);
    if (sessionToken) {
      navigate(routePaths.taskHome, { replace: true });
    }
  }, [sessionToken]);

  return (
    <div className={ds.main_layout}>
      <CustomHelmet title="Login" />
      <MaxWidthLayout>
        <form className={ds.form_layout} onSubmit={handleFormSubmit}>
          <h1 className={ds.login_title}>Login</h1>
          <div className={ds.input_card}>
            <div className={ds.align_start_wrapper}>
              <label htmlFor="username" className={ds.username_label}>
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className={ds.username_input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className={ds.input_card}>
            <div className={ds.align_start_wrapper}>
              <label htmlFor="password" className={ds.username_label}>
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={ds.username_input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {validationErrors.length > 0 ? (
                <p className={ds.validation_error}>*{validationErrors[0]}</p>
              ) : null}
              <PrimaryButton
                title="Submit"
                type="submit"
                variant="fill"
                style={{
                  height: "48px",
                  width: "100%",
                  backgroundColor: "#3651d9",
                  color: "#fff",
                  marginTop: "40px",
                }}
              />
            </div>
          </div>
          <div className={ds.info_card}>
            <h3 className={ds.info_text}>Username: rogul</h3>
            <h3 className={ds.info_text}>Password: rogul@123</h3>
          </div>
        </form>
      </MaxWidthLayout>
    </div>
  );
};

export default LoginPage;
