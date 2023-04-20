import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FormData from "form-data";

import styled, { css } from "styled-components";

import { useDispatch } from "react-redux";
import axios from "axios";

import { setClubInfo, setClubPostData } from "../features/clubSlice";
import { selectUser, setClubName } from "../features/authSlice";
import { selectClubInfo } from "../features/clubSlice";

import AdminSidebar from "../components/AdminSidebar";
import FormInput, { InputContainer, LabelField } from "../components/FormInput";
import ClubButton from "../components/UI/ClubButton";

const UPDATE_FORM = "UPDATE_FORM";
const RESET_FORM = "RESET_FORM";
const SET_FORM = "SET_FORM";

const initialState = {
  values: {
    clubName: "",
    instagram: "",
    facebook: "",
    email: "",
    linkedin: "",
    clubDescription: "",
    clubLogo: "",
    clubBanner: "",
  },
  validities: {
    clubName: false,
    instagram: false,
    facebook: false,
    email: false,
    linkedin: false,
    clubDescription: false,
    clubLogo: false,
    clubBanner: false,
  },
  isFormValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case RESET_FORM:
      return initialState;

    case SET_FORM:
      return { ...state, ...action.payload };

    case UPDATE_FORM:
      const { id, value, isValid } = action.payload;
      const values = { ...state.values, [id]: value };
      const validities = { ...state.validities, [id]: isValid };
      let isFormValid = true;

      for (let key in validities) {
        isFormValid = isFormValid && validities[key];
      }

      return {
        ...state,
        values,
        validities,
        isFormValid,
      };
    default:
      return state;
  }
};

function AdminProfileScreen() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(selectUser);
  const clubInfo = useSelector(selectClubInfo);

  const [formData, dispatchFormState] = useReducer(formReducer, initialState);
  const [, setIsLoading] = useState(false);
  const [clubLogoValue, setClubLogoValue] = useState(null);
  const [clubBannerValue, setClubBannerValue] = useState(null);

  // const clubInfo = useSelector(selectClubInfo);
  // const clubPost = useSelector(selectClubPostData);
  const fetchClubInformation = useCallback(async () => {
    await axios({
      method: "post",
      url: "/admin/club/getClubData",
      data: {
        clubName: user.clubName || clubInfo.clubName,
      },
    })
      .then((result) => {
        if (result.status !== 200) {
          alert("Not able to fetch events");
          return;
        } else {
          dispatch(setClubInfo(result.data));
          return;
        }
      })
      .catch((err) => {
        if (err != null) {
          alert("Something is wrong");
          return;
        }
      });
  }, [clubInfo, dispatch, user.clubName]);

  const fetchClubPostData = useCallback(async () => {
    await axios({
      method: "post",
      url: "/club/post/getPost",
      data: {
        clubName: user.clubName,
      },
    })
      .then((result) => {
        if (result.status !== 200) {
          alert("Not able to fetch events");
          return;
        } else {
          dispatch(setClubPostData(result.data));
          return;
        }
      })
      .catch((err) => {
        if (err != null) {
          alert("Something is wrong");
          return;
        }
      });
  }, [dispatch, user.clubName]);

  useEffect(() => {
    if (user != null && clubInfo == null) {
      fetchClubInformation();
      fetchClubPostData();
    }
  }, [clubInfo, fetchClubInformation, fetchClubPostData, user]);

  useEffect(() => {
    if (user != null && clubInfo != null) {
      dispatchFormState({
        type: SET_FORM,
        payload: {
          values: {
            clubName: clubInfo.clubName,
            instagram: clubInfo.socialMedia && clubInfo.socialMedia.instagram,
            facebook: clubInfo.socialMedia && clubInfo.socialMedia.facebook,
            email: clubInfo.socialMedia && clubInfo.socialMedia.email,
            linkedin: clubInfo.socialMedia && clubInfo.socialMedia.linkedin,
            clubDescription: clubInfo.clubDescription,
            clubLogo: clubInfo.clubLogo,
            clubBanner: clubInfo.clubBanner,
          },
          validities: {
            clubName: true,
            instagram: true,
            facebook: true,
            email: true,
            linkedin: true,
            clubDescription: true,
            clubLogo: true,
            clubBanner: true,
          },
          isFormValid: true,
        },
      });
    }
  }, [clubInfo, dispatchFormState, user]);

  const onInputChange = useCallback(
    (id, value, isValid) => {
      dispatchFormState({
        type: UPDATE_FORM,
        payload: {
          id,
          value,
          isValid,
        },
      });
    },
    [dispatchFormState]
  );

  const formSubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();

      if (!formData.isFormValid) {
        alert("Check form for errors!");
        return;
      }
      let clubLogoData = clubInfo.clubLogo;
      let clubBannerData = clubInfo.clubBanner;
      if (clubLogoValue !== null) {
        let logoData = new FormData();
        logoData.append("file", clubLogoValue, clubLogoValue.name);
        await axios({
          method: "post",
          url: "/upload/images",
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${logoData._boundary}`,
          },
          data: logoData,
        })
          .then((result) => {
            if (result.status !== 200) {
              alert("Not able to fetch events");
              return;
            } else {
              clubLogoData = result.data.filename;
              return;
            }
          })
          .catch((err) => {
            if (err != null) {
              alert("Something is wrong with uploading the image!");
              return;
            }
          });
      }
      if (clubBannerValue !== null) {
        let bannerData = new FormData();
        bannerData.append("file", clubBannerValue, clubBannerValue.name);
        await axios({
          method: "post",
          url: "/upload/images",
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${bannerData._boundary}`,
          },
          data: bannerData,
        })
          .then((result) => {
            if (result.status !== 200) {
              alert("Not able to fetch events");
              return;
            } else {
              clubBannerData = result.data.filename;
              return;
            }
          })
          .catch((err) => {
            if (err != null) {
              alert("Something is wrong with uploading the image!");
              return;
            }
          });
      }
      let updatedClubInfo = {
        clubName: formData.values.clubName,
        clubCode: clubInfo.clubCode,
        clubLogo: clubLogoData,
        clubBanner: clubBannerData,
        clubPhotos: clubInfo.clubPhotos,
        clubDescription: formData.values.clubDescription,
        socialMedia: {
          instagram: formData.values.instagram,
          linkedin: formData.values.linkedin,
          email: formData.values.email,
          facebook: formData.values.facebook,
        },
        prevData: clubInfo,
      };
      try {
        setIsLoading(true);
        await axios({
          method: "put",
          url: "/admin/club/update",
          data: updatedClubInfo,
        })
          .then((result) => {
            if (result.status !== 200) {
              alert("Not able to fetch events");
              return;
            } else {
              updatedClubInfo.prevData = null;
              dispatch(setClubInfo({ ...clubInfo, ...updatedClubInfo }));
              dispatch(setClubName(updatedClubInfo.clubName));
              dispatchFormState({ type: RESET_FORM });
              history.replace("/");
              history.replace("/admin");
              return;
            }
          })
          .catch((err) => {
            if (err != null) {
              alert("Something is wrong");
              return;
            }
          });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        alert(error.message);
      }
    },
    [
      formData.isFormValid,
      formData.values.clubName,
      formData.values.clubDescription,
      formData.values.instagram,
      formData.values.linkedin,
      formData.values.email,
      formData.values.facebook,
      clubInfo,
      clubLogoValue,
      clubBannerValue,
      dispatch,
      history,
    ]
  );
  if (user === null || clubInfo === null) {
    return <div></div>;
  }
  return (
    <AdminContainer>
      <AdminSidebar />
      <AdminRightContainer>
        <ProfileUpdateHeading>Update Your Club</ProfileUpdateHeading>
        <ProfileUpdateForm>
          <FormWrapper>
            <FormInput
              label="Club Name"
              inputType="text"
              initialValue={formData.values.clubName}
              initiallyValid={formData.validities.clubName}
              onInputChange={onInputChange}
              id="clubName"
              labelColor="#fff"
              required
            />
            <FormInput
              label="Instagram Link"
              inputType="text"
              initialValue={formData.values.instagram}
              initiallyValid={formData.validities.instagram}
              onInputChange={onInputChange}
              id="instagram"
              labelColor="#fff"
            />
            <FormInput
              label="LinkedIn Link"
              inputType="text"
              initialValue={formData.values.linkedin}
              initiallyValid={formData.validities.linkedin}
              onInputChange={onInputChange}
              id="linkedin"
              labelColor="#fff"
            />
            <FormInput
              label="Email"
              inputType="text"
              initialValue={formData.values.email}
              initiallyValid={formData.validities.email}
              onInputChange={onInputChange}
              id="email"
              labelColor="#fff"
            />
            <DescriptionInputContainer>
              <LabelField labelColor="#fff">DESCRIPTION</LabelField>
              <ProfileDescription
                name="Club Description"
                inputType="text"
                id="clubDescription"
                value={formData.values.clubDescription}
                onChange={(event) =>
                  onInputChange(
                    "clubDescription",
                    event.target.value,
                    event.target.value.length ? true : false
                  )
                }
                cols="30"
                rows="10"
              />
            </DescriptionInputContainer>

            <ImagesInputContainer>
              <InputContainer>
                <LabelField labelColor="#fff">Choose Banner</LabelField>
                <UpdateBanner
                  type="file"
                  name="Banner"
                  id="clubBanner"
                  onChange={(event) => {
                    setClubBannerValue(event.target.files[0]);
                    onInputChange(
                      "clubBanner",
                      event.target.value,
                      event.target.value.length ? true : false
                    );
                  }}
                  accept="image/*"
                />
              </InputContainer>
              <InputContainer>
                <LabelField labelColor="#fff">Choose Logo</LabelField>
                <UpdateBanner
                  type="file"
                  name="logo"
                  id="clubLogo"
                  onChange={(event) => {
                    setClubLogoValue(event.target.files[0]);
                    onInputChange(
                      "clubLogo",
                      event.target.value,
                      event.target.value.length ? true : false
                    );
                  }}
                  accept="image/*"
                />
              </InputContainer>
            </ImagesInputContainer>
          </FormWrapper>
          <ClubButton onButtonPress={formSubmitHandler}>Update</ClubButton>
        </ProfileUpdateForm>
      </AdminRightContainer>
    </AdminContainer>
  );
}

export default AdminProfileScreen;

export const AdminContainer = styled.main`
  display: flex;
  background: var(--headerColor);
  min-height: calc(100vh - 60px);
  padding: 10px;
  color: #fff;
`;

export const AdminRightContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 0.8;
  width: 100%;
  height: calc(100vh - 80px);
  background: var(--primaryColor);
  margin-left: 10px;
  padding: 20px;
  border-radius: 20px;
  overflow-y: auto;
`;

const ProfileUpdateHeading = styled.h2`
  color: "#fff";
  margin-bottom: 23px;
`;

const ProfileUpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
`;

const StyledInput = css`
  min-width: 250px;
  padding: 5px;
  border: none;
  outline-width: 0;
  border-bottom: 2px solid #033649;
  background: transparent;
  padding-right: 30px;
  resize: none;
  color: #fff;

  ::-webkit-scrollbar {
    width: 0;
  }
`;

const ProfileDescription = styled.textarea`
  ${StyledInput}
  width: 94%;
`;

const DescriptionInputContainer = styled(InputContainer)`
  width: 100%;
`;

const ImagesInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #033649;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0 0 10px;
`;

const UpdateBanner = styled.input``;
