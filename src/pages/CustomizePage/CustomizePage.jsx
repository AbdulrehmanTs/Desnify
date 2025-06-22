import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { autoLogout, getToken } from "../../hooks/useAuth";
import { ApiBaseUrl, Text2ImgApiKey } from "../../lib/utils";
import Spinner from "../../components/loader/spinner";
import { useCart } from "../../contexts/cartContext";
import { PiStarFourFill } from "react-icons/pi";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";
import { LuCheck, LuX } from "react-icons/lu";

const CustomizePage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const params = useParams();
  const token = getToken();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(
    product?.images[0]?.imageUrl
  );
  const [selectedDesign, setSelectedDesign] = useState(null);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiImages, setAiImages] = useState([]);
  const [aiError, setAiError] = useState(null);

  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [generateError, setGenerateError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          ApiBaseUrl + "/product/getProductById?productId=" + params.id,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setProduct(result.data);
        setSelectedImage(result?.data?.images[0]?.imageUrl);
        if (result.msg === "Session Expired") {
          autoLogout();
        }
        if (!response.ok) throw new Error("Network response was not ok");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    const fetchPremiumDesigns = async () => {
      try {
        setAiLoading(true); // Start loading
        const response = await fetch(ApiBaseUrl + "/order/getAllAIImage", {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setAiImages(result.data);
        if (result.msg === "Session Expired") {
          autoLogout();
        }
        if (!response.ok) throw new Error("Network response was not ok");
      } catch (err) {
        setAiError(err.message);
      } finally {
        setAiLoading(false); // Stop loading
      }
    };

    fetchProducts();
    fetchPremiumDesigns();
  }, [params.id, token]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerateLoading(true);
    setGenerateError(null);
    setGeneratedImage(null);

    try {
      const response = await fetch(
        "https://modelslab.com/api/v6/realtime/text2img",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: Text2ImgApiKey,
            prompt,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result?.status === "success") {
        setGeneratedImage({ _id: result.id, image: result?.output[0] });
        uploadAiImage(result?.output[0]);
      } else {
        setGenerateError(result?.message);
      }
    } catch (err) {
      setGenerateError(err.message || "Something went wrong");
    } finally {
      setGenerateLoading(false);
    }
  };

  const uploadAiImage = async (image) => {
    try {
      const response = await fetch(ApiBaseUrl + "/order/uploadAIImage", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          image,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.log(err.message || "Something went wrong");
    }
  };

  const handleAddtoCart = () => {
    if (selectedDesign) {
      product.customDesign = [
        {
          isfront: true,
          customDesignID: selectedDesign._id,
          image: selectedDesign.image,
        },
      ];
    }
    addToCart(product);
  };

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p className="text-red-500 text-sm text-center ">{error}</p>;
  }
  return (
    <>
      <div className="w-full 2xl:w-[1440px] mx-auto px-4 sm:px-6 mb-24">
        {/* Product Detail Container */}
        <div className="w-full flex flex-col md:flex-row  my-12 2xl:my-24">
          {/* Sidebar - Designs */}
          <div className="w-full md:w-1/3 md:border-r p-4 h-auto md:h-[600px] 2xl:h-[750px] pr-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="font-[Karla] 2xl:mb-12 font-normal text-[24px] leading-[100%] tracking-[0%] mb-4 cursor-pointer"
            >
              <span className="text-[#292D32]">&larr;</span> Edit Design
            </button>
            <p className="font-[Karla] font-medium text-[14px] leading-[100%] tracking-[0%] text-gray-600">
              Our Premium Designs
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 max-h-[25rem] overflow-auto gap-4 mt-4">
              {aiLoading ? (
                <Spinner />
              ) : aiError ? (
                <p className="text-red-500 text-sm text-center ">{error}</p>
              ) : (
                aiImages?.map(({ image, _id }) => (
                  <div
                    key={_id}
                    className={`cursor-pointer ${
                      selectedDesign === _id ? "border-green-500" : ""
                    }`}
                    onClick={() => setSelectedDesign({ _id, image })}
                  >
                    <img
                      src={image}
                      alt="T-Shirt"
                      className="w-full object-contain border rounded-lg"
                    />
                    <p className="font-[Karla] font-medium text-[14px] leading-[100%] tracking-[0%] text-center mt-2">
                      New Fashion
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="w-full flex justify-between items-center mt-5">
              <div className="h-px w-[44%] bg-gray-200"></div>
              <span className="font-[Karla] font-normal text-sm text-gray-500 tracking-[0%]">
                OR
              </span>
              <div className="h-px w-[44%] bg-gray-200"></div>
            </div>

            <h2 className="mt-8 font-[Karla] font-medium text-[14px] leading-[100%] tracking-[0%] text-gray-600">
              Generate from AI
            </h2>
            <form onSubmit={handleGenerate} className="relative w-full mt-4">
              <input
                type="text"
                placeholder="Describe your design idea ..."
                className="w-full p-2 pr-11 border border-[#9E9E9E] rounded-md focus:outline-none focus:border-green-500 
                                placeholder:font-[Karla] placeholder:font-normal placeholder:text-[12px] placeholder:leading-[100%] placeholder:tracking-[0%]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                disabled={generateLoading}
                type="submit"
                className="absolute right-0 inset-y-0 border-l border-[#9E9E9E] border disabled:opacity-40 px-2.5 bg-gray-200/40 hover:bg-gray-300/40 rounded cursor-pointer"
              >
                <div className="rounded">
                  <PiStarFourFill className="size-5 text-green-600" />
                </div>
              </button>
            </form>

            <div className="mt-6">
              {generateLoading ? (
                <div
                  role="status"
                  className="animate-pulse md:flex md:items-center"
                >
                  <div className="flex items-center justify-center w-full h-40 bg-gray-300 rounded-sm sm:w-40">
                    <svg
                      className="w-10 h-10 text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : generateError ? (
                <p className="text-red-500 text-sm text-center ">
                  {generateError}
                </p>
              ) : generatedImage ? (
                <div
                  onClick={() => setSelectedDesign(generatedImage)}
                  className="h-40 w-40 overflow-hidden rounded-md cursor-pointer"
                >
                  <img
                    src={generatedImage.image}
                    alt="ai-image"
                    className="size-full object-contain"
                  />
                </div>
              ) : null}
            </div>
          </div>

          {/* Main Display */}
          <div className="w-full md:w-2/3 flex flex-col items-center p-4">
            <div className="h-[600px]">
              <OverlayImage
                tshirtUrl={selectedImage}
                imageUrl={selectedDesign?.image}
              />
            </div>
          </div>

          {/* Sidebar - Color Selection */}
          <div className="w-full md:w-1/3 p-4 md:border-l h-auto md:h-[600px] 2xl:h-[750px] flex flex-wrap md:flex-col pl-8 justify-center md:justify-start items-center md:items-start gap-2 md:gap-4">
            {product?.images?.map((item) => (
              <div
                key={item?._id}
                className={`border overflow-hidden rounded-md cursor-pointer ${
                  selectedImage === item?.imageUrl ? "border-green-500" : ""
                }`}
                onClick={() => setSelectedImage(item?.imageUrl)}
              >
                <img
                  src={item?.imageUrl}
                  alt={item?._id}
                  className="w-24 sm:w-28 md:w-30 2xl:w-36 h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="w-full flex justify-center md:justify-end pr-0 md:pr-20 2xl:pr-44">
          <button
            onClick={handleAddtoCart}
            type="button"
            className="cursor-pointer bg-green-600 py-3 md:py-2.5 px-8 w-full md:w-auto text-white rounded-lg shadow-md hover:bg-green-700"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomizePage;

const OverlayImage = ({ imageUrl, tshirtUrl }) => {
  const [designImage, setDesignImage] = useState(null);
  const [tshirtImage, setTshirtImage] = useState(null);
  const [isSelected, setIsSelected] = useState(true);
  const imageRef = useRef();
  const transformerRef = useRef();

  // Load the images
  useEffect(() => {
    const loadImage = (url, setter) => {
      const img = new window.Image();
      // img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => setter(img);
    };

    loadImage(imageUrl, setDesignImage);
    loadImage(tshirtUrl, setTshirtImage);
  }, [imageUrl, tshirtUrl]);

  useEffect(() => {
    if (transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [designImage]);

  // Attach transformer to selected image
  useEffect(() => {
    if (isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const exportImage = () => {
    console.log(imageRef.current.getStage())
    const uri = imageRef.current.getStage()?.toDataURL({ pixelRatio: 2 });
    console.log(uri); // or download
    setIsSelected(false);
  };

  return (
    <>
      <Stage
        width={500}
        height={500}
        onMouseDown={(e) => {
          // Deselect when clicked outside the image
          const clickedOnImage = e.target.name() === "design-image";
          const clickedOnTransformer =
            transformerRef.current?.nodes()?.includes(e.target) ||
            e.target.getParent() === transformerRef.current;

          if (!clickedOnImage && !clickedOnTransformer) {
            setIsSelected(false);
          }
        }}
      >
        <Layer>
          {tshirtImage && (
            <KonvaImage image={tshirtImage} x={0} y={0} width={500} />
          )}
          {designImage && (
            <>
              <KonvaImage
                name="design-image"
                image={designImage}
                x={190}
                y={120}
                width={120}
                height={120}
                draggable
                ref={imageRef}
                onClick={() => setIsSelected(true)}
                onTap={() => setIsSelected(true)} // For mobile
              />
              {isSelected && <Transformer ref={transformerRef} />}
            </>
          )}
        </Layer>
      </Stage>
      {designImage && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button onClick={() => setDesignImage(null)} className="rounded border border-red-200 bg-red-50 text-red-600 flex items-center gap-x-2 px-2 py-1">
            <span>Cancel</span> <LuX />
          </button>
          <button onClick={exportImage} className="rounded border border-green-200 bg-green-50 text-green-600 flex items-center gap-x-2 px-2 py-1">
           <span>Done</span> <LuCheck />
          </button>
        </div>
      )}
    </>
  );
};
