import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPenAlt } from "react-icons/fa";
import "./Profile.scss";
import Header from "../Header/Header";
import defaultProfile from "../../images/Profile Photo.png";
import { useGetProfileQuery } from "../../redux/reducer/homeQuery";
import { useSelector } from "react-redux";
import { useEditImageMutation } from "../../redux/reducer/profileQuery";

const Profile = () => {
  const { token } = useSelector((state) => state.auth);
  const refTarget = useRef(null);
  const { data: users, refetch } = useGetProfileQuery(token);
  const [selectedImage, setSelectedImage] = useState(users?.data.profile_image);
  const [file, setFile] = useState("");
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [editImage, { isSuccess, error, isError }] =
    useEditImageMutation(token);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Proses penyimpanan data profil di sini
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

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);
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
            {/* Gantilah 'Nama Profil' dengan nama profil yang sebenarnya */}
          </div>
        </div>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <div className="form-icon">
              <input type="email" name="email" required />
            </div>
          </div>
          <div className="form-group">
            <label>Nama Depan:</label>
            <div className="form-icon">
              <input type="text" name="firstName" required />
            </div>
          </div>
          <div className="form-group">
            <label>Nama Belakang:</label>
            <div className="form-icon">
              <input type="text" name="lastName" required />
            </div>
          </div>
          <div className="form-buttons">
            {isEditingImage && (
              <div className="edit-image-form">
                {selectedImage && (
                  <button onClick={handleSaveImage}>Simpan Gambar</button>
                )}
                <button onClick={() => setIsEditingImage(false)}>Batal</button>
              </div>
            )}
            <button type="submit" className="edit-button">
              Edit Profil
            </button>
            <button type="button" className="logout-button">
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
