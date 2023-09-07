import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPenAlt, FaUserAlt } from "react-icons/fa";
import { IoAtCircleOutline } from "react-icons/io5";
import "./Profile.scss";
import Header from "../Header/Header";
import defaultProfile from "../../images/Profile Photo.png";
import { useGetProfileQuery } from "../../redux/reducer/homeQuery";
import { useSelector } from "react-redux";
import {
  useEditImageMutation,
  useEditProfileMutation,
} from "../../redux/reducer/profileQuery";
import { toast } from "react-toastify";

const Profile = () => {
  const { token } = useSelector((state) => state.auth);
  const refTarget = useRef(null);
  const { data: users, refetch } = useGetProfileQuery(token);
  const [selectedImage, setSelectedImage] = useState(users?.data.profile_image);
  const [file, setFile] = useState("");
  const [body, setBody] = useState({});
  const [isEdit, setIsEdit] = useState(true);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [editImage, { isSuccess }] = useEditImageMutation(token);
  const [editProfile, { isSuccess: isSuccesEditPofile, error, isError }] =
    useEditProfileMutation(token);

  const handleIsEdit = () => {
    setIsEdit(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setFile(file);
        console.log("image change", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = useCallback(
    (e) => {
      setBody({ ...body, [e.target.name]: e.target.value });
    },
    [body]
  );

  const handleSaveImage = useCallback(
    (e) => {
      e.preventDefault(e);
      let formData = new FormData();
      formData.append("file", file);
      console.log("upload", formData.get("file"));
      editImage({ token, formData: true, data: formData });
    },
    [editImage, file, token]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = body;
      editProfile({ data, token });
      setIsEdit(true);
      if (isSuccesEditPofile) {
        toast.success("Perubahan Tersimpan");
        return;
      }
    },
    [body, editProfile, token]
  );

  useEffect(() => {
    if (isSuccess || isSuccesEditPofile) {
      refetch();
    }
  }, [isSuccess, refetch, isSuccesEditPofile]);
  return (
    <div>
      <Header />
      <div className="edit-profile-container">
        <div className="profile-sections">
          <div className="profile-image">
            <img src={selectedImage || defaultProfile} alt="Profile" />
            <div
              className="edit-icon"
              onClick={(e) => {
                console.log("click");
                e.preventDefault();
                refTarget.current.click();
                setIsEditingImage(true);
              }}
            >
              <FaPenAlt className="icon" />
            </div>
            <input
              type="file"
              ref={refTarget}
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="profile-name">
            <h2>{`${users?.data ? users?.data?.first_name : ""} ${
              users?.data ? users?.data?.last_name : ""
            }`}</h2>
          </div>
        </div>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <div className="form-icon">
              <input
                type="email"
                name="email"
                placeholder={
                  !isEdit ? "masukan email anda" : users?.data?.email
                }
                onChange={handleInputChange}
                disabled={isEdit}
              />
              <IoAtCircleOutline className="icons" />
            </div>
          </div>
          <div className="form-group">
            <label>Nama Depan:</label>
            <div className="form-icon">
              <input
                type="text"
                name="first_name"
                placeholder={!isEdit ? "Nama Depan" : users?.data?.first_name}
                onChange={handleInputChange}
                disabled={isEdit}
              />
              <FaUserAlt className="icons" />
            </div>
          </div>
          <div className="form-group">
            <label>Nama Belakang:</label>
            <div className="form-icon">
              <input
                type="text"
                name="last_name"
                placeholder={!isEdit ? "Nama Belakang" : users?.data?.last_name}
                onChange={handleInputChange}
                disabled={isEdit}
              />
              <FaUserAlt className="icons" />
            </div>
          </div>
          <div className="form-buttons">
            {isEditingImage && (
              <div className="edit-image-form">
                {selectedImage && (
                  <button className="save-button" onClick={handleSaveImage}>
                    Simpan Gambar
                  </button>
                )}
                <button
                  className="cancel-button"
                  onClick={() => setIsEditingImage(false)}
                >
                  Batal
                </button>
              </div>
            )}

            {!isEdit && (
              <button
                type="submit"
                onClick={handleSubmit}
                className="logout-button"
              >
                Simpan
              </button>
            )}
            {isEdit && (
              <div className="form-buttons">
                <button
                  type="submit"
                  onClick={handleIsEdit}
                  className="edit-button"
                >
                  Edit Profil
                </button>
                <button type="button" className="logout-button">
                  Logout
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
