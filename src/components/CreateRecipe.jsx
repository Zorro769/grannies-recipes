import React, { useState, useRef, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import InfoDialog from "./InfoDialog";
import Dialog from "@mui/material/Dialog";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import colorStyle from "../utils/styleReactSelect";
import Loading from "./Loading";

const CreateRecipe = ({ onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const [errMsg, setErrMsg] = useState("");
  const [infoDialog, setInfoDialog] = useState(false);
  const [uploadedData, setUploadedData] = useState();
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(false);

  const [name, setName] = useState("");
  const [cuisines, setCuisine] = useState([]);
  const [dishType, setDishType] = useState("");
  const [diet, setDiet] = useState("");
  const [totalMin, setTotalMin] = useState("");
  const [ingredients, setIngredients] = useState([{ original: "" }]);
  const [instructions, setInstructions] = useState("");
  const [stripeID, setStripeID] = useState();
  const [price, setPrice] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const uploadingDietsDishTypesCuisines = async () => {
    const data = await axiosPrivate.get("/recipes/data");
    setLoading(false);
    setUploadedData(data);
  };
  const closeDialog = () => {
    setInfoDialog(false);
    // onClose();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const serializedIngredients = ingredients
      .filter(
        (ingredient) =>
          ingredient && ingredient.original && ingredient.original.trim() !== ""
      )
      .map((ingredient) => ({ original: ingredient.original }));

    formData.append(
      "extendedIngredients",
      JSON.stringify(serializedIngredients)
    );
    formData.append("title", name);
    formData.append("cuisines", JSON.stringify(cuisines));
    formData.append("dishTypes", JSON.stringify(dishType));
    formData.append("instructions", instructions);
    formData.append("readyInMinutes", totalMin);
    formData.append("diets", JSON.stringify(diet));
    if (stripeID !== undefined && price !== 0) {
        formData.append("stripeAccountId", stripeID);
        formData.append("price", price);
    }

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await axiosPrivate.post("/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setInfoDialog(true);
      setInfo("Your recipe has been successfully created");
    } catch (error) {
      setInfoDialog(true);
      setInfo("You need to be logged in first");
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value ? { original: value } : null;

    const filteredIngredients = newIngredients.filter(
      (ingredient) =>
        ingredient !== null &&
        ingredient !== undefined &&
        ingredient.original !== undefined
    );

    if (index === newIngredients.length - 1 && value.trim() !== "") {
      filteredIngredients.push({ original: "" });
    }

    setIngredients(filteredIngredients);
  };

  useEffect(() => {
    uploadingDietsDishTypesCuisines();
  }, []);
  return (
    <>
      <div className="w-full h-full relative create-recipe-dialog ">
        <div className="bg-gradient-to-l contain from-transparent  to-black to-65% w-[1190px] h-[710px] top-[36px] fixed top-0 z-8 flex flex-col items-start justify-start pt-40 2xl:pt-20 px-4 left-[258px] rounded-[45px]"></div>
        <div className="bg-gradient-to-l  contain from-transparent to-black to-65% w-[1190px] h-[710px] top-[36px] fixed top-0 z-8 flex flex-col items-start justify-start pt-40 2xl:pt-20 px-4 rounded-[45px]"></div>
        <div className="h-screen w-full relative py-10 pb-5 bg  -transparent">
          <div
            className="text-white right-[280px] fixed top-[50px] cursor-pointer"
            onClick={() => onClose()}
          >
            <FontAwesomeIcon icon={faX} color={"gray"} fontSize={25 + "px"} />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="h-full w-[400px] z-20 text-center flex flex-col items-center rounded-[45px]">
              <span className="text-white font-Nunito text-xl font-bold">
                Granny's<span className="text-[#166534] text-2xl">Recipes</span>
              </span>
              <form
                onSubmit={handleSubmit}
                className="text-[#1FB137] text-left w-[340px] mt-10 py-5"
              >
                <label className="text-[#1FB137] text-base font-bold ">
                  Name of recipe:
                  <br />
                  <input
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Enter title of recipe"
                    className=" border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
                  Cuisine type:
                  <Select
                    options={uploadedData?.data?.cuisines}
                    isMulti
                    isClearable
                    styles={colorStyle}
                    onChange={(option) => setCuisine(option)}
                  />
                </label>
                <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
                  Dish type:
                  <Select
                    options={uploadedData?.data?.dishTypes}
                    isMulti
                    isClearable
                    styles={colorStyle}
                    onChange={(option) => setDishType(option)}
                  />
                </label>
                <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
                  Diet:
                  <Select
                    options={uploadedData?.data?.diets}
                    isMulti
                    isClearable
                    styles={colorStyle}
                    onChange={(option) => setDiet(option)}
                  />
                </label>
                <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full">
                  Total time(in min):
                  <br />
                  <input
                    type="number"
                    placeholder="Enter total time"
                    onWheel={(e) => e.target.blur()}
                    name="time"
                    id="time"
                    className=" border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
                    onChange={(e) => setTotalMin(e.target.value)}
                  />
                </label>
                <span className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full radio-container">
                  Ingredients
                </span>
                {ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="text-[#1FB137] text-base font-bold w-full radio-container py-0"
                  >
                    <label className="inline-block w-full mb-5">
                      <input
                        type="text"
                        placeholder="Enter ingredient"
                        value={ingredient.original}
                        className="text-[#1FB137] text-base border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
                        onChange={(e) =>
                          handleIngredientChange(index, e.target.value)
                        }
                      />
                    </label>
                    <br />
                  </div>
                ))}
                <span className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full radio-container">
                  Instructions
                </span>
                <textarea
                  placeholder="Enter instructions"
                  name="dishType"
                  onChange={(e) => setInstructions(e.target.value)}
                  className="border-[#1FB137] text-[#1FB137] bg-black border w-full py-2 pl-4 pr-10 resize-none"
                  style={{ height: "200px" }}
                />
                <label className="text-[#1FB137] text-base font-bold inline-block w-full radio-container mt-5">
                  <input
                    type="radio"
                    name="payment"
                    value="free"
                    className="radio-input"
                    onChange={(e) => setPayment(false)}
                  />
                  <span className="label-text">Free</span>
                </label>
                <label className="text-[#1FB137] text-base font-bold inline-block mt-2 w-full radio-container">
                  <input
                    type="radio"
                    name="payment"
                    value="paid"
                    className="radio-input"
                    onChange={(e) => setPayment(true)}
                  />
                  <span className="label-text">Paid</span>
                </label>
                {payment && (
                  <>
                    <label className="text-[#1FB137] text-base font-bold inline-block w-full mt-5">
                      Stripe ID:
                      <br />
                      <input
                        type="text"
                        name="stripe-id"
                        placeholder="Your stripe accound ID"
                        required
                        maxLength={50}
                        className=" border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
                        onChange={(e) => setStripeID(e.target.value)}
                      />
                    </label>
                    <label className="text-[#1FB137] text-base font-bold inline-block w-full mt-5">
                      Price:
                      <br />
                      <input
                        type="number"
                        name="price"
                        placeholder="Price for the recipe"
                        required
                        className="border-[#1FB137] bg-black border w-full py-2 pl-4 pr-10"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </label>
                  </>
                )}
                <label className="text-[#1FB137] text-base font-bold inline-block mt-5 w-full radio-container">
                  Pick an image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="hidden"
                  ref={fileInputRef}
                  id="fileInput"
                  accept="image/*"
                />
                <label
                  htmlFor="fileInput"
                  className={`bg-[#166534] w-[130px] h-[45px] rounded-3xl text-white text-xl text-center cursor-pointer inline-block mt-2 px-4 py-2 ${
                    selectedFile ? "bg-gray-700" : ""
                  }`}
                >
                  {"Choose"}
                </label>
                <br />
                <br />
                {selectedFile ? (
                  <>
                    <span className="text-[#1FB137] text-base">
                      Chosen file:
                      <span className="text-base w-100">
                        {" "}
                        {selectedFile.name}
                      </span>
                    </span>
                    <div className="mt-3 relative">
                      <div>
                        <div
                          className="absolute inline-block m-2 left-40 cursor-pointer"
                          onClick={() => {
                            setSelectedFile(null);
                            fileInputRef.current.value = null;
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faX}
                            color={"black"}
                            fontSize={25 + "px"}
                          />
                        </div>
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          className="rounded-lg md:w-[200px] h-[200px] md:h-[150px]"
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="text-[#1FB137] text-base">
                    Image is not chosen
                  </span>
                )}
                <div className="text-left text-orange-900 mt-5">{errMsg}</div>
                <div className="flex justify-center mt-12">
                  <button
                    type="submit"
                    value="Sign in"
                    className="bg-[#166534] w-[130px] h-[45px]  rounded-3xl text-white text-xl self-center"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          )}
          <Dialog
            open={infoDialog}
            onClose={closeDialog}
            fullWidth
            maxWidth="xs"
            PaperProps={{ style: { height: "100px", borderradius: "50%" } }}
          >
            <InfoDialog info={info} onClose={closeDialog} />
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default CreateRecipe;
